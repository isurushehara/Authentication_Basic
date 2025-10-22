import express from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";

const router = express.Router();

// ---- SIGN UP ----
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  try {
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email=? OR username=? LIMIT 1",
      [email, username]
    );
    if (existing.length)
      return res.status(409).json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username,email,password_hash) VALUES (?,?,?)",
      [username, email, hash]
    );
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---- LOGIN ----
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password)
    return res.status(400).json({ error: "Missing credentials" });

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email=? OR username=? LIMIT 1",
      [identifier, identifier]
    );
    if (!rows.length)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ error: "Invalid credentials" });

    req.session.userId = user.id;
    req.session.username = user.username;
    res.json({ message: "Login successful", username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---- LOGOUT ----
router.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ message: "Logged out" }));
});

export default router;
