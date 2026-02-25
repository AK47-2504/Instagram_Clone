import { useState } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);

  return (
    <AuthContext.Provider value={{ email, setEmail, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
