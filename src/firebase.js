import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRfgNBvRdb7NGhaXbs9qXGOrOxUht9pfg",
  authDomain: "library-a01a7.firebaseapp.com",
  projectId: "library-a01a7",
  storageBucket: "library-a01a7.appspot.com",
  messagingSenderId: "297291095588",
  appId: "1:297291095588:web:7cb65d3eaefa08b7da02b1",
  measurementId: "G-NRFDFTMFVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;