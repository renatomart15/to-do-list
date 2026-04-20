import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  changeStatusTask,
} from "../controllers/taskController";

const router = Router();

router.post("/", createTask);
router.get("/", getTasks);

router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.patch("/:id", changeStatusTask);

export default router;
