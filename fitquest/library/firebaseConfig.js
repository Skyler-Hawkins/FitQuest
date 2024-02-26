// get code later
//next router hook


import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getApps, getApp} from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiFEhS8zpWJngSJYj5okfXgO_z0q-3ScY",
  authDomain: "fitquest-1ee5b.firebaseapp.com",
  projectId: "fitquest-1ee5b",
  storageBucket: "fitquest-1ee5b.appspot.com",
  messagingSenderId: "614350620081",
  appId: "1:614350620081:web:95d0805dd18e56c085e990"
};


// Initialize Firebase
let firebase_app;

if (!getApps().length) {
  firebase_app = initializeApp(firebaseConfig);
  console.log("Firebase initialized")
} else {
  firebase_app = getApp();
  console.log("Firebase already initialized")
}

export const auth = getAuth(firebase_app);
export const database = getFirestore(firebase_app);


console.log("firestore object type:",  database);


// export const googleProvider = new GoogleAuthProvider(app).addScope('email');
if (auth && auth.currentUser) {
  console.log('auth is not null and a user is signed in');
  console.log(auth.currentUser);
} else if (auth) {
  console.log('auth is not null but no user is signed in');
} else {
  console.log('auth is null');
}
console.log("firebase set up without and errors (presumed successful)")
export default firebase_app;