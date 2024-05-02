// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDKaHeRDyyZszMB89oV0BdXx1eOODIiHk",
  authDomain: "tribe-b.firebaseapp.com",
  projectId: "tribe-b",
  storageBucket: "tribe-b.appspot.com",
  messagingSenderId: "202213317085",
  appId: "1:202213317085:web:17a62b698796c15d35fe34",
  measurementId: "G-PNQQFEECEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);