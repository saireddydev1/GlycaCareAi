import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('health_user_session');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('health_demo_mode') === 'true';
  });
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(() => {
    return localStorage.getItem('health_disclaimer_accepted') === 'true';
  });

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          isDemo: false
        };
        setUser(userData);
        localStorage.setItem('health_user_session', JSON.stringify(userData));
        setIsDemoMode(false);
        localStorage.setItem('health_demo_mode', 'false');
      } else if (!isDemoMode) {
        // If not in demo mode and no firebase user, clear state
        setUser(null);
        localStorage.removeItem('health_user_session');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemoMode]);

  const acceptDisclaimer = () => {
    setDisclaimerAccepted(true);
    localStorage.setItem('health_disclaimer_accepted', 'true');
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (auth && !email.endsWith('@demo.com')) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res.user;
      } else {
        // Demo mode login
        return loginAsDemo(email);
      }
    } catch (err) {
      console.warn("Firebase auth failed, falling back to Demo Login:", err.message);
      return loginAsDemo(email);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    setLoading(true);
    try {
      if (auth && !email.endsWith('@demo.com')) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const userData = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: name || email.split('@')[0],
          isDemo: false
        };
        setUser(userData);
        localStorage.setItem('health_user_session', JSON.stringify(userData));
        return res.user;
      } else {
        return loginAsDemo(email, name);
      }
    } catch (err) {
      console.warn("Firebase signup warning, using demo signup:", err.message);
      return loginAsDemo(email, name);
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = (emailOverride, nameOverride) => {
    const demoUser = {
      uid: 'demo-user-12345',
      email: emailOverride || 'alex.morgan@health.demo',
      displayName: nameOverride || 'Alex Morgan',
      isDemo: true
    };
    setUser(demoUser);
    setIsDemoMode(true);
    localStorage.setItem('health_user_session', JSON.stringify(demoUser));
    localStorage.setItem('health_demo_mode', 'true');
    setLoading(false);
    return demoUser;
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (auth && !isDemoMode) {
        await signOut(auth);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setIsDemoMode(false);
      localStorage.removeItem('health_user_session');
      localStorage.removeItem('health_demo_mode');
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isDemoMode,
    disclaimerAccepted,
    acceptDisclaimer,
    login,
    signup,
    loginAsDemo,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
