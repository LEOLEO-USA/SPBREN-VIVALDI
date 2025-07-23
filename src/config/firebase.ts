// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3Ok2vN2i62Qfy_WYnyqLqFs6Roq2LuEI",
  authDomain: "spbrent2025.firebaseapp.com",
  projectId: "spbrent2025",
  storageBucket: "spbrent2025.firebasestorage.app",
  messagingSenderId: "212606689542",
  appId: "1:212606689542:web:2a49745ec901709a2f3e87",
  measurementId: "G-R7173MP0ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
