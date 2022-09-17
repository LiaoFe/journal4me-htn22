from fastapi import FastAPI

# importing nlp dependencies
import cohere
import cohere.classify as co_classify
import dotenv
import os
import numpy as np
import pandas as pd

# using dotenv
dotenv.load_dotenv()

# fetching api key for cohere
co_client = cohere.Client(f'{os.getenv("COHERE_KEY")}')

# using fast api
app = FastAPI()

# root dir
@app.get("/")
async def read_root():
    return {
        "Running on this localhost"
    }

# analyzes the text to determine the mood from the text
# prod: vector for [happy transcript, sad transcript] 
@app.post('/analyze_speech2txt/')
def analyze_speech2txt(speech2txt : str):
    # happiness vector
    day_decoding = ['happy', 'sad']

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
    result = { 
        'speech': speech2txt,
        'rating': day_decoding[np.argmax(happiness_encoding)] }

    return result

# summarizes the text
# NOTE: NEED TO FIX THIS SHT
@app.post('/summarize_speech2txt/')
async def summarize__speech2txt(speech2txt : str):
    prompt = f'''"Today, I walked my sibling to school. It was a relaxing walk. I hope to do it as much as I can."
        In summary: "A highlight of today was walking my sibling"

        "When I ran on the field, I tripped and got a bruise, it hurt quite a bit."
        In summary:"I got a bruise from falling"

        "{speech2txt}"
        In summary:"'''
    n_generations = 5

    prediction = co_client.generate(
        model = 'large', 
        prompt = prompt, 
        return_likelihoods = 'GENERATION', 
        stop_sequences = ['"'], 
        max_tokens = 50,
        temperature = 0.7, 
        num_generations = n_generations, 
        k = 0,
        p = 0.75
    )

    gens = []
    likelihoods = []
    for gen in prediction.generations:
        gens.append(gen.text)

        sum_likelihood = 0
        for t in gen.token_likelihoods:
            sum_likelihood += t.likelihood
        # Get sum of likelihoods
        likelihoods.append(sum_likelihood)

    pd.options.display.max_colwidth = 200
    # Create a dataframe for the generated sentences and their likelihood scores
    df = pd.DataFrame({'generation':gens, 'likelihood': likelihoods})
    # Drop duplicates
    df = df.drop_duplicates(subset=['generation'])
    # Sort by highest sum likelihood
    df = df.sort_values('likelihood', ascending=False, ignore_index=True)

    result = df['generation'][0]
    result = result[0 : max(0, len(result) - 2)]

    return result