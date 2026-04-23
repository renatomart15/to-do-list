import { Router } from "express";
import { register, login } from "../controllers/authController";
import auth from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", auth, login);

export default router;
