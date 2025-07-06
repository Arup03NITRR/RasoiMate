from fastapi import APIRouter, HTTPException, status, Depends
from schemas.user import UserRegister, UserLogin, Token, UserChangePassword
from db import db
from auth.hash import hash_password, verify_password
from auth.jwt import create_access_token
from utils import get_current_user

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

@router.post("/change-password")
async def change_password(user_data: UserChangePassword):
    """
    Changes a user's password if the provided email and name match an existing user.
    This does NOT require the user to be authenticated.
    """
    # Find the user by both email and name
    db_user = await db.users.find_one({"email": user_data.email, "name": user_data.name})

    if not db_user:
        # If no user found with the exact email and name combination
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found or email/name mismatch. Please ensure both are correct."
        )

    # Hash the new password before storing it
    hashed_new_password = hash_password(user_data.new_password)

    # Update the user's password in the database
    await db.users.update_one(
        {"_id": db_user["_id"]}, # Use MongoDB's _id to uniquely identify the document
        {"$set": {"password": hashed_new_password}}
    )
    return {"message": "Password updated successfully"}