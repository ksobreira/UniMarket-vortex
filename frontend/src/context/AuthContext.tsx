import {
  createContext,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../types/user";

interface AuthContextData {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextData | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
const [user, setUser] = useState<User | null>({
  id: "1",
  name: "Kauam Morais",
  email: "kauam@email.com",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}