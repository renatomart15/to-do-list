import { createContext } from "react";

export type TokenPayload = {
  id: number;
  email: string;
  name: string;
  avatar: string;
};

export type Auth = {
  token: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<Auth | null>(null);
