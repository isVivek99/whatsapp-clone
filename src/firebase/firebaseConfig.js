import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';//authentication


const firebaseConfig = {
    apiKey: "AIzaSyCOtTK69bcNGA4NYJbHMEpjkmed4xv20rA",
    authDomain: "chat-app-clone-a1526.firebaseapp.com",
    projectId: "chat-app-clone-a1526",
    storageBucket: "chat-app-clone-a1526.appspot.com",
    messagingSenderId: "975640340977",
    appId: "1:975640340977:web:0e5dcead91e31ec9e5fc50"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {timestamp, auth, provider};
  export default db;