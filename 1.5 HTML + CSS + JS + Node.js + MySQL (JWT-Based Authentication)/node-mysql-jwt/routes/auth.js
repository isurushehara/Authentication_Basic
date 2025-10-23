import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const SECRET = "jwt_secret_key";

// ----- Signup -----
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashed], (err) => {
    if (err) return res.status(400).json({ message: "User exists" });

    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    res.json({ message: "Signup success", token, user: { username } });
  });
});

// ----- Login -----
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    res.json({ message: "Login success", token, user: { username } });
  });
});

// ----- Verify token -----
router.get("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ valid: true, user: decoded });
  });
});

export default router;
