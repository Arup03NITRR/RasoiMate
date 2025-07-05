# routes/recipe.py

from fastapi import APIRouter, Depends, HTTPException, status # Import status
from schemas.recipe import RecipeInput, RecipeOut
from models.recipe import RecipeRequest
from db import db
from utils import get_current_user
from chains import get_recipe_chain
from typing import List
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/recipe", tags=["Recipe"])

# --- Your /generate endpoint ---
@router.post("/generate", response_model=RecipeOut)
async def generate_recipe(data: RecipeInput, user_email: str = Depends(get_current_user)):
    try:
        ingredients_for_ai = data.input.ingredients
        chain = get_recipe_chain(data.input.model)

        response = chain.invoke({
            "ingredients": ingredients_for_ai,
            "cuisine": data.input.cuisine,
            "num_people": data.input.num_people,
            "language": data.input.language
        })
        generated = response.content

        current_time = datetime.utcnow()

        result = await db.recipes.insert_one({
            "email": user_email,
            "ingredients": data.input.ingredients,
            "cuisine_type": data.input.cuisine,
            "people": data.input.num_people,
            "language": data.input.language,
            "model": data.input.model,
            "generated_recipe": generated,
            "generated_at": current_time
        })

        return RecipeOut(
            id=str(result.inserted_id),
            email=user_email,
            input=data.input,
            generated_recipe=generated,
            generated_at=current_time
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Internal Server Error during recipe generation: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate recipe")


# --- Your /my-recipes endpoint ---
@router.get("/my-recipes", response_model=List[RecipeOut])
async def get_my_recipes(user_email: str = Depends(get_current_user)):
    try:
        user_recipes_cursor = db.recipes.find({"email": user_email})
        user_recipes_list = await user_recipes_cursor.to_list(1000)

        if not user_recipes_list:
            return []

        formatted_recipes = []
        for recipe_doc in user_recipes_list:
            try:
                recipe_request_data = {
                    "ingredients": recipe_doc.get("ingredients", ""),
                    "cuisine": recipe_doc.get("cuisine_type", ""),
                    "num_people": recipe_doc.get("people", 1),
                    "language": recipe_doc.get("language", ""),
                    "model": recipe_doc.get("model", "Llama3"),
                }
                recipe_input_obj = RecipeRequest(**recipe_request_data)

                formatted_recipes.append(
                    RecipeOut(
                        id=str(recipe_doc["_id"]),
                        email=recipe_doc.get("email", user_email),
                        input=recipe_input_obj,
                        generated_recipe=recipe_doc.get("generated_recipe", ""),
                        generated_at=recipe_doc.get("generated_at")
                    )
                )
            except Exception as inner_e:
                print(f"Error processing a single recipe document for {user_email}: {inner_e}")
                print(f"Problematic document: {recipe_doc}")
                continue

        formatted_recipes.sort(key=lambda r: r.generated_at or datetime.min, reverse=True)
        return formatted_recipes

    except Exception as e:
        print(f"Overall Error fetching user recipes for {user_email}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch user recipes")

# --- Your /{recipe_id} endpoint ---
@router.get("/{recipe_id}", response_model=RecipeOut)
async def get_single_recipe(recipe_id: str, user_email: str = Depends(get_current_user)):
    try:
        if not ObjectId.is_valid(recipe_id):
            raise HTTPException(status_code=400, detail="Invalid recipe ID format")

        object_id = ObjectId(recipe_id)
        recipe_doc = await db.recipes.find_one({"_id": object_id, "email": user_email})

        if not recipe_doc:
            raise HTTPException(status_code=404, detail="Recipe not found or not authorized")

        recipe_request_data = {
            "ingredients": recipe_doc.get("ingredients", ""),
            "cuisine": recipe_doc.get("cuisine_type", ""),
            "num_people": recipe_doc.get("people", 1),
            "language": recipe_doc.get("language", ""),
            "model": recipe_doc.get("model", "Llama3"),
        }
        recipe_input_obj = RecipeRequest(**recipe_request_data)

        return RecipeOut(
            id=str(recipe_doc["_id"]),
            email=recipe_doc.get("email", user_email),
            input=recipe_input_obj,
            generated_recipe=recipe_doc.get("generated_recipe", ""),
            generated_at=recipe_doc.get("generated_at")
        )

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(f"Error fetching single recipe {recipe_id} for {user_email}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch recipe details")


# --- NEW DELETE ENDPOINT ---
@router.delete("/{recipe_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_recipe(recipe_id: str, user_email: str = Depends(get_current_user)):
    """
    Deletes a recipe by its ID.
    User must be authenticated and own the recipe.
    """
    try:
        if not ObjectId.is_valid(recipe_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Recipe ID format"
            )

        object_id = ObjectId(recipe_id)

        # Find the recipe to ensure it exists and belongs to the user
        recipe = await db.recipes.find_one({"_id": object_id})

        if not recipe:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Recipe with ID {recipe_id} not found"
            )

        # Check if the current user is the owner of the recipe
        # Based on your /generate route, you're storing the user's email as "email" in the DB.
        if recipe.get("email") != user_email:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this recipe"
            )

        # Delete the recipe
        delete_result = await db.recipes.delete_one({"_id": object_id})

        if delete_result.deleted_count == 0:
            # This case ideally shouldn't be hit if find_one above succeeded,
            # but it's a good safeguard for concurrent deletions.
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete recipe. It might have been deleted already."
            )

        # Return nothing for 204 No Content
        return
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(f"Server Error during recipe deletion: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete recipe due to an internal server error."
        )