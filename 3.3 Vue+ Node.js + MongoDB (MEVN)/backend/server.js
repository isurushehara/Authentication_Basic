import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { connectDB } from './db.js';
import verifyJWT from './middleware/auth.js';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.get('/api/protected', verifyJWT, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protected data.` });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
});
