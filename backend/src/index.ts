import dotenv from "dotenv";
dotenv.config();

import express from "express";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();
const PORT = 10000;

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://to-do-list-2xzv.onrender.com",
      "https://to-do-list-ebon-psi-95.vercel.app",
    ],
    credentials: true,
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
