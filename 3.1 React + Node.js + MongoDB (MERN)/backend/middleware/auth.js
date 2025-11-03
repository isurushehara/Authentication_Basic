import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function verifyJWT(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });

  const token = auth.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = { id: decoded.id, username: decoded.username };
    next();
  });
}
