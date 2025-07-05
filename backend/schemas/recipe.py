# schemas/recipe.py

from __future__ import annotations # CRITICAL for forward references

from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

# This import is still needed because RecipeRequest is defined in models/recipe.py
from models.recipe import RecipeRequest

class RecipeInput(BaseModel):
    # CRITICAL CHANGE: Use 'RecipeRequest' (string literal) for forward reference
    input: 'RecipeRequest'

class RecipeOut(BaseModel):
    id: str = Field(alias="_id")
    email: str
    input: RecipeRequest # This can stay as RecipeRequest because it's at the top level
    generated_recipe: str
    generated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda dt: dt.isoformat()
        }

# CRITICAL CHANGE: Call update_forward_refs() after all models are defined
RecipeInput.update_forward_refs()