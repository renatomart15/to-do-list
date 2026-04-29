import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../lib/axios";
import { jwtDecode } from "jwt-decode";
import type { User } from "../context/AuthContext";

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
      console.log(error);
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
      console.log(error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
