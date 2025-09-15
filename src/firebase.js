// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkCkrIti7BIt_jJLBUvFgPnmjHF2wMH7M",
  authDomain: "event-rergistration-system.firebaseapp.com",
  projectId: "event-rergistration-system",
  storageBucket: "event-rergistration-system.firebasestorage.app",
  messagingSenderId: "611979083177",
  appId: "1:611979083177:web:dd8f3cf76d8357791598b8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
