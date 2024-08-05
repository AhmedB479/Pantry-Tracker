// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcdKT-t5oCf6Z_FLpJsoSUvQPA5u0b4xw",
  authDomain: "pantry-96a9b.firebaseapp.com",
  projectId: "pantry-96a9b",
  storageBucket: "pantry-96a9b.appspot.com",
  messagingSenderId: "248532126013",
  appId: "1:248532126013:web:190b971268122a76e6dd54",
  measurementId: "G-NWMBX81J3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}