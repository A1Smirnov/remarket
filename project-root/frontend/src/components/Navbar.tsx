// frontend/src/components/Navbar.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const isAuthenticated = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">Marketplace</Link>
      </div>
      <div className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--open' : ''}`}>
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/cart">Cart</Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="navbar__logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
      <div className="navbar__burger" onClick={toggleMobileMenu}>
        <span className="navbar__burger-line"></span>
        <span className="navbar__burger-line"></span>
        <span className="navbar__burger-line"></span>
      </div>
    </nav>
  );
};

export default Navbar;

