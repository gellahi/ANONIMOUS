import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>🔐 Auth System</h1>
        
        <div className="navbar-nav">
          {isAuthenticated() ? (
            <>
              <span>Welcome, {user?.username}!</span>
              <span className={`role-badge role-${user?.role}`}>
                {user?.role}
              </span>
              
              {isAdmin() && (
                <button onClick={() => navigate('/admin')}>
                  Admin Panel
                </button>
              )}
              
              <button onClick={() => navigate('/homepage')}>
                Homepage
              </button>
              
              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')}>
                Login
              </button>
              <button onClick={() => navigate('/register')}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
