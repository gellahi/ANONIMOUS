// auth.js - Handles user authentication using localStorage

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }
    
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Signup Form Handling
    const signupForm = document.getElementById('signup-form');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        // Reset error messages
        clearErrors();
        
        // Validate form
        let isValid = true;
        
        if (username.length < 3) {
            showError('signup-username-error', 'Username must be at least 3 characters');
            isValid = false;
        }
        
        if (password.length < 6) {
            showError('signup-password-error', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (password !== confirmPassword) {
            showError('signup-confirm-password-error', 'Passwords do not match');
            isValid = false;
        }
        
        // Check if username already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.username === username)) {
            showError('signup-error', 'Username already exists');
            isValid = false;
        }
        
        if (isValid) {
            // Store user in localStorage
            users.push({
                username: username,
                password: password // In a real app, this should be hashed
            });
            
            localStorage.setItem('users', JSON.stringify(users));
            
            // Show success message and switch to login tab
            showError('signup-error', 'Account created successfully! Please login.', 'success');
            
            // Clear form
            signupForm.reset();
            
            // Switch to login tab after a short delay
            setTimeout(() => {
                document.querySelector('[data-tab="login"]').click();
            }, 1500);
        }
    });
    
    // Login Form Handling
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        
        // Reset error messages
        clearErrors();
        
        // Validate form
        let isValid = true;
        
        if (username === '') {
            showError('login-username-error', 'Please enter your username');
            isValid = false;
        }
        
        if (password === '') {
            showError('login-password-error', 'Please enter your password');
            isValid = false;
        }
        
        if (isValid) {
            // Check credentials against localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Set session data
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('loginTime', new Date().toLocaleString());
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                showError('login-error', 'Invalid username or password');
            }
        }
    });
    
    // Helper functions
    function showError(elementId, message, type = 'error') {
        const element = document.getElementById(elementId);
        element.textContent = message;
        element.style.color = type === 'error' ? '#e74c3c' : '#2ecc71';
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.textContent = '';
        });
    }
});
