import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../lib/axios";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/user/login", { email, password });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await api.post("/user/register", { email, password });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginWithToken = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider
      value={{ token, login, register, logout, loginWithToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
