import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("student"));
    return token
      ? { isAuthenticated: true, token, user }
      : { isAuthenticated: false, token: null, user: null };
  });

  const login = (token, user) => {
    setAuth({ isAuthenticated: true, token, user });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, token: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("student");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
