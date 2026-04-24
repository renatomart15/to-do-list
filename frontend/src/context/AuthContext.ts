import { createContext } from "react";

export type Auth = {
  token: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<Auth | null>(null);
