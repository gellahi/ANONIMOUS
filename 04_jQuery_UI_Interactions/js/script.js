$(document).ready(function() {
    // Initialize the application
    initApp();

    // Feature 1: Toggle Paragraph Visibility
    $('#toggle-btn').on('click', function() {
        $('#toggle-content').slideToggle(400);
    });

    // Feature 2: Real-Time Form Validation
    initFormValidation();

    // Feature 3: Theme Switcher
    initThemeSwitcher();

    // Feature 4: Character Counter
    $('#text-area').on('input', function() {
        updateCharCounter();
    });

    // Feature 5: Random Quote Generator
    $('#quote-btn').on('click', function() {
        generateRandomQuote();
    });
});

// Initialize the application
function initApp() {
    // Apply saved theme if exists
    applySavedTheme();
    
    // Initialize character counter
    updateCharCounter();
    
    // Show initial random quote
    generateRandomQuote();
}

// Feature 2: Form Validation Functions
function initFormValidation() {
    // Name validation
    $('#name').on('input', function() {
        const name = $(this).val().trim();
        if (name.length < 2) {
            showValidationMessage('#name-validation', 'Name must be at least 2 characters', 'error');
        } else {
            showValidationMessage('#name-validation', 'Valid name', 'success');
        }
    });

    // Email validation
    $('#email').on('input', function() {
        const email = $(this).val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showValidationMessage('#email-validation', 'Please enter a valid email address', 'error');
        } else {
            showValidationMessage('#email-validation', 'Valid email', 'success');
        }
    });

    // Password validation
    $('#password').on('input', function() {
        const password = $(this).val();
        
        if (password.length < 8) {
            showValidationMessage('#password-validation', 'Password must be at least 8 characters', 'error');
        } else {
            showValidationMessage('#password-validation', 'Valid password', 'success');
        }
        
        // Check password match if confirm password has a value
        if ($('#confirm-password').val()) {
            validatePasswordMatch();
        }
    });

    // Confirm password validation
    $('#confirm-password').on('input', function() {
        validatePasswordMatch();
    });

    // Form submission
    $('#registration-form').on('submit', function(e) {
        e.preventDefault();
        
        // Check if all fields are valid
        const isNameValid = $('#name-validation').hasClass('success');
        const isEmailValid = $('#email-validation').hasClass('success');
        const isPasswordValid = $('#password-validation').hasClass('success');
        const isConfirmPasswordValid = $('#confirm-password-validation').hasClass('success');
        
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            alert('Registration successful!');
            $(this)[0].reset();
            $('.validation-message').text('').removeClass('success error');
        } else {
            alert('Please fix the errors in the form before submitting.');
        }
    });
}

// Helper function for password match validation
function validatePasswordMatch() {
    const password = $('#password').val();
    const confirmPassword = $('#confirm-password').val();
    
    if (password !== confirmPassword) {
        showValidationMessage('#confirm-password-validation', 'Passwords do not match', 'error');
    } else if (confirmPassword.length > 0) {
        showValidationMessage('#confirm-password-validation', 'Passwords match', 'success');
    }
}

// Helper function to show validation messages
function showValidationMessage(selector, message, type) {
    $(selector).text(message).removeClass('success error').addClass(type);
}

// Feature 3: Theme Switcher Functions
function initThemeSwitcher() {
    $('#light-theme').on('click', function() {
        $('body').removeClass('dark-theme');
        localStorage.setItem('theme', 'light');
    });
    
    $('#dark-theme').on('click', function() {
        $('body').addClass('dark-theme');
        localStorage.setItem('theme', 'dark');
    });
}

// Apply saved theme from localStorage
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        $('body').addClass('dark-theme');
    } else {
        $('body').removeClass('dark-theme');
    }
}

// Feature 4: Character Counter Function
function updateCharCounter() {
    const maxLength = $('#text-area').attr('maxlength');
    const currentLength = $('#text-area').val().length;
    $('#char-counter').text(`Characters: ${currentLength}/${maxLength}`);
    
    // Add visual feedback as user approaches the limit
    if (currentLength > maxLength * 0.8) {
        $('#char-counter').addClass('error');
    } else {
        $('#char-counter').removeClass('error');
    }
}

// Feature 5: Random Quote Generator
function generateRandomQuote() {
    const quotes = [
        { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
        { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
        { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" }
    ];
    
    // Hide the quote display first
    $('#quote-display').fadeOut(400, function() {
        // Get a random quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        
        // Update the quote text and author
        $('#quote-text').text(randomQuote.text);
        $('#quote-author').text(randomQuote.author);
        
        // Show the quote display with fade effect
        $(this).fadeIn(400);
    });
}
