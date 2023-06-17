// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZn9y3-VTzKqmHQ0BQFeKmafix3lVwKU0",
  authDomain: "blogging-app-e5c8c.firebaseapp.com",
  projectId: "blogging-app-e5c8c",
  storageBucket: "blogging-app-e5c8c.appspot.com",
  messagingSenderId: "409219108326",
  appId: "1:409219108326:web:a275150298b9b88611da27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);