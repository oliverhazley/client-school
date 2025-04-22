# variables/credentials.py
import os
from dotenv import load_dotenv

load_dotenv()

USERNAME = os.getenv("DIARY_USERNAME")
PASSWORD = os.getenv("DIARY_PASSWORD")
BASE_URL = os.getenv("DIARY_API_URL", "https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api")

if not USERNAME or not PASSWORD:
    raise ValueError("Missing USERNAME or PASSWORD in .env file.")

# Optional: log current API target (debugging)
print(f"Using API: {BASE_URL}")
