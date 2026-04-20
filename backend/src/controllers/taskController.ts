import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newTask = await prisma.task.create({ data: { title } });
    res.status(201).json({ message: "Task criada com sucesso", newTask });
  } catch (error) {
    res.status(500).send("Erro ao criar task");
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { done } = req.query;
    const tasks = await prisma.task.findMany({
      where: done !== undefined ? { done: done === "true" } : {},
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send("Erro ao buscar tasks");
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);
  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (task) {
      const deletedTask = await prisma.task.delete({ where: { id: taskId } });
      return res
        .status(200)
        .json({ message: "Task deletada com suceso", task: deletedTask });
    }
    return res.status(404).json({ error: "Task não encontrada" });
  } catch (error) {
    res.status(500).send("Erro ao deletar tasks");
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const taskId = Number(req.params.id);
  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (task) {
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: { title: title },
      });
      return res
        .status(200)
        .json({ message: "Task atualizada com sucesso", task: updatedTask });
    }
    return res.status(404).json({ error: "Task não encontrada" });
  } catch (error) {
    res.status(500).send("Erro ao atualizar task");
  }
};

export const changeStatusTask = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);
  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (task) {
      const ChangedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          done: !task.done,
        },
      });
      return res
        .status(200)
        .json({ message: "Status atualizado com sucesso", task: ChangedTask });
    }
    return res.status(404).json({ error: "Task não encontrada" });
  } catch (error) {
    res.status(500).send("Erro ao mudar status da task");
  }
};
