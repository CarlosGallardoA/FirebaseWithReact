// Import the functions you need from the SDKs you need
//this version 9 of firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-tkXa1QBVdmEBrHuqtDj_wN5vHJUbtSQ",
  authDomain: "crudreact-2d193.firebaseapp.com",
  projectId: "crudreact-2d193",
  storageBucket: "crudreact-2d193.appspot.com",
  messagingSenderId: "353927363987",
  appId: "1:353927363987:web:2032430921e3016daefc66",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
