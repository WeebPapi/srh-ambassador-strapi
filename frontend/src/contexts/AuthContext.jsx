import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AUTH_STORAGE_KEY, fetchCurrentUser, loginUser, registerUser } from '../services/cms';

const AuthContext = createContext(null);

function readStoredSession() {
  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function storeSession(session) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!session?.jwt) return;

    let isActive = true;

    fetchCurrentUser(session.jwt)
      .then((user) => {
        if (!isActive) return;
        const nextSession = { ...session, user };
        setSession(nextSession);
        storeSession(nextSession);
      })
      .catch(() => {
        if (isActive) setSession(null);
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      });

    return () => {
      isActive = false;
    };
  }, [session?.jwt]);

  const authenticate = async (action, payload) => {
    setStatus('loading');
    try {
      const nextSession = await action(payload);
      setSession(nextSession);
      storeSession(nextSession);
      setStatus('authenticated');
      return nextSession;
    } catch (error) {
      setStatus('error');
      throw error;
    }
  };

  const value = useMemo(() => ({
    jwt: session?.jwt || null,
    user: session?.user || null,
    status,
    login: (payload) => authenticate(loginUser, payload),
    register: (payload) => authenticate(registerUser, payload),
    logout: () => {
      setSession(null);
      setStatus('idle');
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    },
  }), [session, status]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth must be used inside AuthProvider');
  return auth;
}
