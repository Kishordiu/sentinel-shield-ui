import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "operator" | "viewer";
  companyId?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  companyName: string;
  adminEmail: string;
  adminName: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: wire to Supabase onAuthStateChange
    // Check for existing session on mount
    const stored = localStorage.getItem("zt_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // TODO: wire to /auth/login endpoint or Supabase auth.signInWithPassword
    setIsLoading(true);
    try {
      // Simulate — replace with real auth call
      const u: User = { id: crypto.randomUUID(), email, name: email.split("@")[0], role: "admin" };
      setUser(u);
      localStorage.setItem("zt_user", JSON.stringify(u));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    // TODO: wire to Supabase auth.signInWithOAuth({ provider: 'google' })
    setIsLoading(true);
    try {
      const u: User = { id: crypto.randomUUID(), email: "user@gmail.com", name: "Google User", role: "admin" };
      setUser(u);
      localStorage.setItem("zt_user", JSON.stringify(u));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    // TODO: wire to /auth/register endpoint or Supabase auth.signUp
    setIsLoading(true);
    try {
      const u: User = { id: crypto.randomUUID(), email: data.adminEmail, name: data.adminName, role: "admin" };
      setUser(u);
      localStorage.setItem("zt_user", JSON.stringify(u));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // TODO: wire to Supabase auth.signOut
    setUser(null);
    localStorage.removeItem("zt_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
