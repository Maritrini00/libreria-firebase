import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyD2m_ghBnaThAuY8KjKWa_hVdKpvj6ghUw",
    authDomain: "proyecto-2-parcial-f2ee4.firebaseapp.com",
    projectId: "proyecto-2-parcial-f2ee4",
    storageBucket: "proyecto-2-parcial-f2ee4.appspot.com",
    messagingSenderId: "123303830886",
    appId: "1:123303830886:web:1ffe5ce9794845a1add4a7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore()