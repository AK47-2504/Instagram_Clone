import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setuser, setloading, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
