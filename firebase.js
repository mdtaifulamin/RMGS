// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMlaefa2jfYnsW1GcGER3-ZGZwyp-enlI",
  authDomain: "testtrial-6c836.firebaseapp.com",
  projectId: "testtrial-6c836",
  storageBucket: "testtrial-6c836.appspot.com",
  messagingSenderId: "825532816360",
  appId: "1:825532816360:web:f5b8354485dd4f04a7a25d"
};
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const database = getFirestore(firebaseApp);
// export const auth = getAuth(firebaseApp);
// export const realTimeDatabase = getDatabase(firebaseApp);