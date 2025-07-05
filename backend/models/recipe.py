from pydantic import BaseModel, EmailStr
from typing import Literal

class RecipeRequest(BaseModel):
    ingredients: str
    cuisine: Literal[
                "Vegetarian",
                "Non-Vegetarian",
                "Vegan",
                "Street Food",
                "Snacks / Starters",
                "Tiffin / Light Meals",
                "Festival / Special",
                "Desserts / Sweets",
                "Healthy / Low Oil",
                "Beverages"
            ]
    num_people: int = 1
    language: Literal[
        "English", "Hindi (हिन्दी)", "Bengali (বাংলা)", "Telugu (తెలుగు)",
        "Marathi (मराठी)", "Tamil (தமிழ்)", "Gujarati (ગુજરાતી)",
        "Malayalam (മലയാളം)", "Kannada (ಕನ್ನಡ)", "Punjabi (ਪੰਜਾਬੀ)", "Urdu (اُردُو)"
    ]
    model: Literal["Llama3", "Gemma2", "Groq"]

