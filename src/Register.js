import React, { useState } from 'react';
import "./Register.css";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Import 'firestore' from your firebase.js file
import { db } from "./firebase";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the user with email and password
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Access the newly created user's UID
      //const userId = userCredential.user.uid;

      // Access the Firestore collection 'users'
      //const usersCollection = firestore.collection('users');

      const docRef = await addDoc(collection(db, "users"), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
    

      // Add the user's data to Firestore
     // await usersCollection.doc(userId).set({
      // firstName: formData.firstName,
       // lastName: formData.lastName,
        //email: formData.email
        // Add more fields if needed
      });

      console.log('User registered successfully');
      window.location.href = "/";
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Register for Pathfinder</h1>
      <form onSubmit={handleSubmit} className="register-form" id="MainForm">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange} 
          placeholder='John'
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          placeholder='Doe'
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
