import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Youtueb
        </Link>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-menu-items">
            <li className="navbar-menu-item">
              <Link to="/" className="navbar-menu-link">
                Home
              </Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/about" className="navbar-menu-link">
                About
              </Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/services" className="navbar-menu-link">
                Services
              </Link>
            </li>
          </ul>
          <Link to="/login" className="navbar-menu-button">
            Login
          </Link>
        </div>
        <div className="navbar-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? 'X' : '☰'}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;