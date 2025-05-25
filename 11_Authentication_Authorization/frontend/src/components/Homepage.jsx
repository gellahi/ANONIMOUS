import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminPanel from './AdminPanel';

const Homepage = () => {
  const { user, isAdmin } = useAuth();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  if (!user) {
    return <div className="loading">Loading user data...</div>;
  }

  return (
    <div className="container">
      {/* Welcome Section */}
      <div className="user-info">
        <h2>🎉 Welcome to Your Dashboard, {user.username}!</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          You are successfully logged in and authenticated. Here's your profile information:
        </p>

        {/* User Information Grid */}
        <div className="info-grid">
          <div className="info-item">
            <strong>👤 Username</strong>
            {user.username}
          </div>
          
          <div className="info-item">
            <strong>📧 Email Address</strong>
            {user.email}
          </div>
          
          <div className="info-item">
            <strong>📱 Phone Number</strong>
            {user.phoneNumber}
          </div>
          
          <div className="info-item">
            <strong>🎂 Date of Birth</strong>
            {formatDate(user.dateOfBirth)} ({calculateAge(user.dateOfBirth)} years old)
          </div>
          
          <div className="info-item">
            <strong>🔑 Account Role</strong>
            <span className={`role-badge role-${user.role}`}>
              {user.role.toUpperCase()}
            </span>
          </div>
          
          <div className="info-item">
            <strong>📅 Member Since</strong>
            {formatDate(user.createdAt)}
          </div>
        </div>
      </div>

      {/* Role-based Content */}
      <div className="user-info">
        <h3>🎯 Role-Based Access</h3>
        <p style={{ marginBottom: '20px' }}>
          The content below demonstrates role-based authorization:
        </p>

        {isAdmin() ? (
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #dc3545, #c82333)', 
            color: 'white', 
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <h4>🛡️ Admin Access Granted</h4>
            <p>
              As an administrator, you have elevated privileges and can access:
            </p>
            <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
              <li>User management dashboard</li>
              <li>System statistics and analytics</li>
              <li>Role modification capabilities</li>
              <li>Administrative controls</li>
            </ul>
          </div>
        ) : (
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #28a745, #1e7e34)', 
            color: 'white', 
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <h4>👤 Standard User Access</h4>
            <p>
              As a standard user, you have access to:
            </p>
            <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
              <li>Your personal dashboard</li>
              <li>Profile information</li>
              <li>Basic application features</li>
              <li>User-level functionality</li>
            </ul>
          </div>
        )}

        {/* Conditional Admin Panel */}
        {isAdmin() && (
          <div style={{ 
            padding: '15px', 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            <strong>💡 Admin Tip:</strong> You can access the full Admin Panel from the navigation menu above, 
            or scroll down to see a preview of admin features below.
          </div>
        )}
      </div>

      {/* Admin Panel Preview (only for admins) */}
      {isAdmin() && <AdminPanel />}

      {/* Authentication Status */}
      <div className="user-info">
        <h3>🔐 Authentication Status</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          <div style={{ 
            padding: '15px', 
            background: '#d4edda', 
            border: '1px solid #c3e6cb', 
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <strong>✅ Authenticated</strong>
            <br />
            <small>You are logged in</small>
          </div>
          
          <div style={{ 
            padding: '15px', 
            background: user.role === 'admin' ? '#f8d7da' : '#d4edda', 
            border: `1px solid ${user.role === 'admin' ? '#f5c6cb' : '#c3e6cb'}`, 
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <strong>{user.role === 'admin' ? '👑' : '👤'} {user.role.toUpperCase()}</strong>
            <br />
            <small>Role-based access active</small>
          </div>
          
          <div style={{ 
            padding: '15px', 
            background: '#d1ecf1', 
            border: '1px solid #bee5eb', 
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <strong>🔒 JWT Protected</strong>
            <br />
            <small>Token-based security</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
