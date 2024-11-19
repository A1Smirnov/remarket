import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
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
        <Link to="/profile">Profile</Link>
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
