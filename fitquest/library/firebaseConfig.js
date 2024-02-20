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
let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const database = getFirestore(app);
// export const googleProvider = new GoogleAuthProvider(app).addScope('email');

export default app;