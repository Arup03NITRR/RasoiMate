# Importing the CryptContext class from passlib to handle password hashing
from passlib.context import CryptContext

# Creating a password context with the bcrypt hashing scheme
# 'deprecated="auto"' marks older schemes as deprecated automatically
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """
    Hashes a plain text password using bcrypt.
    
    Args:
        password (str): The plain text password to be hashed.
    
    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    """
    Verifies if a plain text password matches a hashed password.
    
    Args:
        plain (str): The plain text password input.
        hashed (str): The stored hashed password.
    
    Returns:
        bool: True if the password matches, False otherwise.
    """
    return pwd_context.verify(plain, hashed)
