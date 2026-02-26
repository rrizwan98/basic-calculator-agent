# Basic Calculator Agent - Frontend

Modern, professional Next.js website with integrated ChatKit AI chat widget for the Basic Calculator Agent.

## 🎨 Features

- ✅ **Modern UI** - Clean, professional design with Tailwind CSS
- ✅ **ChatKit Integration** - @openai/chatkit-react widget in bottom-right corner
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Section Components** - Hero, Features, How It Works, Examples
- ✅ **TypeScript** - Type-safe code throughout
- ✅ **SEO Optimized** - Meta tags and semantic HTML

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout with ChatProvider
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # UI primitives (Button, Card)
│   ├── layout/              # Layout (Header, Footer)
│   ├── sections/            # Page sections
│   └── chat/                # ChatKit components
├── lib/
│   └── utils.ts             # Utilities
├── package.json
├── next.config.js
├── tailwind.config.ts
└── .env.local
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.local` and set your backend URL:

```bash
NEXT_PUBLIC_CHATKIT_API_URL=http://localhost:8000/chatkit
NEXT_PUBLIC_CHATKIT_DOMAIN_KEY=calculator-agent
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Change these values
        500: '#3b82f6',
        600: '#2563eb',
        // ...
      },
    },
  },
},
```

### ChatKit Theme

Edit `components/chat/ChatWidget.tsx`:

```typescript
theme: {
  colorScheme: 'light', // or 'dark'
  radius: 'round',       // or 'sharp', 'soft'
  color: {
    accent: { primary: '#3B82F6', level: 2 },
  },
},
```

### Content

- **Hero**: Edit `components/sections/Hero.tsx`
- **Features**: Edit `components/sections/Features.tsx`
- **How It Works**: Edit `components/sections/HowItWorks.tsx`
- **Examples**: Edit `components/sections/Examples.tsx`

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|----------|
| next | ^14.0.0 | React framework |
| react | ^18.2.0 | UI library |
| @openai/chatkit-react | ^1.5.0 | ChatKit widget |
| tailwindcss | ^3.4.0 | CSS framework |
| typescript | ^5.0.0 | Type safety |

## 🔗 Backend Integration

This frontend connects to a FastAPI backend at `/chatkit` endpoint.

Make sure your backend:
1. Implements ChatKit protocol
2. Handles `threads.create`, `threads.list`, `threads.runs.create`
3. Returns SSE events for streaming responses
4. Has CORS enabled for `http://localhost:3001`

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Main landing page with all sections |

## 🎯 ChatKit Widget

The chat widget appears in the bottom-right corner and includes:

- ✅ Conversation history
- ✅ Thread management (rename, delete)
- ✅ Suggested prompts
- ✅ Retry and feedback actions
- ✅ Responsive design

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Chat**: @openai/chatkit-react
- **Icons**: SVG icons (no icon library needed)

## 📝 License

Built for Basic Calculator Agent project.

---

**Need help?** Check the backend README or contact support.
