'use client'

import { useState, useEffect, useRef } from 'react'

declare global {
  interface Window {
    customElements: any
  }
}

interface ChatKitElement extends HTMLElement {
  setOptions: (options: any) => void
}

interface ChatWidgetProps {
  apiUrl?: string;
}

export function ChatWidget({ apiUrl }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isChatKitLoaded, setIsChatKitLoaded] = useState(false)
  const chatKitRef = useRef<ChatKitElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    // Check if ChatKit is loaded
    const checkChatKit = () => {
      if (typeof window !== 'undefined' && window.customElements?.get('openai-chatkit')) {
        setIsChatKitLoaded(true)
      }
    }

    checkChatKit()

    // Recheck periodically
    const interval = setInterval(checkChatKit, 500)

    return () => clearInterval(interval)
  }, [])

  // Initialize ChatKit once when loaded
  useEffect(() => {
    if (isChatKitLoaded && !isInitialized.current && containerRef.current) {
      // Create ChatKit element once
      const chatkit = document.createElement('openai-chatkit') as ChatKitElement
      chatkit.style.width = '100%'
      chatkit.style.height = '100%'

      containerRef.current.appendChild(chatkit)
      chatKitRef.current = chatkit
      isInitialized.current = true

      // Configure ChatKit with custom backend
      setTimeout(() => {
        if (chatkit.setOptions) {
          const backendUrl = apiUrl || process.env.NEXT_PUBLIC_CHATKIT_API_URL || 'http://localhost:8000/chatkit'

          // ChatKit web component expects CustomApiConfig format
          chatkit.setOptions({
            api: {
              domainKey: 'calculator-agent',
              url: backendUrl,
              // Custom fetch to handle all API calls
              fetch: async (url: string, init?: RequestInit) => {
                console.log('ChatKit API call:', { url, method: init?.method })

                try {
                  const response = await window.fetch(url, init)
                  console.log('ChatKit API response:', response.status)
                  return response
                } catch (error) {
                  console.error('ChatKit API error:', error)
                  throw error
                }
              }
            },
          })

          console.log('ChatKit configured with backend:', backendUrl)
        } else {
          console.error('chatkit.setOptions not available')
        }
      }, 100)
    }
  }, [isChatKitLoaded, apiUrl])

  // Toggle visibility instead of destroying/recreating
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.display = isOpen ? 'block' : 'none'
    }
  }, [isOpen])

  return (
    <>
      {/* Chat Panel - Always in DOM, just hidden/shown */}
      <div
        ref={containerRef}
        className="fixed bottom-24 right-6 w-[420px] h-[650px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200"
        style={{ display: 'none' }}
      >
        {!isChatKitLoaded && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading ChatKit...</p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Button */}
      <button
        id="chatkit-button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center group"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Pulse animation when closed */}
            <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></span>
          </>
        )}
      </button>
    </>
  )
}
