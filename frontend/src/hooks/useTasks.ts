import { useState, useEffect } from "react";
import { api } from "../lib/axios";
import { useAuth } from "./useAuth";

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const getTasks = async () => {
        try {
          const response = await api.get("/tasks");
          setTasks(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getTasks();
    } else {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [token]);

  const changeStatus = async (id: number) => {
    if (token) {
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
    } else {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const deleteTask = async (id: number) => {
    if (token) {
      try {
        const response = await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        console.log(error);
      }
    } else {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const updateTask = async (id: number, title: string) => {
    if (token) {
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
    } else {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, title: title } : task,
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const createTask = async (title: string) => {
    if (token) {
      try {
        const response = await api.post("/tasks", { title });
        setTasks([...tasks, response.data.newTask]);
      } catch (error) {
        console.log(error);
      }
    } else {
      const newTask: Task = {
        id: Date.now(),
        title,
        done: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return { tasks, changeStatus, deleteTask, updateTask, createTask };
}
