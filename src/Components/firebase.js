// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLmZT8k5RADgmMdxWlbieoo8AdZ3vXA2c",
  authDomain: "email-password-20c56.firebaseapp.com",
  projectId: "email-password-20c56",
  storageBucket: "email-password-20c56.appspot.com",
  messagingSenderId: "1003456818073",
  appId: "1:1003456818073:web:933c558c9aa148ff5e0108"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;