from fastapi import APIRouter, HTTPException, Depends
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from database import db
from jwt_handler import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserIn(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    name: str
    email: str
    token: str


@router.post("/signup", response_model=UserOut)
async def signup(user: UserIn):
    if await db.users.find_one({"email": user.email}):
        raise HTTPException(400, detail="Email already registered")
    
    hashed_pw = pwd_context.hash(user.password)
    await db.users.insert_one({"name": user.name, "email": user.email, "password": hashed_pw})

    token = create_access_token({"sub": user.email})
    return {
        "name": user.name,
        "email": user.email,
        "token": token
    }


@router.post("/login", response_model=UserOut)
async def login(user: UserIn):
    existing = await db.users.find_one({"email": user.email})
    if not existing or not pwd_context.verify(user.password, existing["password"]):
        raise HTTPException(401, detail="Invalid credentials")
    
    token = create_access_token({"sub": user.email})
    return {
        "name": existing["name"],
        "email": user.email,
        "token": token
    }