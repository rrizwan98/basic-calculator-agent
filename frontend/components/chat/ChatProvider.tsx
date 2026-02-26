'use client';

import { ChatButton } from './ChatButton';

interface ChatProviderProps {
  children?: React.ReactNode;
  apiUrl?: string;
  enabled?: boolean;
}

export function ChatProvider({
  children,
  apiUrl,
  enabled = true,
}: ChatProviderProps) {
  return (
    <>
      {children}
      {enabled && <ChatButton apiUrl={apiUrl} />}
    </>
  );
}
