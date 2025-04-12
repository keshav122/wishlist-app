// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAMlRkJx5N8BRyto4UObzxIJEDQ0TBDok",
    authDomain: "wishlist-app-94a68.firebaseapp.com",
    projectId: "wishlist-app-94a68",
    storageBucket: "wishlist-app-94a68.firebasestorage.app",
    messagingSenderId: "746583473522",
    appId: "1:746583473522:web:43301cf748bf24d471b1eb"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);














