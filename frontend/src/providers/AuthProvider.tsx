import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../lib/axios";
import { jwtDecode } from "jwt-decode";
import type { User } from "../context/AuthContext";
import { type CredentialResponse } from "@react-oauth/google";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/user/login", { email, password });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await api.post("/user/register", {
        email,
        password,
        name,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const googleAuth = async (CredentialReponse: CredentialResponse) => {
    try {
      const response = await api.post("/user/googleAuth", {
        credential: CredentialReponse.credential,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, login, register, logout, user, googleAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
