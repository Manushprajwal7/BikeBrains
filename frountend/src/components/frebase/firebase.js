// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWf9VWmWWAq7PLd-ZNJyNguIr1ovStfHU",
  authDomain: "mrcardoctor-703c9.firebaseapp.com",
  projectId: "mrcardoctor-703c9",
  storageBucket: "mrcardoctor-703c9.appspot.com",
  messagingSenderId: "174903695818",
  appId: "1:174903695818:web:08b13825ccb4ff82845733",
  measurementId: "G-RRTZ8TZT9G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
