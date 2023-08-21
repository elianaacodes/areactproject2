import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0GN7IP9wsXEM2Dtra7z-UIWnneK8yCxE",
  authDomain: "marvel-e8f9a.firebaseapp.com",
  projectId: "marvel-e8f9a",
  storageBucket: "marvel-e8f9a.appspot.com",
  messagingSenderId: "242958712071",
  appId: "1:242958712071:web:721c80b32a26787317d9a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;