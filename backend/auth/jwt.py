from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Secret key and algorithm for JWT encoding/decoding (should be kept secret in production)
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "15"))  # Default fallback to 15 minutes

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """
    Creates a JWT access token with an optional expiration time.
    
    Args:
        data (dict): The data to include in the payload.
        expires_delta (timedelta, optional): The amount of time until the token expires.
    
    Returns:
        str: The encoded JWT token.
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str) -> dict | None:
    """
    Decodes a JWT token and returns the payload if valid.
    
    Args:
        token (str): The JWT token string.
    
    Returns:
        dict | None: The decoded payload if successful, None if invalid or expired.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
