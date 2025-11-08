import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) return res.status(409).json({ message: "User already exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hash });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(201).json({ user, token });
});

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }]
  });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const correct = await bcrypt.compare(password, user.password);
  if (!correct) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ user, token });
});

export default router;
