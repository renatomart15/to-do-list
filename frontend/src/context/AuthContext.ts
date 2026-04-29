import { createContext } from "react";

export type User = {
  id: number;
  email: string;
  name: string;
};

export type Auth = {
  token: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
  user: User | null;
};

export const AuthContext = createContext<Auth | null>(null);
