from pydantic import BaseModel
from typing import List
from models.recipe import RecipeRequest

class RecipeInput(BaseModel):
    input: RecipeRequest

class RecipeOut(BaseModel):
    email: str
    input: RecipeRequest
    generated_recipe: str
