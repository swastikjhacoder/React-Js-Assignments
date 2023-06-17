// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB84aO4EJpYt6I_dUuWSljkbnNjNYiEzpI",
  authDomain: "photofolio-ac0a1.firebaseapp.com",
  projectId: "photofolio-ac0a1",
  storageBucket: "photofolio-ac0a1.appspot.com",
  messagingSenderId: "96121645603",
  appId: "1:96121645603:web:6b6f51a907664275f5df96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);