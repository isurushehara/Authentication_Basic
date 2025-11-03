import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { connectDB } from './db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// example protected route
import verifyJWT from './middleware/auth.js';
app.get('/api/protected', verifyJWT, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protected data.` });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 API listening on http://localhost:${PORT}`));
});
