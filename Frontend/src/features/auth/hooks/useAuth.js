import { useContext } from "react";
import { AuthContext } from "../authContext";

import { Login, Register } from "../services/authApi";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { email, setEmail, loading, setLoading } = context;

  const handleLogin = async (email, password) => {
    setLoading(true);
    const response = await Login(email, password);
    setEmail(response.email);
    setLoading(false);
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    const response = await Register(username, email, password);
    setEmail(response.email);
    setLoading(false);
  };

  return {
    email,
    loading,
    handleLogin,
    handleRegister,
  };
};
