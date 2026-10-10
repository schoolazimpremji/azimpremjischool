'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  email: string;
  role: 'admin';
  name?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  login: async () => ({ success: false }),
  logout: () => {},
});

const AUTH_STORAGE_KEY = 'azimpremjischool_admin_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    // Check school admin email
    if (email.trim().toLowerCase() === 'schoolazimpremji@gmail.com') {
      const adminUser: AuthUser = {
        email: email.trim().toLowerCase(),
        role: 'admin',
        name: 'School Administrator',
      };
      setUser(adminUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
      return { success: true };
    }

    return {
      success: false,
      error: 'Access Denied: This account is not in the approved administrator allowlist.',
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: Boolean(user?.role === 'admin'), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
