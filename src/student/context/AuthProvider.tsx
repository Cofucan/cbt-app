import { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  auth: {
    isAuthenticated: boolean;
    token: string | null;
    user: any;
  };
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Invalid Auth Context");
  return context;
};
// Define the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("student") || "null");
    return token
      ? { isAuthenticated: true, token, user }
      : { isAuthenticated: false, token: null, user: null };
  });

  const login = (token: string, user: any) => {
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
