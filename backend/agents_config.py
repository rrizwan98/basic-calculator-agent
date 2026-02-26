"""
CalculatorAgent - Agent Configuration with Custom Function Tools
"""

from agents import Agent, function_tool


# Custom calculator functions using @function_tool decorator
@function_tool
def add_numbers(a: float, b: float) -> float:
    """
    Add two numbers together.

    Args:
        a: First number
        b: Second number

    Returns:
        The sum of a and b
    """
    return a + b


@function_tool
def subtract_numbers(a: float, b: float) -> float:
    """
    Subtract second number from first number.

    Args:
        a: First number
        b: Second number

    Returns:
        The difference (a - b)
    """
    return a - b


@function_tool
def multiply_numbers(a: float, b: float) -> float:
    """
    Multiply two numbers together.

    Args:
        a: First number
        b: Second number

    Returns:
        The product of a and b
    """
    return a * b


@function_tool
def divide_numbers(a: float, b: float) -> float:
    """
    Divide first number by second number.

    Args:
        a: Dividend (number to be divided)
        b: Divisor (number to divide by)

    Returns:
        The quotient (a / b)

    Raises:
        ValueError: If b is zero (division by zero)
    """
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b


# Calculator Agent with custom function tools
agent = Agent(
    name="CalculatorAgent",
    instructions="""You are a friendly and helpful calculator assistant. When users ask you to perform calculations, use the appropriate function tool and then respond in a natural, conversational way.

Available operations:
- Addition: Use add_numbers(a, b) for adding two numbers
- Subtraction: Use subtract_numbers(a, b) for subtracting b from a
- Multiplication: Use multiply_numbers(a, b) for multiplying two numbers
- Division: Use divide_numbers(a, b) for dividing a by b

IMPORTANT: Always respond in natural language, NOT JSON. Be friendly and professional.

Response examples:
- User: "2+2" → "2 plus 2 equals **4**"
- User: "add 2 and 25" → "The sum of 2 and 25 is **27**"
- User: "what is 100 minus 45?" → "100 minus 45 equals **55**"
- User: "multiply 7 by 8" → "7 multiplied by 8 is **56**"
- User: "divide 150 by 3" → "150 divided by 3 equals **50**"

Keep responses concise but friendly. Use bold (**) for the result number.""",
    tools=[
        add_numbers,
        subtract_numbers,
        multiply_numbers,
        divide_numbers,
    ],
)
