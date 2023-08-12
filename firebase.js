// Import the functions you need from the SDKs you need
import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfigA = {
  apiKey: "AIzaSyAMlaefa2jfYnsW1GcGER3-ZGZwyp-enlI",
  authDomain: "testtrial-6c836.firebaseapp.com",
  projectId: "testtrial-6c836",
  storageBucket: "testtrial-6c836.appspot.com",
  messagingSenderId: "825532816360",
  appId: "1:825532816360:web:f5b8354485dd4f04a7a25d"
};

const firebaseConfigB = {
  apiKey: "AIzaSyBs5-x1ShYDngW8gNcv8FiepKZBjwuFHCM",
  authDomain: "firsttrial-cff1d.firebaseapp.com",
  databaseURL: "https://firsttrial-cff1d-default-rtdb.firebaseio.com",
  projectId: "firsttrial-cff1d",
  storageBucket: "firsttrial-cff1d.appspot.com",
  messagingSenderId: "453436676208",
  appId: "1:453436676208:web:44505929a6e806e2fe7cb5"
};
// Initialize Firebase
// export const firebaseApp = initializeApp(firebaseConfig);
const appA = initializeApp(firebaseConfigA, 'projectA');
const appB = initializeApp(firebaseConfigB, 'projectB');
export const database = getFirestore(appA);
export const database1 = getFirestore(appB);
// export const auth = getAuth(firebaseApp);
// export const realTimeDatabase = getDatabase(firebaseApp);