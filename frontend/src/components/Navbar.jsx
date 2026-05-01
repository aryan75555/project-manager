import React from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/navbar.css';

const Navbar = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">📋 Project Manager</h1>
        <div className="navbar-right">
          <span className="user-info">{user?.name}</span>
          <span className="user-role">{user?.role}</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
