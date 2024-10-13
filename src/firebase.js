// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_QEHI0bnOqqCiZAi-d0T639X0hzc5Rcw",
  authDomain: "crud-app-c4e7d.firebaseapp.com",
  projectId: "crud-app-c4e7d",
  storageBucket: "crud-app-c4e7d.appspot.com",
  messagingSenderId: "1050032620472",
  appId: "1:1050032620472:web:1542a745da731ca99d854d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}