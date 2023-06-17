// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuO2EgBy_ieKkJvSPCqAzixMTwDBEzhzQ",
  authDomain: "busybuy-app.firebaseapp.com",
  projectId: "busybuy-app",
  storageBucket: "busybuy-app.appspot.com",
  messagingSenderId: "478858228363",
  appId: "1:478858228363:web:e1fbb2a9a5e8d26cc6da8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;