"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      const response = await api.post("/session", { email, password });
      const { user } = response.data; 
      delete user.password;
      localStorage.setItem("@meta-reading:user", JSON.stringify(user));
    } catch (error) {
      const errorMessage = error.response.data.message;
      if(errorMessage){
        alert(errorMessage);
      } else {
        alert("Não foi possível logar");
      }
    }
  }

  async function logout() {
    setUser(null);
    await api.delete("/session");
    localStorage.removeItem("@meta-reading:user");
  }

  useEffect(() => {
    const user = localStorage.getItem("@meta-reading:user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{user, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}