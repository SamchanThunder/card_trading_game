// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAC5b7yM_ITSf2Qs5w2MF2gNJEFLA0n1jg",
authDomain: "card-trading-game.firebaseapp.com",
projectId: "card-trading-game",
storageBucket: "card-trading-game.appspot.com",
messagingSenderId: "351371125383",
appId: "1:351371125383:web:199b3a3eafcdd1ce684e22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);