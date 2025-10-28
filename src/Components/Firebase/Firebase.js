import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYimcMQmqCzJ9OaRhEjseWmNsyPcUjssY",
  authDomain: "hr-dashboard-78815.firebaseapp.com",
  projectId: "hr-dashboard-78815",
  storageBucket: "hr-dashboard-78815.firebasestorage.app",
  messagingSenderId: "1006024812055",
  appId: "1:1006024812055:web:63b523b7254da83d4b1e52",
  measurementId: "G-PFTFX7WE50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
