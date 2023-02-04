// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa5fwOWGvfUNjoLNgBH8KGI_ejXjfqZv8",
  authDomain: "skindeep-c2138.firebaseapp.com",
  projectId: "skindeep-c2138",
  storageBucket: "skindeep-c2138.appspot.com",
  messagingSenderId: "359119583003",
  appId: "1:359119583003:web:d25f05a82cfe685ccf05be",
  measurementId: "G-NB8ZV9PLT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);