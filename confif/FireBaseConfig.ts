// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "arcc-39080.firebaseapp.com",
  projectId: "arcc-39080",
  storageBucket: "arcc-39080.firebasestorage.app",
  messagingSenderId: "747310785778",
  appId: "1:747310785778:web:c05ad8fc70605d3b719c6b",
  measurementId: "G-S5KZJ6K5B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app,"arcc")