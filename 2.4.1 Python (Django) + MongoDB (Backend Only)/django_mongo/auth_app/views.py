from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
import bcrypt
import jwt
import datetime

# MongoDB collections
USERS = settings.MONGO_USERS
SECRET_KEY = settings.SECRET_KEY_JWT


# REGISTER
@csrf_exempt
def register(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=400)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if USERS.find_one({"email": email}):
        return JsonResponse({"message": "User already exists"}, status=400)

    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    USERS.insert_one({
        "email": email,
        "password": hashed_pw
    })

    return JsonResponse({"message": "User registered successfully"}, status=201)


# LOGIN
@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=400)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    user = USERS.find_one({"email": email})

    if not user:
        return JsonResponse({"message": "Invalid email"}, status=401)

    if not bcrypt.checkpw(password.encode(), user["password"]):
        return JsonResponse({"message": "Invalid password"}, status=401)

    token = jwt.encode({
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=3)
    }, SECRET_KEY, algorithm="HS256")

    return JsonResponse({"token": token})


# VERIFY TOKEN
def verify_token(request):
    token = request.headers.get("Authorization")

    if not token:
        return None

    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except:
        return None


# PROTECTED ROUTE
def dashboard(request):
    decoded = verify_token(request)

    if not decoded:
        return JsonResponse({"message": "Unauthorized"}, status=401)

    return JsonResponse({
        "message": "Welcome to Dashboard!",
        "email": decoded["email"]
    })
