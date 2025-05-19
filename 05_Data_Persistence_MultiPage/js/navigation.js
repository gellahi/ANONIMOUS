/**
 * Navigation functionality for the Data Persistence Multi-Page App
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current navigation link
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.app-nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage.includes(linkPath)) {
            link.classList.add('active');
        }
    });
    
    // Add back button functionality
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    });
});
