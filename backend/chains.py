import os
from dotenv import load_dotenv

from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import Runnable
from langchain_groq import ChatGroq

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Mapping of user-friendly model names to Groq API names
MODEL_MAP = {
    "Llama3": {
        "id": "Llama-3.3-70b-Versatile",
        "description": "High-quality, versatile model for general reasoning tasks."
    },
    "Gemma2": {
        "id": "Gemma2-9b-it",
        "description": "Fast, lightweight model tuned for instructions and chat."
    },
    "Groq": {
        "id": "Compound-Beta",
        "description": "Ultra-fast Groq-native model, great for structured output."
    }
}

# Prompt template
prompt = PromptTemplate(
    input_variables=["ingredients", "cuisine", "num_people", "language"],
    template="""
Generate a detailed and creative recipe using the following inputs:
- Ingredients: {ingredients}
- Cuisine Type: {cuisine}
- Serves: {num_people} people
- Output language: {language}

The recipe should include:
- A title (use heading 2)
- Ingredients list with quantities (with proper heading format and '-' points)
- Step-by-step cooking instructions (with proper heading format and '-' points)
- Optional serving tips (With proper heading format and '-' points)
"""
)

def get_recipe_chain(model_key: str) -> tuple[Runnable]:
    model = MODEL_MAP.get(model_key)
    if not model:
        raise ValueError(f"Unsupported model: {model}")
    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name=model["id"]
    )
    chain = prompt | llm
    return chain