import { Router } from "express";
import { register, login } from "../controllers/authController";
import passport from "../config/passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Rotas do google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as { id: number; email: string };
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    res.redirect(`http://localhost:5173?token=${token}`);
  },
);

export default router;
