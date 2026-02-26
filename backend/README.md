# Basic Calculator Agent - Backend

FastAPI backend with ChatKit integration for the Basic Calculator Agent.

## 🚀 Features

- ✅ **ChatKit Integration** - Full ChatKit protocol support
- ✅ **OpenAI Agents SDK** - Powered by OpenAI's Agents SDK
- ✅ **4 Calculator Operations** - Add, subtract, multiply, divide
- ✅ **Natural Language** - Understands plain English queries
- ✅ **Thread Management** - In-memory conversation storage
- ✅ **Structured Output** - Returns detailed calculation results
- ✅ **Error Handling** - Graceful handling of edge cases

## 📁 Project Structure

```
backend/
├── main.py              # FastAPI application
├── server.py            # ChatKitServer implementation
├── agents_config.py     # Calculator agent configuration
├── models.py            # Pydantic models
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
└── README.md           # This file
```

## 🔧 Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Run the Server

```bash
python main.py
```

The server will start at `http://localhost:8000`

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Service information |
| `/health` | GET | Health check |
| `/chatkit` | POST | ChatKit protocol endpoint |

## 🔌 ChatKit Protocol

The `/chatkit` endpoint implements the ChatKit protocol with support for:

### Thread Creation
```json
{
  "type": "threads.create",
  "params": {}
}
```

### Send Message
```json
{
  "type": "threads.runs.create",
  "params": {
    "thread_id": "thread_123",
    "input": {
      "content": [{"type": "text", "text": "What is 5 + 3?"}]
    }
  }
}
```

### Response (SSE Stream)
```
event: text_delta
data: {"content": "**Result:** 8\n\n**Calculation:** 5.0 + 3.0 = 8.0"}

event: done
data: {}
```

## 🧮 Calculator Agent

### Operations Supported

1. **Addition** - `add_numbers(a, b)`
   - Example: "What is 25 + 17?"

2. **Subtraction** - `subtract_numbers(a, b)`
   - Example: "Calculate 100 minus 45"

3. **Multiplication** - `multiply_numbers(a, b)`
   - Example: "Multiply 7 by 8"

4. **Division** - `divide_numbers(a, b)`
   - Example: "Divide 150 by 3"

### Structured Output

Each calculation returns a `CalculationResult`:

```python
{
  "operation": "+",
  "operand1": 25.0,
  "operand2": 17.0,
  "result": 42.0,
  "expression": "25 + 17"
}
```

## 🗄️ Thread Storage

Uses in-memory storage for threads:
- **Type**: InMemoryStore
- **Persistence**: Session-based (cleared on restart)

For production, consider:
- Redis (`RedisThreadStore`)
- PostgreSQL (Custom `ThreadStore`)

## 🧪 Testing

### Health Check
```bash
curl http://localhost:8000/health
```

### Service Info
```bash
curl http://localhost:8000/
```

### Test Calculation
```bash
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

## 🔒 Security

- ✅ CORS configured for development
- ✅ API key validation on startup
- ✅ Error messages don't expose internals
- ⚠️ For production: Add authentication, rate limiting

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|----------|
| openai-agents | >=0.7.0 | OpenAI Agents SDK |
| openai-chatkit | >=1.5.0 | ChatKit protocol |
| fastapi | >=0.109.0 | Web framework |
| uvicorn | >=0.27.0 | ASGI server |
| pydantic | >=2.6.0 | Data validation |

## 🚨 Common Issues

### "OPENAI_API_KEY not set"
- Solution: Create `.env` file with your API key

### "ModuleNotFoundError"
- Solution: Run `pip install -r requirements.txt`

### "Port 8000 already in use"
- Solution: Change PORT in `.env` or stop other service

## 📝 Development

### Adding New Operations

1. Create function tool in `agents_config.py`:
```python
@function_tool
def power_numbers(base: float, exponent: float) -> float:
    """Calculate base raised to exponent."""
    return base ** exponent
```

2. Add to agent tools list:
```python
agent = Agent(
    tools=[..., power_numbers],
)
```

## 🌐 Frontend Integration

This backend works with:
- **@openai/chatkit-react** (npm package)
- **ChatKit.js** (web component)

Frontend configuration:
```javascript
{
  api: {
    url: 'http://localhost:8000/chatkit',
    domainKey: 'calculator-agent'
  }
}
```

## 📝 License

Built for Basic Calculator Agent project.

---

**Need help?** Check the main README or contact support.
