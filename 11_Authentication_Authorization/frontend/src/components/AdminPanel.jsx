import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';

const AdminPanel = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingRole, setUpdatingRole] = useState(null);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [dashboardResponse, usersResponse] = await Promise.all([
        adminAPI.getDashboard(),
        adminAPI.getUsers()
      ]);
      
      setDashboardData(dashboardResponse.data);
      setUsers(usersResponse.users);
    } catch (error) {
      console.error('Failed to load admin data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      setUpdatingRole(userId);
      setError('');
      
      await adminAPI.updateUserRole(userId, newRole);
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      
      // Reload dashboard data to update statistics
      const dashboardResponse = await adminAPI.getDashboard();
      setDashboardData(dashboardResponse.data);
      
    } catch (error) {
      console.error('Failed to update user role:', error);
      setError(error.message);
    } finally {
      setUpdatingRole(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-panel">
      <h3>👑 Admin Control Panel</h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Manage users and view system statistics. This panel is only accessible to administrators.
      </p>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {/* Statistics Dashboard */}
      {dashboardData && (
        <div style={{ marginBottom: '30px' }}>
          <h4>📊 System Statistics</h4>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>{dashboardData.statistics.totalUsers}</h4>
              <p>Total Users</p>
            </div>
            <div className="stat-card">
              <h4>{dashboardData.statistics.adminUsers}</h4>
              <p>Administrators</p>
            </div>
            <div className="stat-card">
              <h4>{dashboardData.statistics.regularUsers}</h4>
              <p>Regular Users</p>
            </div>
          </div>
        </div>
      )}

      {/* Users Management */}
      <div>
        <h4>👥 User Management</h4>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          View and manage all registered users. You can update user roles here.
        </p>
        
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="users-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>
                      <strong>{user.username}</strong>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                      <span className={`role-badge role-${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                        disabled={updatingRole === user._id}
                        style={{
                          padding: '5px',
                          borderRadius: '3px',
                          border: '1px solid #ddd',
                          fontSize: '12px'
                        }}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      {updatingRole === user._id && (
                        <span style={{ marginLeft: '10px', fontSize: '12px' }}>
                          Updating...
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Users */}
      {dashboardData?.recentUsers && dashboardData.recentUsers.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h4>🆕 Recent Registrations</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '15px',
            marginTop: '15px'
          }}>
            {dashboardData.recentUsers.slice(0, 6).map(user => (
              <div key={user._id} style={{
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  {user.username}
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                  {user.email}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`role-badge role-${user.role}`} style={{ fontSize: '10px' }}>
                    {user.role}
                  </span>
                  <span style={{ fontSize: '12px', color: '#999' }}>
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Actions */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h4>⚡ Quick Actions</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
          <button 
            className="btn btn-secondary"
            onClick={loadAdminData}
            disabled={loading}
            style={{ width: 'auto', padding: '8px 16px' }}
          >
            🔄 Refresh Data
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => window.location.reload()}
            style={{ width: 'auto', padding: '8px 16px' }}
          >
            🔄 Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
