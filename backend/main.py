from fastapi import FastAPI
from pymongo import MongoClient
from pymongo.server_api import ServerApi

import os
from dotenv import load_dotenv

load_dotenv()


app = FastAPI()

password = os.environ.get('PASSWORD')

client = MongoClient(f'mongodb+srv://voicejournalhtn22:{password}@cluster0.0wr1fib.mongodb.net/?retryWrites=true&w=majority')
db = client.test
collection = db.testing

@app.get("/upload")
def read_root():
    x = collection.insert_one({"Hello": "World"}).inserted_id

    return {"Hello": "World"}