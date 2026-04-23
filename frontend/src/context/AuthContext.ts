import { createContext } from "react";

type AuthContext = {
  token: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext | null>(null);
