from fastapi import APIRouter, HTTPException
from schemas.user import UserRegister, UserLogin, Token
from db import db
from auth.hash import hash_password, verify_password
from auth.jwt import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
async def register(user: UserRegister):
    if await db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    user_dict = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
    }
    await db.users.insert_one(user_dict)
    return {"message": "User registered successfully"}

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": db_user["email"]})
    return {"userName": db_user["name"], "access_token": token, "token_type": "bearer"}
