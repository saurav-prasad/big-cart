// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvMlnetCZe0-E6_GHCQPVjLrakhdYErNE",
    authDomain: "big-cart-7a0de.firebaseapp.com",
    projectId: "big-cart-7a0de",
    storageBucket: "big-cart-7a0de.appspot.com",
    messagingSenderId: "258243365137",
    appId: "1:258243365137:web:aa2e00420597cf08c564b0",
    measurementId: "G-594TTC8V3N"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;