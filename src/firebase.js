import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAuth } from "firebase/auth";
/*
old account api
const firebaseConfig = {
  apiKey: "AIzaSyClyxr0ZrEHZogT08RxNgWbUThs372bruI",
  authDomain: "pathfinder-database-b6758.firebaseapp.com",
  projectId: "pathfinder-database-b6758",
  storageBucket: "pathfinder-database-b6758.appspot.com",
  messagingSenderId: "125965436743",
  appId: "1:125965436743:web:3e0eac65fc3d1078476e62"
};
*/
 
const firebaseConfig = {
  apiKey: "AIzaSyAa1VOJnjUT0-VjRUgggWw5UUFw5En3nPg",
  authDomain: "pathfinder-1b4fe.firebaseapp.com",
  projectId: "pathfinder-1b4fe",
  storageBucket: "pathfinder-1b4fe.appspot.com",
  messagingSenderId: "404163187122",
  appId: "1:404163187122:web:f04d82c01c8499af7c94ab"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const auth = getAuth(app);




export { app, db};
