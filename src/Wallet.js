import React, { useState } from 'react';
import { doc, collection, updateDoc, increment } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";

import './ManageWallet.css';
const ManageWallet = () => {
  const [monthlyFunds, setMonthlyFunds] = useState(100); // default value
  const [allowNotification, setAllowNotification] = useState(false);
  const [alertWhenLow, setAlertWhenLow] = useState(false);

  const handleMonthlyFundsChange = (e) => {
    let value = e.target.value;
    // Remove any dollar signs at the beginning of the value
    value = value.replace(/^\$/, '');
    // Validate if the value is a valid number with up to 2 decimal places
    if (/^\d+(\.\d{0,2})?$/.test(value) || value === '') {
      setMonthlyFunds(value);
    }
  };

  const handleUpdate = async (e) => {
    // Logic to update the wallet settings
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userDocRef = doc(db, 'users', currentUser.uid);

    await updateDoc(userDocRef, {
      balance: increment(monthlyFunds)
    });

    console.log('Updated settings:', {
      monthlyFunds,
      allowNotification,
      alertWhenLow,
    });

    // You would typically send this data to your backend with an API call
  };

  return (
    <div className="manage-wallet-container">
      <h1>Manage Wallet</h1>
      <div className="funds-input-container">
        <label htmlFor="monthlyFunds">Monthly Funds</label>
        <input
          type="text"
          id="monthlyFunds"
          value={`$${monthlyFunds}`}
          onChange={handleMonthlyFundsChange}
        />
      </div>
      <div className="notification-checkbox">
        <input
          type="checkbox"
          id="allowNotification"
          checked={allowNotification}
          onChange={(e) => setAllowNotification(e.target.checked)}
        />
        <label htmlFor="allowNotification">Allow Notification</label>
      </div>
      <div className="alert-checkbox">
        <input
          type="checkbox"
          id="alertWhenLow"
          checked={alertWhenLow}
          onChange={(e) => setAlertWhenLow(e.target.checked)}
        />
        <label htmlFor="alertWhenLow">Alert When Fund Below 10%</label>
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default ManageWallet;
