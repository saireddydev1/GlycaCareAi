import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForTesting123456789",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "health-platform-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "health-platform-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "health-platform-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:demo123456789"
};

// Initialize Firebase safely
let app;
let auth;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase initialization warning (using Demo Auth fallback mode):", error.message);
}

export { app, auth };
