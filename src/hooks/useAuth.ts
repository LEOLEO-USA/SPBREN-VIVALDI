import { useState, useEffect } from 'react';
import { validateAdminCredentials, subscribeToAdminCredentials, AdminCredentials } from '../lib/adminCredentials';

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('auth-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('auth-user');
      }
    }
  }, []);

  const signIn = async (login: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      // Simple credential check
      if (login === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password) {
        const adminUser: AuthUser = {
          uid: 'admin-001',
          email: 'admin@spbrent.local',
          displayName: 'Администратор',
          role: 'admin'
        };
        
        setUser(adminUser);
        localStorage.setItem('auth-user', JSON.stringify(adminUser));
        return adminUser;
      } else {
        throw new Error('invalid-credentials');
      }
    } catch (err: any) {
      const errorMessage = err.message === 'invalid-credentials' 
        ? 'Неверный логин или пароль' 
        : 'Ошибка входа в систему';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    // For demo purposes, signUp is disabled
    setError('Регистрация отключена. Используйте admin/admin');
    throw new Error('Registration disabled');
  };

  const logout = async () => {
    try {
      setError(null);
      setUser(null);
      localStorage.removeItem('auth-user');
    } catch (err: any) {
      setError('Ошибка выхода');
      throw err;
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    logout,
    isAdmin,
  };
}
