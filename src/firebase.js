// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg-INIqsAjfTxsZNgiqqzQHBfVTmkaefg",
  authDomain: "challenge-ec988.firebaseapp.com",
  projectId: "challenge-ec988",
  storageBucket: "challenge-ec988.appspot.com",
  messagingSenderId: "812956636810",
  appId: "1:812956636810:web:4e89bb630863aafd74ff73",
  measurementId: "G-QV0NR9M4MD",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
