import express from "express";
const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.userId)
    return res.status(401).json({ error: "Unauthorized" });
  next();
}

router.get("/", requireAuth, (req, res) => {
  res.json({
    message: `Welcome, ${req.session.username}!`,
  });
});

export default router;
