"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
});

const FAKE_USERS: Record<string, User> = {
  "agent@demo.com": { name: "Sarah Khumalo", email: "agent@demo.com", avatar: "SK" },
  "admin@demo.com": { name: "Thabo Mokoena", email: "admin@demo.com", avatar: "TM" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    // Fake delay + any password works for demo emails
    await new Promise((r) => setTimeout(r, 800));
    const u = FAKE_USERS[email.toLowerCase()];
    if (u && password.length >= 3) {
      setUser(u);
      return true;
    }
    // Accept any @ email with password >= 3 chars as a generic login
    if (email.includes("@") && password.length >= 3) {
      const name = email.split("@")[0].replace(/[._-]/g, " ");
      const initials = name.split(" ").map((w) => w[0]?.toUpperCase() ?? "").join("").slice(0, 2);
      setUser({ name, email, avatar: initials || "U" });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
