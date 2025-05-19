// session.js - Handles session management using sessionStorage

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = 'index.html';
        return;
    }
    
    // Display username from sessionStorage
    const username = sessionStorage.getItem('username');
    const usernameElement = document.getElementById('username');
    if (usernameElement && username) {
        usernameElement.textContent = username;
    }
    
    // Display login time
    const loginTime = sessionStorage.getItem('loginTime');
    const loginTimeElement = document.getElementById('login-time');
    if (loginTimeElement && loginTime) {
        loginTimeElement.textContent = loginTime;
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear session data
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('loginTime');
            
            // Redirect to login page
            window.location.href = 'index.html';
        });
    }
});
