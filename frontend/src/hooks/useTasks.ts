import { useState, useEffect } from "react";
import { api } from "../lib/axios";

type Task = {
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

  return tasks;
}
