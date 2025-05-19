/**
 * Utility functions for the Data Persistence Multi-Page App
 */

// Cookie utility functions
const CookieUtil = {
    /**
     * Set a cookie with the given name, value, and optional attributes
     * @param {string} name - The name of the cookie
     * @param {string} value - The value of the cookie
     * @param {number} days - The number of days until the cookie expires
     * @param {string} path - The path for which the cookie is valid
     */
    setCookie: function(name, value, days = 7, path = '/') {
        let expires = '';
        
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=' + path;
    },
    
    /**
     * Get the value of a cookie with the given name
     * @param {string} name - The name of the cookie
     * @returns {string|null} The value of the cookie, or null if the cookie doesn't exist
     */
    getCookie: function(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        
        return null;
    },
    
    /**
     * Delete a cookie with the given name
     * @param {string} name - The name of the cookie to delete
     * @param {string} path - The path for which the cookie is valid
     */
    deleteCookie: function(name, path = '/') {
        this.setCookie(name, '', -1, path);
    }
};

// Form validation utility functions
const ValidationUtil = {
    /**
     * Validate an email address
     * @param {string} email - The email address to validate
     * @returns {boolean} Whether the email address is valid
     */
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    /**
     * Validate a password
     * @param {string} password - The password to validate
     * @param {number} minLength - The minimum length of the password
     * @returns {boolean} Whether the password is valid
     */
    isValidPassword: function(password, minLength = 6) {
        return password.length >= minLength;
    },
    
    /**
     * Show an error message for a form field
     * @param {string} elementId - The ID of the element to show the error for
     * @param {string} message - The error message to show
     */
    showError: function(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
        }
    },
    
    /**
     * Clear all error messages in a form
     * @param {string} formId - The ID of the form to clear errors for
     */
    clearErrors: function(formId) {
        const form = document.getElementById(formId);
        if (form) {
            const errorElements = form.querySelectorAll('.error-message');
            errorElements.forEach(el => {
                el.textContent = '';
                el.style.display = 'none';
            });
        }
    }
};

// Format utility functions
const FormatUtil = {
    /**
     * Format a price as currency
     * @param {number} price - The price to format
     * @returns {string} The formatted price
     */
    formatCurrency: function(price) {
        return '$' + price.toFixed(2);
    }
};
