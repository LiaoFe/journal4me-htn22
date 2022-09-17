from fastapi import FastAPI
from pymongo import MongoClient
from pymongo.server_api import ServerApi

import os
from dotenv import load_dotenv

# importing nlp dependencies
import cohere
import cohere.classify as co_classify
import os
import numpy as np


load_dotenv()

# using fast api
app = FastAPI()

password = os.environ.get('PASSWORD')

client = MongoClient(f'mongodb+srv://voicejournalhtn22:{password}@cluster0.0wr1fib.mongodb.net/?retryWrites=true&w=majority')
db = client.test
collection = db.testing

@app.get("/upload")
def read_root():
    x = collection.insert_one({"Hello": "World"}).inserted_id

    return {"Hello": "World"}



# root dir
@app.get("/")
async def read_root():
    return {
        "Running on this localhost"
    }

# analyzes the text 
# prod: vector for [happy transcript, sad transcript] 
@app.get('/analyze_speech2txt/{speech2txt}')
async def analyze_speech2txt(speech2txt : str):
    # happiness vector
    day_decoding = ['happy', 'sad']
    
    # fetching api key for cohere
    co_client = cohere.Client(f'{os.getenv("COHERE_KEY")}')

    # classifying the transcript
    response = co_client.classify(
        inputs = [f"{speech2txt}"],
        examples = [
            co_classify.Example('My friend made me smile today', 'happy'),
            co_classify.Example('My family took me out today', 'happy'),
            co_classify.Example('Today my cats gave me a lick', 'happy'), 
            co_classify.Example('I went to the park, but it was rainy and stormy', 'sad'),
            co_classify.Example('At school, I won an award', 'happy'),
            co_classify.Example('Today, some bullying happened at my school. I feel bad for that student', 'sad'),
            co_classify.Example('I worked hard today, but it was all worth it', 'happy'),
            co_classify.Example('I worked too hard today, work was really rough', 'sad'),
            co_classify.Example('I was not able to win an award today, but my friend won something', 'happy'),
            co_classify.Example("A crime happened at my neighbor's home", 'sad'),
            co_classify.Example('I saw a cat on the street, I wish I could have brought it home', 'sad'),
            co_classify.Example("I met one of my idols today!", 'happy')
        ]
    )

    # vector encoding of happy and sad
    response_labels = response.classifications[0].labels
    happiness_encoding = ([response_labels['happy'].confidence, response_labels['sad'].confidence])

    # // NOTE: this information will be added to the database
    return {
        'speech': speech2txt,
        'rating': day_decoding[np.argmax(happiness_encoding)]
    }

