import { Router } from "express";
import { register, login, googleAuth } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/googleAuth", googleAuth);

export default router;