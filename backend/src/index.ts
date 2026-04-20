import express from "express";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá");
});

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
