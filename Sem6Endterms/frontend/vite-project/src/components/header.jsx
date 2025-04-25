import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './youtube-logo.png'; 

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="YouTube Logo" className="logo" />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/subscriptions">Subscriptions</Link>
      </div>
      <div className="header-right">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-button">Search</button>
        <Link to="/login">Login</Link>
      </div>
    </header>
  );
}

export default Header;