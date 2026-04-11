import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("library_token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("library_user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem("library_user", JSON.stringify(nextUser));
    localStorage.setItem("library_token", nextToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("library_user");
    localStorage.removeItem("library_token");
  };

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token), login, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
