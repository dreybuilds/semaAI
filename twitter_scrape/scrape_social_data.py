import os
import time
import requests
from pymongo import MongoClient
from dotenv import load_dotenv

# Load API keys from .env file
load_dotenv()
SOCIALDATA_API_KEY = os.getenv("SOCIAL_API")

# MongoDB Setup
MONGO_URI = "mongodb+srv://nzauaudrey:39wzDX4bJCc1tM6i@cluster0.m7ua9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["twitter_db"]
collection = db["semaAI_threads"]

# Function to fetch Twitter threads by hashtag
def fetch_threads(hashtag="#semaAI"):
    print(f"Fetching threads for {hashtag}...")

    url = "https://api.social-searcher.com/v2/search"
    params = {
        "q": hashtag,
        "network": "twitter",
        "key": SOCIALDATA_API_KEY
    }

    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        tweets = response.json().get("posts", [])

        for tweet in tweets:
            thread_id = tweet.get("id")
            author = tweet.get("user", {}).get("name")
            content = tweet.get("text")
            created_at = tweet.get("date")

            # Check if thread already exists in DB
            if not collection.find_one({"thread_id": thread_id}):
                data = {
                    "thread_id": thread_id,
                    "username": author,
                    "content": content,
                    "created_at": created_at
                }
                collection.insert_one(data)

        print("Threads saved successfully!")

    else:
        print(f"Error fetching data: {response.status_code}, {response.text}")

# Run script every 60 seconds
if __name__ == "__main__":
    while True:
        fetch_threads("#AI")
        print("Waiting 30 seconds before fetching new threads...\n")
        time.sleep(30)
