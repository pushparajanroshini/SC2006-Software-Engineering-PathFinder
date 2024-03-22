// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo"><Link to="/">Logo</Link></div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <div className="fund-info">FUND IS LOW $9.0</div>
        <div className="user-menu">
          <div className="user-greeting"><Link to="/Login">Login / Sign Up</Link></div>
          <ul className="user-options">
            <li><Link to="/Details">Details</Link></li>
            <li><Link to="/TripHistory">Trip History</Link></li>
            <li><Link to="/ManageWalletBalance">Manage Wallet Balance</Link></li>
            <li><Link to="/Logout">Log Out</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
