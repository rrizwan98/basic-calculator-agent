# Basic Calculator Agent 🧮

AI-powered natural language calculator with Next.js frontend and FastAPI backend using ChatKit integration.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-green)
![ChatKit](https://img.shields.io/badge/ChatKit-1.5.0-purple)

## 🎯 Overview

This project demonstrates a complete AI-powered calculator agent that understands natural language queries. Built with modern web technologies and the OpenAI Agents SDK, it provides a seamless chat interface for performing calculations.

### ✨ Key Features

- 🗣️ **Natural Language Processing** - Ask questions in plain English
- ⚡ **Instant Results** - Real-time calculations powered by OpenAI
- 💬 **ChatKit Integration** - Beautiful chat interface with @openai/chatkit-react
- 📊 **4 Basic Operations** - Addition, subtraction, multiplication, division
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🔒 **Secure** - API key management and CORS configuration
- 📦 **Full-Stack** - Complete frontend and backend implementation

## 🏗️ Architecture

```
basic-calculator-agent/
├── frontend/              # Next.js 14 application
│   ├── app/              # App router pages
│   ├── components/       # React components
│   └── package.json
├── backend/              # FastAPI server
│   ├── main.py          # FastAPI app
│   ├── server.py        # ChatKit server
│   ├── agents_config.py # Agent configuration
│   └── requirements.txt
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- OpenAI API key

### 1. Clone Repository

```bash
git clone https://github.com/rrizwan98/basic-calculator-agent.git
cd basic-calculator-agent
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start backend
python main.py
```

Backend runs at: `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:3001`

### 4. Try It Out!

Open `http://localhost:3001` in your browser and click the chat button in the bottom-right corner. Try asking:

- "What is 25 + 17?"
- "Calculate 100 minus 45"
- "Multiply 7 by 8"
- "Divide 150 by 3"

## 📁 Project Structure

### Frontend (Next.js)

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with ChatProvider
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # UI primitives (Button, Card)
│   ├── layout/             # Layout components (Header, Footer)
│   ├── sections/           # Page sections (Hero, Features, etc.)
│   └── chat/               # ChatKit components
├── package.json
├── tailwind.config.ts
└── .env.local
```

### Backend (FastAPI)

```
backend/
├── main.py                 # FastAPI application
├── server.py               # ChatKit server implementation
├── agents_config.py        # Calculator agent with function tools
├── models.py               # Pydantic data models
├── requirements.txt        # Python dependencies
└── .env                    # Environment variables
```

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|----------|
| Next.js | 14.0.0 | React framework with App Router |
| React | 18.2.0 | UI library |
| TypeScript | 5.0.0 | Type safety |
| Tailwind CSS | 3.4.0 | Styling framework |
| @openai/chatkit-react | 1.5.0 | ChatKit integration |

### Backend

| Technology | Version | Purpose |
|-----------|---------|----------|
| FastAPI | 0.109+ | Web framework |
| OpenAI Agents SDK | 0.7+ | Agent framework |
| openai-chatkit | 1.5+ | ChatKit protocol |
| Uvicorn | 0.27+ | ASGI server |
| Pydantic | 2.6+ | Data validation |

## 📡 API Documentation

### Backend Endpoints

| Endpoint | Method | Description |
|---------|--------|-------------|
| `/` | GET | Service information |
| `/health` | GET | Health check |
| `/chatkit` | POST | ChatKit protocol endpoint |

### ChatKit Protocol

The `/chatkit` endpoint implements the full ChatKit protocol supporting:
- Thread creation and management
- Message streaming with Server-Sent Events
- Conversation history
- Thread metadata

## 🧮 Calculator Operations

The agent supports 4 basic operations:

1. **Addition** - `add_numbers(a, b)`
   - Example: "What is 25 + 17?"
   - Response: "25 plus 17 equals **42**"

2. **Subtraction** - `subtract_numbers(a, b)`
   - Example: "Calculate 100 minus 45"
   - Response: "100 minus 45 equals **55**"

3. **Multiplication** - `multiply_numbers(a, b)`
   - Example: "Multiply 7 by 8"
   - Response: "7 multiplied by 8 is **56**"

4. **Division** - `divide_numbers(a, b)`
   - Example: "Divide 150 by 3"
   - Response: "150 divided by 3 equals **50**"

## 🎨 Customization

### Frontend Styling

Edit `frontend/tailwind.config.ts` to change colors:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6',  // Change primary color
        600: '#2563eb',
      },
    },
  },
}
```

### ChatKit Theme

Edit `frontend/components/chat/ChatWidget.tsx`:

```typescript
setOptions({
  theme: {
    colorScheme: 'light',  // or 'dark'
    radius: 'round',       // or 'sharp', 'soft'
  },
})
```

### Adding New Operations

Edit `backend/agents_config.py`:

```python
@function_tool
def power_numbers(base: float, exponent: float) -> float:
    """Calculate base raised to exponent."""
    return base ** exponent

# Add to agent tools
agent = Agent(
    tools=[add_numbers, subtract_numbers, multiply_numbers, divide_numbers, power_numbers],
)
```

## 🧪 Testing

### Backend Tests

```bash
# Health check
curl http://localhost:8000/health

# Service info
curl http://localhost:8000/

# Test calculation
curl -X POST http://localhost:8000/chatkit \
  -H "Content-Type: application/json" \
  -d '{
    "type": "threads.runs.create",
    "params": {
      "input": {
        "content": [{"type": "text", "text": "What is 5 + 3?"}]
      }
    }
  }'
```

### Frontend Tests

```bash
cd frontend
npm run build  # Test production build
npm run lint   # Run linter
```

## 🔒 Security

- ✅ API keys stored in `.env` files (not committed)
- ✅ CORS configured for development
- ✅ Input validation with Pydantic
- ✅ Error handling without exposing internals

**For Production:**
- Add authentication/authorization
- Implement rate limiting
- Use HTTPS
- Restrict CORS to specific domains
- Add monitoring and logging

## 🚨 Common Issues

### "OPENAI_API_KEY not set"
**Solution:** Create `.env` file in backend/ with your API key

### "npm error notarget No matching version"
**Solution:** Make sure you're using the correct package versions in `package.json`

### "Port already in use"
**Solution:** 
- Backend: Change PORT in `.env`
- Frontend: Use `npm run dev -- -p 3002`

### "ChatKit not loading"
**Solution:** Check that backend is running at `http://localhost:8000`

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [OpenAI Agents SDK](https://github.com/openai/openai-agents-sdk)
- [ChatKit React](https://www.npmjs.com/package/@openai/chatkit-react)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for learning or production.

## 🙏 Acknowledgments

- Built with OpenAI Agents SDK
- ChatKit integration by OpenAI
- UI components inspired by modern design systems

---

**Made with ❤️ using Claude Code**

For questions or support, please open an issue on GitHub.