import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGJrH9kg-IkVzx9vfuuB1l3V14eOGmCo8",
  authDomain: "new-project-65106.firebaseapp.com",
  projectId: "new-project-65106",
  storageBucket: "new-project-65106.firebasestorage.app",
  messagingSenderId: "858736093626",
  appId: "1:858736093626:web:0b20d679a0f033df445583",
  measurementId: "G-MVEJ40REFS",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
