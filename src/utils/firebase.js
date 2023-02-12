import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxSmYW35C3jQ_GAIiKplZPtThSgrb1VrY",
  authDomain: "burger-builder-c4b3e.firebaseapp.com",
  projectId: "burger-builder-c4b3e",
  storageBucket: "burger-builder-c4b3e.appspot.com",
  messagingSenderId: "586366740518",
  appId: "1:586366740518:web:019604aaeca471b7211ee7",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
