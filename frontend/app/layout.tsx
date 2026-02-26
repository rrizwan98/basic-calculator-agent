import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatProvider } from '@/components/chat/ChatProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Basic Calculator Agent - AI-Powered Natural Language Calculator',
  description: 'Calculate anything in plain English with our AI-powered calculator agent. No complex formulas needed - just ask and get instant results.',
  keywords: ['calculator', 'AI calculator', 'natural language calculator', 'math AI', 'OpenAI', 'calculator agent'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ChatKit Script - CDN approach */}
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatProvider
          apiUrl={process.env.NEXT_PUBLIC_CHATKIT_API_URL}
          enabled={true}
        />
      </body>
    </html>
  );
}
