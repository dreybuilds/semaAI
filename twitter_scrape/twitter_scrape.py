import time
import os
import tweepy
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus

# Load environment variables
load_dotenv()

# MongoDB Credentials
username = quote_plus('nzauaudrey')
password = quote_plus('39wzDX4bJCc1tM6i')
uri = f"mongodb+srv://{username}:{password}@cluster0.m7ua9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Twitter API Credentials
API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET_KEY")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
ACCESS_SECRET = os.getenv("ACCESS_TOKEN_SECRET")

# Create a new MongoDB client
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["twitter_db"]
collection = db["semaAI_posts"]

# Authenticate with Twitter
auth = tweepy.OAuth1UserHandler(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_SECRET)
api = tweepy.API(auth, wait_on_rate_limit=True)

def fetch_tweets():
    """Fetch tweets with hashtag #semaAI and store in MongoDB."""
    print("Fetching latest tweets...")
    query = "#semaAI -filter:retweets"  # Exclude retweets
    tweets = tweepy.Cursor(api.search_tweets, q=query, lang="en", tweet_mode="extended").items(5)

    for tweet in tweets:
        data = {
            "user_id": tweet.user.id_str,
            "username": tweet.user.screen_name,
            "content": tweet.full_text,
            "created_at": tweet.created_at
        }
        # Avoid duplicate entries
        if not collection.find_one({"user_id": data["user_id"], "created_at": data["created_at"]}):
            collection.insert_one(data)

    print("Data saved to MongoDB successfully!")

# Run the script continuously every 60 seconds
if __name__ == "__main__":
    while True:
        fetch_tweets()
        print("Waiting for 60 seconds before fetching new tweets...\n")
        time.sleep(60)
