// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrentUser from './CurrentUser'; // Import the CurrentUser component
import Balance from './Balance';
import Logo from './Logo.png';

const MainHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo"><Link to="/Home"><img src={Logo} alt='Logo'/></Link></div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/Home">Add Trip</Link></li>
            <li><Link to="/TripHistory">Trip History</Link></li>
            <li><Link to="/ManageProfile">Edit Profile</Link></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <div className="fund-info">
          <Balance />
          </div>
        <div className="user-menu">
          {/* Display the user's email if logged in, or "Login / Sign Up" link otherwise */}
          <div className="user-greeting">
            <CurrentUser />
          </div>
          <ul className="user-options">
            <li onClick={() => {navigate("/ManageWalletBalance")}}>Manage Wallet Balance</li>
            <li onClick={() => {navigate("/Logout")}}>Log Out</li>        
          </ul>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;