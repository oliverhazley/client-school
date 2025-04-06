# credentials.py
import os
from dotenv import load_dotenv

load_dotenv()

USERNAME = os.getenv("DIARY_USERNAME")
PASSWORD = os.getenv("DIARY_PASSWORD")

if USERNAME is None or PASSWORD is None:
    raise ValueError("Missing USERNAME or PASSWORD in .env file.")
