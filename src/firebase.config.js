// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "house-marketplace-a4348.firebaseapp.com",
  projectId: "house-marketplace-a4348",
  storageBucket: "house-marketplace-a4348.appspot.com",
  messagingSenderId: "192649447572",
  appId: "1:192649447572:web:17ad675363376ddf528c81",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize firestore

export const db = getFirestore();
