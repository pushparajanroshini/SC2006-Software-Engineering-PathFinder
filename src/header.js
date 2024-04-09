// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import CurrentUser from './CurrentUser'; // Import the CurrentUser component

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo"><Link to="/Home">Logo</Link></div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/Home">Add Trip</Link></li>
            <li><Link to="/TripHistory">Trip History</Link></li>
            <li><Link to="/ManageProfile">Edit Profile</Link></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <div className="fund-info">FUND IS LOW $9.0</div>
        <div className="user-menu">
          {/* Display the user's email if logged in, or "Login / Sign Up" link otherwise */}
          <div className="user-greeting">
            <CurrentUser />
          </div>
          <ul className="user-options">
            <li><Link to="/ManageWalletBalance">Manage Wallet Balance</Link></li>
            <li><Link to="/Logout">Log Out</Link></li>
            <li><Link to="/Current">Check currentuser</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
