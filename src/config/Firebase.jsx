import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDczcuQcsdB0rdtE-wEjBBf_2-6KHXb3pI",
  authDomain: "devhabit-9862c.firebaseapp.com",
  projectId: "devhabit-9862c",
  storageBucket: "devhabit-9862c.appspot.com",
  messagingSenderId: "287406502715",
  appId: "1:287406502715:web:e411a5170d2bb8d3593d1e",
  measurementId: "G-ZD4ZX1G7MG",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };