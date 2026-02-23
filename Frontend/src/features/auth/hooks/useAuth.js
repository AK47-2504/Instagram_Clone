import { useContext } from "react";
import { AuthContext } from "../authContext";
import { getCurrentUser, Login, Register } from "../services/authApi";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setuser, loading, setloading } = context;

  const handleLogin = async (email, password) => {
    setloading(true);
    const response = await Login(email, password);
    setuser(response.user);
    setloading(false);
  };

  const handleRegister = async (username, email, password) => {
    setloading(true);
    const response = await Register(username, email, password);
    setuser(response.user);
    setloading(false);
  };

  return {
    user,
    loading,
    handleLogin,    
    handleRegister,
  };
};
