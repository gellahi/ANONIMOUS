/**
 * Registration form functionality using localStorage
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on
    const currentPage = window.location.pathname;
    
    // Handle Step 1 Form
    if (currentPage.includes('index.html') || currentPage.endsWith('registration-form/')) {
        handleStep1Form();
    }
    
    // Handle Step 2 Form
    if (currentPage.includes('step2.html')) {
        handleStep2Form();
    }
    
    // Handle Confirmation Page
    if (currentPage.includes('confirmation.html')) {
        handleConfirmationPage();
    }
});

/**
 * Handle the Step 1 form
 */
function handleStep1Form() {
    const form = document.getElementById('registration-step1-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    
    // Pre-fill form with saved data if available
    const savedData = JSON.parse(localStorage.getItem('registrationData') || '{}');
    if (savedData.fullname) {
        fullnameInput.value = savedData.fullname;
    }
    if (savedData.email) {
        emailInput.value = savedData.email;
    }
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            ValidationUtil.clearErrors('registration-step1-form');
            
            let isValid = true;
            const fullname = fullnameInput.value.trim();
            const email = emailInput.value.trim();
            
            if (fullname.length < 3) {
                ValidationUtil.showError('fullname-error', 'Name must be at least 3 characters');
                isValid = false;
            }
            
            if (!ValidationUtil.isValidEmail(email)) {
                ValidationUtil.showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (isValid) {
                // Save data to localStorage
                const registrationData = {
                    fullname: fullname,
                    email: email,
                    step: 1
                };
                
                localStorage.setItem('registrationData', JSON.stringify(registrationData));
                
                // Redirect to step 2
                window.location.href = 'step2.html';
            }
        });
    }
}

/**
 * Handle the Step 2 form
 */
function handleStep2Form() {
    const form = document.getElementById('registration-step2-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const backBtn = document.getElementById('back-to-step1');
    
    // Check if step 1 was completed
    const savedData = JSON.parse(localStorage.getItem('registrationData') || '{}');
    if (!savedData.fullname || !savedData.email) {
        // Redirect back to step 1 if data is missing
        window.location.href = 'index.html';
        return;
    }
    
    // Handle back button
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            ValidationUtil.clearErrors('registration-step2-form');
            
            let isValid = true;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (!ValidationUtil.isValidPassword(password)) {
                ValidationUtil.showError('password-error', 'Password must be at least 6 characters');
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                ValidationUtil.showError('confirm-password-error', 'Passwords do not match');
                isValid = false;
            }
            
            if (isValid) {
                // Update data in localStorage
                savedData.password = password; // In a real app, this should be hashed
                savedData.step = 2;
                
                localStorage.setItem('registrationData', JSON.stringify(savedData));
                
                // Redirect to confirmation page
                window.location.href = 'confirmation.html';
            }
        });
    }
}

/**
 * Handle the confirmation page
 */
function handleConfirmationPage() {
    const fullnameElement = document.getElementById('summary-fullname');
    const emailElement = document.getElementById('summary-email');
    const startOverBtn = document.getElementById('start-over-btn');
    
    // Check if registration was completed
    const savedData = JSON.parse(localStorage.getItem('registrationData') || '{}');
    if (!savedData.fullname || !savedData.email || !savedData.password) {
        // Redirect back to step 1 if data is missing
        window.location.href = 'index.html';
        return;
    }
    
    // Display registration data
    if (fullnameElement) {
        fullnameElement.textContent = savedData.fullname;
    }
    
    if (emailElement) {
        emailElement.textContent = savedData.email;
    }
    
    // Handle start over button
    if (startOverBtn) {
        startOverBtn.addEventListener('click', function() {
            // Clear registration data
            localStorage.removeItem('registrationData');
            
            // Redirect to step 1
            window.location.href = 'index.html';
        });
    }
}
