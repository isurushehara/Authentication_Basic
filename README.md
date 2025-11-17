# Types of Authentication

1. Frontend and hybrid setups
    - 1.1 HTML + CSS + JS (Frontend Only): Client-side checks only; not secure; use for demos or prototypes.
    - 1.2 HTML + CSS + JS + JSON File (Fake Database): Simulates persistence; still insecure; no real auth or access control.
    - 1.3 HTML + CSS + JS + PHP + MySQL (Session-Based Authentication): Server stores session; cookie identifies user; mature, simple; requires CSRF protection and secure cookies.
    - 1.4 HTML + CSS + JS + Node.js + MySQL (Session-Based Authentication): Express sessions + store (MySQL/Redis); good for server-rendered apps; handle CSRF and session invalidation.
    - 1.5 HTML + CSS + JS + Node.js + MySQL (JWT-Based Authentication): Stateless tokens; scales horizontally; add short expirations, refresh tokens, and revocation lists.

2. Backend-only APIs
    - 2.1 Node.js + Express + MongoDB: REST/GraphQL with sessions or JWT; ideal for SPAs/mobile clients.
    - 2.2 PHP (Laravel) + MySQL: Built-in auth (Sanctum/Passport); rapid setup; robust middleware.
    - 2.3 Python (Flask) + SQLite: Lightweight; good for small services; add extensions for auth/session management.
    - 2.3.1 Python (Flask) + MongoDB: Lightweight; good for small services; add extensions for auth/session management.
    - 2.4 Python (Django) + SQLite: Batteries-included auth; quick start; swap DB for production.
    - 2.4.1 Python (Django) + MongoDB: Batteries-included auth; quick start; swap DB for production.

3. Full-stack JavaScript frameworks
    - 3.1 React + Node.js + MongoDB (MERN): Commonly JWT for SPA; use HttpOnly cookies or Authorization headers.
    - 3.2 Vue + Node.js + MongoDB (MEVN): Similar to MERN; centralize auth state in store.
    - 3.3 Angular + Node.js + MongoDB (MEAN): Interceptors for tokens; guards for protected routes.

Notes:
- Always hash passwords (bcrypt/argon2), enforce HTTPS, validate input, rate-limit, and log auth events.
- For sessions: secure, HttpOnly, SameSite cookies; store server-side (DB/Redis) and rotate.
- For JWT: short-lived access tokens, refresh tokens, audience/issuer claims, and proper revocation.

## Environment Variables (Flask + MongoDB example 2.3.1)
Create a `.env` file (never commit it) based on `.env.example`:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.<hash>.mongodb.net/py_flask_mongo
SECRET_KEY=<strong_random_secret>
```

Windows PowerShell (temporary for current session):
```
$env:MONGO_URI="mongodb+srv://...";
$env:SECRET_KEY="StrongSecretValue";
```

Production: use real secret managers (Azure Key Vault, AWS Secrets Manager, Vault) or environment injection in your deployment platform (Docker `-e`, Kubernetes secrets, etc.).

## Environment Variables (Django + MongoDB example 2.4.1)
Create `.env` from `.env.example` inside `2.4.1 Python (Django) + MongoDB (Backend Only)/django_mongo/` (same folder as `manage.py`):

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.<hash>.mongodb.net/py_django_mongo
MONGO_DB_NAME=django_mongo_db
MONGO_USERS_COLLECTION=users
DJANGO_SECRET_KEY=<64+char_random_string>
JWT_SECRET_KEY=<64+char_random_string>
```

PowerShell (temporary):
```
$env:MONGO_URI="mongodb+srv://...";
$env:DJANGO_SECRET_KEY="$(python -c 'import secrets; print(secrets.token_urlsafe(64))')";
$env:JWT_SECRET_KEY="$(python -c 'import secrets; print(secrets.token_urlsafe(64))')";
python "2.4.1 Python (Django) + MongoDB (Backend Only)\django_mongo\manage.py" runserver
```

Rotate any previously committed secrets: change credentials in MongoDB Atlas, invalidate old Django secret (sessions become invalid), and update any JWT validation services.
