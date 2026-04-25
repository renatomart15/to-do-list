import dotenv from "dotenv";
dotenv.config();

import express from "express";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("Olá");
});

app.use("/tasks", taskRoutes);
app.use("/user", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
