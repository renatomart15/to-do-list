import { createContext } from "react";
import { type CredentialResponse } from "@react-oauth/google";

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
  googleAuth: (credential: CredentialResponse) => void;
};

export const AuthContext = createContext<Auth | null>(null);
