// import { createContext, useState, ReactNode } from "react";

// // Define the type for the user (you can expand this with more fields if needed)
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   // Add other fields based on your user object
// }

// // Define the type for the auth state
// interface AuthState {
//   isAuthenticated: boolean;
//   token: string | null;
//   user: User | null;
// }

// // Define the type for the context
// interface AuthContextType {
//   auth: AuthState;
//   login: (token: string, user: User) => void;
//   logout: () => void;
// }

// // Initialize the context with a default value
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [auth, setAuth] = useState<AuthState>(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")!) : null;

//     return token
//       ? { isAuthenticated: true, token, user }
//       : { isAuthenticated: false, token: null, user: null };
//   });

//   const login = (token: string, user: User) => {
//     setAuth({ isAuthenticated: true, token, user });
//     localStorage.setItem("token", token);
//     localStorage.setItem("student", JSON.stringify(user));
//   };

//   const logout = () => {
//     setAuth({ isAuthenticated: false, token: null, user: null });
//     localStorage.removeItem("token");
//     localStorage.removeItem("student");
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;



// src/context/AuthProvider.tsx

import { createContext, useState, ReactNode, useContext } from "react";

// Define the AuthContextType interface
interface AuthContextType {
  auth: {
    isAuthenticated: boolean;
    token: string | null;
    user: any; // You can define a more specific type for 'user' if needed
  };
  login: (token: string, user: any) => void;
  logout: () => void;
}

// Create the context with a default value of undefined (we'll handle this below)
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
