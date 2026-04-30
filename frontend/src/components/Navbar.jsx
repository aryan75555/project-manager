import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          📊 ProjectHub
        </Link>
        <div className="flex items-center gap-6">
          {user && (
            <>
              <span className="text-sm">{user.name} ({user.role})</span>
              <button
                onClick={onLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
