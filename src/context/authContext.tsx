import React, { createContext, useContext } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { User } from '@/pages/Users/types/User';

interface AuthContextType {
  user: User | null;
  setUser: (value: User | null | ((val: User | null) => User | null)) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<User>('user', null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
