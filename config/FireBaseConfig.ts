// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "arc1-f2a1d.firebaseapp.com",
  projectId: "arc1-f2a1d",
  storageBucket: "arc1-f2a1d.firebasestorage.app",
  messagingSenderId: "1029814741307",
  appId: "1:1029814741307:web:c611bc80e9605fc8846f1e",
  measurementId: "G-C5B6X7WGTH",
};

// Initialize Firebase (prevent multiple initializations)
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore (using default database)
export const db = getFirestore(app);

// Initialize Analytics (only on client side)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Enable offline persistence only on client side
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn("Firebase persistence failed: Multiple tabs open");
    } else if (err.code === "unimplemented") {
      // The current browser doesn't support persistence
      console.warn("Firebase persistence not available in this browser");
    } else {
      console.error("Firebase persistence error:", err);
    }
  });
}

export { app, analytics };
