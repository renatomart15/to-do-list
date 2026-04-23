import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  changeStatusTask,
} from "../controllers/taskController";

import auth from "../middlewares/authMiddleware";

const router = Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);

router.delete("/:id", auth, deleteTask);
router.put("/:id", auth, updateTask);
router.patch("/:id", auth, changeStatusTask);

export default router;
