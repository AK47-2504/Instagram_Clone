import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext;

export async function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);
  };
}
