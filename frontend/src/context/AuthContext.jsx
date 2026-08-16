import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.me().then((d) => setAdmin(d)).catch(() => setAdmin(null)).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const d = await api.login(email, password);
    setAdmin({ email: d.email });
  };
  const logout = async () => { await api.logout(); setAdmin(null); };

  return <AuthContext.Provider value={{ admin, login, logout, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
