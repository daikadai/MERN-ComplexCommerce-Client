import firebase from "firebase/app"
import 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS8iYPJ5u_9dcPh7hgWu-wY_0QaWdsKLk",
  authDomain: "complexecommerce.firebaseapp.com",
  projectId: "complexecommerce",
  storageBucket: "complexecommerce.appspot.com",
  messagingSenderId: "1066726980513",
  appId: "1:1066726980513:web:0949acdfd0b5a550fae9e0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export 
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();