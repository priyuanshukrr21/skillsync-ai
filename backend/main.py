import os
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv
from google import genai

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

from pydantic import BaseModel, EmailStr

from pymongo import MongoClient
from passlib.context import CryptContext
import jwt 


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGODB_URI = os.getenv("MONGODB_URI")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI not found in .env file")


# =========================================================
# GEMINI AI
# =========================================================

client = genai.Client(api_key=GEMINI_API_KEY)


# =========================================================
# MONGODB
# =========================================================

mongo_client = MongoClient(MONGODB_URI)

db = mongo_client["skillsync_ai"]

users_collection = db["users"]


# =========================================================
# PASSWORD HASHING
# =========================================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# =========================================================
# JWT SETTINGS
# =========================================================

SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY",
    "skillsync-secret-change-this-later"
)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="SkillSync AI Backend",
    description="Backend API for SkillSync AI",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# REQUEST MODELS
# =========================================================

class ChatRequest(BaseModel):
    message: str


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# =========================================================
# PASSWORD FUNCTIONS
# =========================================================

def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)


# =========================================================
# JWT TOKEN
# =========================================================

def create_access_token(email: str):

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": email,
        "exp": expire
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


# =========================================================
# HOME / TEST ROUTE
# =========================================================

@app.get("/")
def home():

    return {
        "message": "SkillSync AI Backend is running!"
    }


# =========================================================
# DATABASE TEST
# =========================================================

@app.get("/database-test")
def database_test():

    try:

        mongo_client.admin.command("ping")

        return {
            "status": "success",
            "message": "MongoDB connected successfully!"
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }


# =========================================================
# SIGNUP API
# =========================================================

@app.post("/signup")
def signup(data: SignupRequest):

    # Check existing user

    existing_user = users_collection.find_one(
        {
            "email": data.email
        }
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )


    # Hash password

    hashed_password = hash_password(
        data.password
    )


    # Create user

    user = {

        "name": data.name,

        "email": data.email,

        "password": hashed_password,

        "skills": [],

        "education": "",

        "experience": "",

        "created_at": datetime.now(timezone.utc)
    }


    # Save user

    result = users_collection.insert_one(user)


    return {

        "success": True,

        "message": "Account created successfully!",

        "user_id": str(result.inserted_id),

        "name": data.name,

        "email": data.email
    }


# =========================================================
# LOGIN API
# =========================================================

@app.post("/login")
def login(data: LoginRequest):

    # Find user

    user = users_collection.find_one(
        {
            "email": data.email
        }
    )


    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    # Verify password

    if not verify_password(
        data.password,
        user["password"]
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    # Create JWT

    access_token = create_access_token(
        data.email
    )


    return {

        "success": True,

        "message": "Login successful!",

        "access_token": access_token,

        "token_type": "bearer",

        "user": {

            "id": str(user["_id"]),

            "name": user["name"],

            "email": user["email"]
        }
    }


# =========================================================
# CHAT API
# =========================================================

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


            if (
                "503" in last_error
                or
                "UNAVAILABLE" in last_error
            ):

                continue


            return {

                "reply": f"Error: {last_error}"
            }


    return {

        "reply":
        "Gemini AI is temporarily busy. Please try again in a few seconds."
    }