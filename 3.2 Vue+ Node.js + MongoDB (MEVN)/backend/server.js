import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./db.js";
import verifyJWT from "./middleware/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// protected example
app.get("/api/protected", verifyJWT, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, secure data here.` });
});

connectDB();
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on ${process.env.PORT}`)
);
