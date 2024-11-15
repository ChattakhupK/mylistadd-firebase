// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlZ4NUBo7nktlziSssog2f425C10tU-UY",
  authDomain: "mylist-app-271cf.firebaseapp.com",
  projectId: "mylist-app-271cf",
  storageBucket: "mylist-app-271cf.firebasestorage.app",
  messagingSenderId: "1031779725824",
  appId: "1:1031779725824:web:faa3556c498861e9159ee5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}