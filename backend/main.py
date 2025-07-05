from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, recipe

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

# Include authentication and recipe routes
app.include_router(auth.router)
app.include_router(recipe.router)

@app.get("/")
def home():
    return "Welcome to RasoiMate"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
