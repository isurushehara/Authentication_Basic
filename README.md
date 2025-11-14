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
    - 2.4 Python (Django) + SQLite: Batteries-included auth; quick start; swap DB for production.

3. Full-stack JavaScript frameworks
    - 3.1 React + Node.js + MongoDB (MERN): Commonly JWT for SPA; use HttpOnly cookies or Authorization headers.
    - 3.2 Vue + Node.js + MongoDB (MEVN): Similar to MERN; centralize auth state in store.
    - 3.3 Angular + Node.js + MongoDB (MEAN): Interceptors for tokens; guards for protected routes.

Notes:
- Always hash passwords (bcrypt/argon2), enforce HTTPS, validate input, rate-limit, and log auth events.
- For sessions: secure, HttpOnly, SameSite cookies; store server-side (DB/Redis) and rotate.
- For JWT: short-lived access tokens, refresh tokens, audience/issuer claims, and proper revocation.
