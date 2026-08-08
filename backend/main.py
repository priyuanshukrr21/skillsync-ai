import os

from dotenv import load_dotenv
from google import genai

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# =========================
# Load .env
# =========================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")


# =========================
# Gemini API
# =========================

client = genai.Client(api_key=GEMINI_API_KEY)


# =========================
# FastAPI App
# =========================

app = FastAPI(
    title="SkillSync AI Backend",
    description="Backend API for SkillSync AI",
    version="1.0.0"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Request Model
# =========================

class ChatRequest(BaseModel):
    message: str


# =========================
# Test Route
# =========================

@app.get("/")
def home():
    return {
        "message": "SkillSync AI Backend is running!"
    }


# =========================
# Chat API
# =========================

@app.post("/chat")
def chat(data: ChatRequest):

    models = [
        "gemini-3.6-flash",
        "gemini-3.5-flash",
        "gemini-2.5-flash"
    ]

    last_error = None

    for model_name in models:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=data.message
            )

            return {
                "reply": response.text,
                "model": model_name
            }

        except Exception as e:
            last_error = str(e)

            # Try the next model if this one is unavailable
            if "503" in last_error or "UNAVAILABLE" in last_error:
                continue

            return {
                "reply": f"Error: {last_error}"
            }

    return {
        "reply": "Gemini AI is temporarily busy. Please try again in a few seconds."
    }