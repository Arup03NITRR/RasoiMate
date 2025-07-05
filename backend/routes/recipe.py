from fastapi import APIRouter, Depends, HTTPException
from schemas.recipe import RecipeInput, RecipeOut
from db import db
from utils import get_current_user
from chains import get_recipe_chain # Assuming this is correctly implemented

router = APIRouter(prefix="/recipe", tags=["Auth"]) # Ensure this prefix is correct, should be "/recipe" for clarity

@router.post("/generate", response_model=RecipeOut)
async def generate_recipe(data: RecipeInput, user_email: str = Depends(get_current_user)):
    try:
        # --- CRITICAL CORRECTIONS START HERE ---
        # All recipe parameters are nested under 'data.input'

        # 'ingredients' from RecipeRequest is already a string, pass it directly.
        ingredients_for_ai = data.input.ingredients

        # Get the AI chain based on the selected model
        chain = get_recipe_chain(data.input.model)

        # Invoke the AI chain with the corrected data structure and field names
        response = chain.invoke({
            "ingredients": ingredients_for_ai,     # Pass the string directly
            "cuisine": data.input.cuisine,         # Use 'cuisine' as per RecipeRequest model
            "num_people": data.input.num_people,   # Use 'num_people' as per RecipeRequest model
            "language": data.input.language
        })

        generated = response.content

    except ValueError as e:
        # Catch specific validation errors and return 400 Bad Request
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Catch any other unexpected errors and return 500 Internal Server Error
        # Printing the actual exception here helps with debugging!
        print(f"Internal Server Error during recipe generation: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate recipe")

    # Store recipe in database with corrected field access
    await db.recipes.insert_one({
        "email": user_email,
        "ingredients": data.input.ingredients,
        "cuisine_type": data.input.cuisine, # Storing 'cuisine' from schema into DB field 'cuisine_type'
        "people": data.input.num_people,   # Storing 'num_people' from schema into DB field 'people'
        "language": data.input.language,
        "model": data.input.model,
        "generated_recipe": generated
    })

    # Return structured response with corrected field access
    return RecipeOut(
        email=user_email,
        input=data.input, # Pass the entire RecipeRequest object back
        generated_recipe=generated
    )