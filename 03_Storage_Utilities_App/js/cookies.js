// cookies.js - Handles cookie notice functionality

document.addEventListener('DOMContentLoaded', function() {
    const cookieNotice = document.getElementById('cookie-notice');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    // Check if cookie notice has been accepted
    if (getCookie('cookiesAccepted') !== 'true') {
        // Show cookie notice if not accepted
        if (cookieNotice) {
            cookieNotice.style.display = 'flex';
        }
    } else {
        // Hide cookie notice if already accepted
        if (cookieNotice) {
            cookieNotice.style.display = 'none';
        }
    }
    
    // Handle accept cookies button click
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            // Set cookie with 1 year expiration
            setCookie('cookiesAccepted', 'true', 365);
            
            // Hide cookie notice
            if (cookieNotice) {
                cookieNotice.style.display = 'none';
            }
        });
    }
    
    // Helper function to set a cookie
    function setCookie(name, value, days) {
        let expires = '';
        
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        
        document.cookie = name + '=' + value + expires + '; path=/';
    }
    
    // Helper function to get a cookie value
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        
        return null;
    }
});
