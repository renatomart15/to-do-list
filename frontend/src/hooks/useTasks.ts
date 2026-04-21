import { useState, useEffect } from "react";
import { api } from "../lib/axios";

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, []);

  const changeStatus = async (id: number) => {
    try {
      const response = await api.patch(`/tasks/${id}`);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id: number, title: string) => {
    try {
      const response = await api.put(`/tasks/${id}`, { title });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: title } : task,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (title: string) => {
    try {
      const response = await api.post("/tasks", { title });
      setTasks([...tasks, response.data.newTask]);
    } catch (error) {
      console.log(error);
    }
  };

  return { tasks, changeStatus, deleteTask, updateTask, createTask };
}
