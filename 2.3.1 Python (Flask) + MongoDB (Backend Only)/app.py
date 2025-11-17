from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import jwt
import datetime
import bcrypt
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Load environment variables from .env (if present)
load_dotenv()

# JWT Secret Key from environment (fallback only for dev)
SECRET_KEY = os.getenv("SECRET_KEY", "dev_change_me")

# MongoDB connection via environment variable
mongo_uri = os.getenv("MONGO_URI")
if not mongo_uri:
    raise ValueError("MONGO_URI environment variable not set")
client = MongoClient(mongo_uri)
db = client["auth_db"]
users = db.users



# REGISTER
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Check if user already exists
    if users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    users.insert_one({
        "email": email,
        "password": hashed_pw
    })

    return jsonify({"message": "User registered successfully"}), 201



# LOGIN
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email})
    if not user:
        return jsonify({"message": "Invalid email"}), 401

    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"message": "Incorrect password"}), 401

    # Create JWT Token
    token = jwt.encode({
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=3)
    }, SECRET_KEY)

    return jsonify({"token": token}), 200


# PROTECTED ROUTE (JWT REQUIRED)
def verify_token(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded
    except:
        return None

# DASHBOARD
@app.route("/dashboard", methods=["GET"])
def dashboard():
    token = request.headers.get("Authorization")

    if not token:
        return jsonify({"message": "Token missing"}), 401

    decoded = verify_token(token)

    if not decoded:
        return jsonify({"message": "Invalid token"}), 401

    return jsonify({
        "message": "Welcome to Dashboard!",
        "user": decoded["email"]
    }), 200


# MAIN
if __name__ == "__main__":
    app.run(port=5000, debug=True)
