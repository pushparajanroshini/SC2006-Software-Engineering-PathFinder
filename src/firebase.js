import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClyxr0ZrEHZogT08RxNgWbUThs372bruI",
  authDomain: "pathfinder-database-b6758.firebaseapp.com",
  projectId: "pathfinder-database-b6758",
  storageBucket: "pathfinder-database-b6758.appspot.com",
  messagingSenderId: "125965436743",
  appId: "1:125965436743:web:3e0eac65fc3d1078476e62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const auth = getAuth(app);

export { app, db };