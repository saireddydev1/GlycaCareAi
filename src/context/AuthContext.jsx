import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
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

  const getFirebaseErrorMessage = (error) => {
    if (!error || !error.code) return error?.message || 'Authentication operation failed.';
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
        return 'No registered account found with this email.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/email-already-in-use':
        return 'An account with this email address already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/too-many-requests':
        return 'Access disabled due to repeated failed attempts. Reset password or try again later.';
      default:
        return error.message.replace('Firebase: ', '');
    }
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
      // If Firebase key is demo/invalid, fallback to demo mode safely
      if (err.code === 'auth/api-key-not-valid' || err.message?.includes('API key')) {
        console.warn("Firebase Auth fallback to Demo Mode:", err.message);
        return loginAsDemo(email);
      }
      const formattedMessage = getFirebaseErrorMessage(err);
      throw new Error(formattedMessage);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    setLoading(true);
    try {
      if (auth && !email.endsWith('@demo.com')) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (name && res.user) {
          try {
            await updateProfile(res.user, { displayName: name });
          } catch (profileErr) {
            console.warn("Could not update profile name:", profileErr);
          }
        }
        const userData = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: name || res.user.displayName || email.split('@')[0],
          isDemo: false
        };
        setUser(userData);
        localStorage.setItem('health_user_session', JSON.stringify(userData));
        return res.user;
      } else {
        return loginAsDemo(email, name);
      }
    } catch (err) {
      if (err.code === 'auth/api-key-not-valid' || err.message?.includes('API key')) {
        console.warn("Firebase Auth fallback to Demo Mode:", err.message);
        return loginAsDemo(email, name);
      }
      const formattedMessage = getFirebaseErrorMessage(err);
      throw new Error(formattedMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    if (!email) {
      throw new Error('Please enter your email address.');
    }
    setLoading(true);
    try {
      if (auth && !email.endsWith('@demo.com')) {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: 'Password reset link sent! Check your email inbox.' };
      } else {
        // Simulated success for demo mode emails
        return { success: true, message: 'Demo mode: Password reset email link simulated successfully!' };
      }
    } catch (err) {
      if (err.code === 'auth/api-key-not-valid' || err.message?.includes('API key')) {
        return { success: true, message: 'Demo mode: Password reset link simulated successfully.' };
      }
      const formattedMessage = getFirebaseErrorMessage(err);
      throw new Error(formattedMessage);
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
    resetPassword,
    loginAsDemo,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

