import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });
    
    return () => unsubscribe(); // Cleanup function to unsubscribe from the auth state listener
  }, []); // Run only once on component mount

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p><Link to="/Login">Log in</Link></p>      )}
    </div>
  );
};

export default CurrentUser;
