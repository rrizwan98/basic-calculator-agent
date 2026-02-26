"""
Basic Calculator Agent - FastAPI Backend with ChatKit Protocol
Uses chatkit-python package for proper protocol implementation
"""

import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request, Response
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from chatkit.server import StreamingResult
from server import chatkit_server

# Load environment variables
load_dotenv()

# Validate API key
if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("OPENAI_API_KEY environment variable not set")

# Create FastAPI app
app = FastAPI(
    title="Basic Calculator Agent",
    description="AI-powered natural language calculator with ChatKit protocol",
    version="1.0.0"
)

# CORS - Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Service information."""
    return {
        "service": "Basic Calculator Agent",
        "version": "1.0.0",
        "status": "running",
        "protocol": "ChatKit",
        "operations": ["add", "subtract", "multiply", "divide"]
    }


@app.get("/health")
async def health():
    """Health check."""
    return {"status": "healthy"}


@app.post("/chatkit")
async def chatkit_endpoint(request: Request):
    """
    ChatKit protocol endpoint.
    Handles all ChatKit requests using the chatkit-python server.
    """
    try:
        # Build context from request (can add user_id, locale, etc.)
        context = {
            "user_id": request.headers.get("x-user-id", "anonymous"),
            "locale": request.headers.get("accept-language", "en"),
        }

        # Process request through ChatKit server
        result = await chatkit_server.process(await request.body(), context)

        # Return streaming or JSON response
        if isinstance(result, StreamingResult):
            return StreamingResponse(
                result,
                media_type="text/event-stream",
                headers={
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "X-Accel-Buffering": "no",
                }
            )

        # JSON response
        return Response(content=result.json, media_type="application/json")

    except Exception as e:
        print(f"❌ ChatKit Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )


if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Basic Calculator Agent Backend...")
    print("📡 ChatKit endpoint: http://localhost:8000/chatkit")
    print("🏥 Health check: http://localhost:8000/health")
    print("📦 Using chatkit-python package for ChatKit protocol")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
