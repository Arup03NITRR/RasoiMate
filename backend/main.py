from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import RecipeRequest
from chains import get_recipe_chain

app = FastAPI(
    title="RasoiMate",
    description="Generate Indian-style recipes using Groq-hosted LLMs like Llama 3, Gemma2, and Groq's Compound model.",
    version="1.0.0"
)

# Allow CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return "Welcome to RasoiMate"

@app.post("/generate-recipe")
async def generate_recipe(request: RecipeRequest):
    # Get selected model chain
    try:
        chain = get_recipe_chain(request.model)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    # Run the prompt chain
    try:
        response = chain.invoke({
            "ingredients": request.ingredients,
            "cuisine": request.cuisine,
            "num_people": request.num_people,
            "language": request.language
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to generate recipe")
    
    return {
        "model": request.model,
        "ingredients": request.ingredients,
        "cuisine": request.cuisine,
        "num_people": request.num_people,
        "language": request.language,
        "recipe": response.content
    }

if __name__=="__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)