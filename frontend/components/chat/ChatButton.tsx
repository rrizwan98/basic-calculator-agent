'use client';

import { ChatWidget } from './ChatWidget';

interface ChatButtonProps {
  apiUrl?: string;
}

export function ChatButton({ apiUrl }: ChatButtonProps) {
  return <ChatWidget apiUrl={apiUrl} />;
}
