// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYUmH1rR-WMe8RlZr-KRbXh-FI7RSECJM",
  authDomain: "to-do-e16c6.firebaseapp.com",
  projectId: "to-do-e16c6",
  storageBucket: "to-do-e16c6.appspot.com",
  messagingSenderId: "1023141686538",
  appId: "1:1023141686538:web:9681c16f0a850ebf069ef3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);