// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "arcc-39080.firebaseapp.com",
  projectId: "arcc-39080",
  storageBucket: "arcc-39080.firebasestorage.app",
  messagingSenderId: "747310785778",
  appId: "1:747310785778:web:c05ad8fc70605d3b719c6b",
  measurementId: "G-S5KZJ6K5B4"
};

// Initialize Firebase (prevent multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore with database ID
export const db = getFirestore(app, "arcc");

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

export { app };