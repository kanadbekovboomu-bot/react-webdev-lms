import {
  initFirebase,
  fbSignInAnonymously,
  fbSignInWithEmail,
  fbSignUpWithEmail,
  fbSignOut,
  fbOnAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from './firebase.js';

const STORAGE_KEYS = {
  CURRENT_USER: 'lms_current_user',
  USERS_STORE: 'lms_registered_users',
  PROGRESS_PREFIX: 'lms_progress_',
  DOCS_STORE_PREFIX: 'lms_store_',
};

class StorageAdapter {
  constructor() {
    const { isLive, auth, db } = initFirebase();
    this.isLive = isLive;
    this.auth = auth;
    this.db = db;
    this._authListeners = [];

    // Initialize mock session from localStorage if offline
    if (!this.isLive && typeof window !== 'undefined' && window.localStorage) {
      try {
        const cached = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        if (cached) {
          this.currentUser = JSON.parse(cached);
        } else {
          // Default initial guest session
          this.currentUser = null;
        }
      } catch (e) {
        this.currentUser = null;
      }
    }
  }

  isCloudSynced() {
    return this.isLive;
  }

  getCurrentUser() {
    if (this.isLive && this.auth?.currentUser) {
      const u = this.auth.currentUser;
      return {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || (u.isAnonymous ? 'Guest Student' : u.email.split('@')[0]),
        isAnonymous: u.isAnonymous,
      };
    }
    return this.currentUser;
  }

  onAuthChange(callback) {
    if (this.isLive && this.auth) {
      return fbOnAuthStateChanged(this.auth, (user) => {
        if (user) {
          const formatted = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || (user.isAnonymous ? 'Guest Student' : user.email.split('@')[0]),
            isAnonymous: user.isAnonymous,
          };
          callback(formatted);
        } else {
          callback(null);
        }
      });
    }

    this._authListeners.push(callback);
    callback(this.currentUser);

    return () => {
      this._authListeners = this._authListeners.filter((fn) => fn !== callback);
    };
  }

  _notifyAuthListeners(user) {
    this.currentUser = user;
    if (typeof window !== 'undefined' && window.localStorage) {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    }
    this._authListeners.forEach((fn) => fn(user));
  }

  async signInAnonymousUser() {
    if (this.isLive && this.auth) {
      const cred = await fbSignInAnonymously(this.auth);
      return {
        uid: cred.user.uid,
        email: null,
        displayName: 'Guest Student',
        isAnonymous: true,
      };
    }

    // Offline / Demo Anonymous User
    const guestId = 'guest_' + Math.random().toString(36).substring(2, 9);
    const guestUser = {
      uid: guestId,
      email: null,
      displayName: `Guest (${guestId.slice(-4)})`,
      isAnonymous: true,
    };
    this._notifyAuthListeners(guestUser);
    return guestUser;
  }

  async signInWithEmail(email, password) {
    if (this.isLive && this.auth) {
      const cred = await fbSignInWithEmail(this.auth, email, password);
      return {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || email.split('@')[0],
        isAnonymous: false,
      };
    }

    // LocalStorage fallback authentication
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS_STORE);
    const users = usersJson ? JSON.parse(usersJson) : [];
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found || found.password !== password) {
      throw new Error('Invalid email or password');
    }

    const sessionUser = {
      uid: found.uid,
      email: found.email,
      displayName: found.displayName || found.email.split('@')[0],
      isAnonymous: false,
    };
    this._notifyAuthListeners(sessionUser);
    return sessionUser;
  }

  async signUpWithEmail(email, password) {
    if (this.isLive && this.auth) {
      const cred = await fbSignUpWithEmail(this.auth, email, password);
      return {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || email.split('@')[0],
        isAnonymous: false,
      };
    }

    // LocalStorage fallback registration
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS_STORE);
    const users = usersJson ? JSON.parse(usersJson) : [];
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const uid = 'user_' + Date.now().toString(36);
    const newUser = {
      uid,
      email,
      password, // in local demo fallback mode only
      displayName: email.split('@')[0],
      isAnonymous: false,
      createdAt: Date.now(),
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS_STORE, JSON.stringify(users));

    const sessionUser = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      isAnonymous: false,
    };
    this._notifyAuthListeners(sessionUser);
    return sessionUser;
  }

  async signOutUser() {
    if (this.isLive && this.auth) {
      await fbSignOut(this.auth);
      return;
    }

    this._notifyAuthListeners(null);
  }

  async saveUserData(collectionName, docId, data) {
    if (this.isLive && this.db) {
      try {
        const docRef = doc(this.db, collectionName, docId);
        await setDoc(docRef, { ...data, updatedAt: Date.now() }, { merge: true });
        return;
      } catch (err) {
        console.warn(`[Firestore] Failed to save in ${collectionName}/${docId}, caching to localStorage:`, err.message);
      }
    }

    // LocalStorage persistence
    try {
      const key = `${STORAGE_KEYS.DOCS_STORE_PREFIX}${collectionName}_${docId}`;
      localStorage.setItem(key, JSON.stringify({ ...data, updatedAt: Date.now() }));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  async fetchUserData(collectionName, docId) {
    if (this.isLive && this.db) {
      try {
        const docRef = doc(this.db, collectionName, docId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          return snap.data();
        }
      } catch (err) {
        console.warn(`[Firestore] Failed to fetch ${collectionName}/${docId}, falling back to localStorage:`, err.message);
      }
    }

    try {
      const key = `${STORAGE_KEYS.DOCS_STORE_PREFIX}${collectionName}_${docId}`;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  }

  // Specialized LMS progress helpers
  async saveLMSProgress(userId, progressData) {
    return this.saveUserData('lms_progress', userId, {
      userId,
      ...progressData,
      updatedAt: Date.now(),
    });
  }

  async fetchLMSProgress(userId) {
    return this.fetchUserData('lms_progress', userId);
  }
}

export const storageService = new StorageAdapter();
