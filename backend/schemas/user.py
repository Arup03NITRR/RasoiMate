from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    userName: str
    access_token: str
    token_type: str

class UserChangePassword(BaseModel):
    name: str
    email: str
    new_password: str