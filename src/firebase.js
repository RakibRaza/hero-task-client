import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCltkbVe8JAiYS8LkuJX-9mDLm7D5LrzSU",
  authDomain: "jobs-hunt-bd.firebaseapp.com",
  projectId: "jobs-hunt-bd",
  storageBucket: "jobs-hunt-bd.appspot.com",
  messagingSenderId: "207629403046",
  appId: "1:207629403046:web:3204df0382a25d2c32c567"
});
export const auth = app.auth();

