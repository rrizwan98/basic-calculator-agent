"""
ChatKit Server Implementation using openai-chatkit package
Uses chatkit.agents helpers for proper streaming integration.
"""

from collections import defaultdict
from collections.abc import AsyncIterator
from typing import Optional

from agents import Runner
from chatkit.agents import AgentContext, simple_to_agent_input, stream_agent_response
from chatkit.server import ChatKitServer, StreamingResult
from chatkit.store import NotFoundError, Store
from chatkit.types import (
    Attachment,
    Page,
    ThreadItem,
    ThreadMetadata,
    ThreadStreamEvent,
    UserMessageItem,
)

from agents_config import agent


class InMemoryStore(Store[dict]):
    """Simple in-memory store for chat data."""

    def __init__(self):
        """Initialize empty storage."""
        self.threads: dict[str, ThreadMetadata] = {}
        self.items: dict[str, list[ThreadItem]] = defaultdict(list)
        self.attachments: dict[str, Attachment] = {}

    async def load_thread(self, thread_id: str, context: dict) -> ThreadMetadata:
        """Load thread metadata by ID."""
        if thread_id not in self.threads:
            raise NotFoundError(f"Thread {thread_id} not found")
        return self.threads[thread_id]

    async def save_thread(self, thread: ThreadMetadata, context: dict) -> None:
        """Persist thread metadata."""
        self.threads[thread.id] = thread

    async def load_threads(
        self, limit: int, after: str | None, order: str, context: dict
    ) -> Page[ThreadMetadata]:
        """Load paginated list of threads."""
        threads = list(self.threads.values())
        return self._paginate(
            threads, after, limit, order,
            sort_key=lambda t: t.created_at,
            cursor_key=lambda t: t.id
        )

    async def load_thread_items(
        self, thread_id: str, after: str | None, limit: int, order: str, context: dict
    ) -> Page[ThreadItem]:
        """Load paginated thread items."""
        items = self.items.get(thread_id, [])
        return self._paginate(
            items, after, limit, order,
            sort_key=lambda i: i.created_at,
            cursor_key=lambda i: i.id
        )

    async def add_thread_item(
        self, thread_id: str, item: ThreadItem, context: dict
    ) -> None:
        """Add new item to thread."""
        self.items[thread_id].append(item)

    async def save_item(
        self, thread_id: str, item: ThreadItem, context: dict
    ) -> None:
        """Upsert thread item by ID."""
        items = self.items[thread_id]
        for idx, existing in enumerate(items):
            if existing.id == item.id:
                items[idx] = item
                return
        items.append(item)

    async def load_item(
        self, thread_id: str, item_id: str, context: dict
    ) -> ThreadItem:
        """Load specific thread item."""
        for item in self.items.get(thread_id, []):
            if item.id == item_id:
                return item
        raise NotFoundError(f"Item {item_id} not found in thread {thread_id}")

    async def delete_thread(self, thread_id: str, context: dict) -> None:
        """Delete thread and all items."""
        self.threads.pop(thread_id, None)
        self.items.pop(thread_id, None)

    async def delete_thread_item(
        self, thread_id: str, item_id: str, context: dict
    ) -> None:
        """Delete specific thread item."""
        self.items[thread_id] = [
            item for item in self.items.get(thread_id, [])
            if item.id != item_id
        ]

    async def save_attachment(
        self, attachment: Attachment, context: dict
    ) -> None:
        """Persist attachment metadata."""
        self.attachments[attachment.id] = attachment

    async def load_attachment(
        self, attachment_id: str, context: dict
    ) -> Attachment:
        """Load attachment by ID."""
        if attachment_id not in self.attachments:
            raise NotFoundError(f"Attachment {attachment_id} not found")
        return self.attachments[attachment_id]

    async def delete_attachment(
        self, attachment_id: str, context: dict
    ) -> None:
        """Delete attachment."""
        self.attachments.pop(attachment_id, None)

    def _paginate(
        self, rows: list, after: str | None, limit: int, order: str,
        sort_key, cursor_key
    ):
        """Helper method for pagination."""
        sorted_rows = sorted(rows, key=sort_key, reverse=order == "desc")
        start = 0
        if after:
            for idx, row in enumerate(sorted_rows):
                if cursor_key(row) == after:
                    start = idx + 1
                    break
        data = sorted_rows[start : start + limit]
        has_more = start + limit < len(sorted_rows)
        next_after = cursor_key(data[-1]) if has_more and data else None
        return Page(data=data, has_more=has_more, after=next_after)


class CalculatorChatKitServer(ChatKitServer[dict]):
    """ChatKit server that processes calculator requests using OpenAI Agents SDK."""

    async def respond(
        self,
        thread: ThreadMetadata,
        input_user_message: Optional[UserMessageItem],
        context: dict,
    ) -> AsyncIterator[ThreadStreamEvent]:
        """
        Process user message and yield ChatKit stream events.

        Uses chatkit.agents helpers for proper streaming integration.
        """
        if not input_user_message:
            return

        try:
            # Load recent thread items (which includes the user message)
            items_page = await self.store.load_thread_items(
                thread.id,
                after=None,
                limit=20,
                order="asc",
                context=context,
            )

            # Convert ChatKit items to agent input format
            input_items = await simple_to_agent_input(items_page.data)

            print(f"Processing input: {input_items}")

            # Create agent context for streaming operations
            agent_context = AgentContext(
                thread=thread,
                store=self.store,
                request_context=context
            )

            # Run agent with streaming
            result = Runner.run_streamed(agent, input_items, context=agent_context)

            # Stream agent response as ChatKit events
            async for event in stream_agent_response(agent_context, result):
                yield event

            print("Response streamed successfully")

        except Exception as e:
            print(f"Error: {str(e)}")
            import traceback
            traceback.print_exc()
            raise


# Create server instance with in-memory store
store = InMemoryStore()
chatkit_server = CalculatorChatKitServer(store=store)
