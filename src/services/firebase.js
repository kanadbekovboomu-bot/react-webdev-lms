import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously as fbSignInAnonymously,
  signInWithEmailAndPassword as fbSignInWithEmail,
  createUserWithEmailAndPassword as fbSignUpWithEmail,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  limit,
  getDocs,
} from 'firebase/firestore';

// Default or environment configuration
const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || 'AIzaSyDemoPlaceholderKeyForLMSPlatform2026',
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || 'webdev-lms-demo.firebaseapp.com',
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || 'webdev-lms-demo',
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || 'webdev-lms-demo.appspot.com',
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || '1:1234567890:web:abcdef123456',
};

let app = null;
let auth = null;
let db = null;
let isFirebaseLive = false;

export function initFirebase() {
  if (app) {
    return { app, auth, db, isLive: isFirebaseLive };
  }

  try {
    const isPlaceholder =
      !import.meta.env?.VITE_FIREBASE_API_KEY ||
      import.meta.env.VITE_FIREBASE_API_KEY.includes('DemoPlaceholder') ||
      firebaseConfig.apiKey.includes('Placeholder');

    if (!isPlaceholder) {
      app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
      isFirebaseLive = true;
      console.info('[Firebase] Connected to live Cloud Firestore & Auth.');
    } else {
      console.info('[Firebase] Running in resilient offline / demo mode via LocalStorage adapter.');
      isFirebaseLive = false;
    }
  } catch (err) {
    console.warn('[Firebase] Initialization error, falling back to LocalStorage adapter:', err.message);
    isFirebaseLive = false;
  }

  return { app, auth, db, isLive: isFirebaseLive };
}

export {
  fbSignInAnonymously,
  fbSignInWithEmail,
  fbSignUpWithEmail,
  fbSignOut,
  fbOnAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  limit,
  getDocs,
};
