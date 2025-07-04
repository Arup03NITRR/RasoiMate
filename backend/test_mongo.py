# test_mongo.py
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio, os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

async def test_connection():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client["rasoi_mate_db"]
    print(await db.list_collection_names())

asyncio.run(test_connection())
