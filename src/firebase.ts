

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebase.config';

var app = initializeApp(firebaseConfig)
var db = getFirestore(app);
var auth = getAuth(app)
  
export { app, db, auth, firebaseConfig }

