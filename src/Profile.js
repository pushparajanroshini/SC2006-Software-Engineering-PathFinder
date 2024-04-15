import React, { useState, useEffect } from 'react';
import { getAuth, 
        updateProfile as updateUserProfile,  
                          updateEmail, 
                          updatePassword, 
                          EmailAuthProvider, 
                          reauthenticateWithCredential 
        } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { sendEmailVerification, verifyBeforeUpdateEmail } from "firebase/auth";
import "./Profile.css";



const EditProfile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Fetch user's information when component mounts
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser({
        firstName: currentUser.displayName ? currentUser.displayName.split(' ')[0] : '',
        lastName: currentUser.displayName ? currentUser.displayName.split(' ')[1] : '',
        email: currentUser.email
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

      // check for password format
      if (!passwordRegex.test(user.password)) {
        setError('Password must be at least 6 characters long and include at least one special character.');
        return;
      }
      // check if password and confirm password matched
      if (user.password !== user.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
  
      // Prepare user data to update in Firestore
      const userData = {};
      if (user.firstName.trim() !== '') {
        userData.firstName = user.firstName.trim();
      }
      if (user.lastName.trim() !== '') {
        userData.lastName = user.lastName.trim();
      }
      if (Object.keys(userData).length > 0) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await setDoc(userDocRef, userData, { merge: true });
      }
      // Update user email if a new email is provided
      if (user.email.trim() !== '' && user.email !== currentUser.email) {
        verifyBeforeUpdateEmail(auth.currentUser, user.email).then(() => {

          // Email updated!
          // ...
          console.log("Email updated! ", user);
        }).catch((error) => {
          // An error occurred
          // ...
          console.error("Email update failed:", error.message);
        });
      }
  
      // Update user password if a new password is provided
  
      if (user.password.trim() !== '' && user.password !== null) {
        updatePassword(currentUser, user.password).then(() => {
          // Update successful.
          console.log("Password update successful!", user);
        }).catch((error) => {
          // An error ocurred
          // ...
          console.error("Password update failed!", error.message);
        });
      }


  
      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      {error && <p className="error-message">{error}</p>} 
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder='John'
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder='Doe'
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder='test@gmail.com'
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
