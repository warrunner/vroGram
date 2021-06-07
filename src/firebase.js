// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyCTHxyB-gfRAUQ5KWVnNYZwxOyBBPgObwk",
    authDomain: "instagram-clone-ce5d3.firebaseapp.com",
    projectId: "instagram-clone-ce5d3",
    storageBucket: "instagram-clone-ce5d3.appspot.com",
    messagingSenderId: "619558511170",
    appId: "1:619558511170:web:1df108cc6a722550f583db",
    measurementId: "G-0T5SLG0ZD5"
  })

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
export {db, auth, storage}; 