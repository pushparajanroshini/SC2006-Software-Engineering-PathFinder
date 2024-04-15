import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from "./firebase";
import  './Balance.css';

const Balance = () => {
    const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    //const userDocRef = doc(db, 'users', currentUser.uid);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
        const currentUser = auth.currentUser;
        const userDocRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const balanceData = docSnap.data()['balance'];
            setBalance(balanceData);
            console.log('raw balance is:', balance);

          } else {
            console.log("No such document!");
          } 
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // User is signed out, handle accordingly
        
        setIsLoading(false);
      }
    });

    return () => unsubscribe(); // Unsubscribe from the auth state change listener when the component unmounts
  }, []); // Run only once on component mount

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading indicator while checking authentication status
  }

  let low = false;

  return (
    <div>
      {low ? (
        <div>
          <p>Welcome, true</p>
        </div>
      ) : (
        <div className = "balance-button">

            <a onClick={() => {navigate("/ManageWalletBalance")}}>${balance}</a>
    
        </div>
      )}
    </div>
  );
};

export default Balance;



/*
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from "./firebase";

const Balance = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
        // If currentUser is null, return early
        setIsLoading(false);
        return;
      }

    const userDocRef = doc(db, 'users', currentUser.uid);
    const fetchUserData = async () => {
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const balanceData = docSnap.data()['balance'];
            setBalance(balanceData);
            console.log('raw balance is:', balance);

          } else {
            console.log("No such document!");
          } 
          
          setIsLoading(false);
        }catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoading(false); // Set loading to false even in case of an error
          }
        };
    fetchUserData();
  }, []); // Run only once on component mount

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading indicator while checking authentication status
  }

  let low = false;

  return (
    <div>
      {low ? (
        <div>
          <p>Welcome, true</p>
        </div>
      ) : (
        <div>
        <a href="/ManageWalletBalance">
            <p>$ {balance}</p>
        </a>      

        </div>
        )}
        
    </div>
  );
};

export default Balance;
*/