// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD849P1Q5eUc6sSmaVgWvr-rcYyVjoilLk",
  authDomain: "devid-e3086.firebaseapp.com",
  projectId: "devid-e3086",
  storageBucket: "devid-e3086.firebasestorage.app",
  messagingSenderId: "863924362751",
  appId: "1:863924362751:web:fab1fb95dd2883d3465bca"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);