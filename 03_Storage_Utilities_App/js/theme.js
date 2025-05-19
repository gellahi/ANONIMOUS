// theme.js - Handles background color customization using localStorage

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const colorPicker = document.getElementById('bg-color-picker');
    const applyColorBtn = document.getElementById('apply-color');
    
    // Apply saved color if exists
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        if (colorPicker) {
            colorPicker.value = savedColor;
        }
    }
    
    // Apply color when button is clicked
    if (applyColorBtn && colorPicker) {
        applyColorBtn.addEventListener('click', function() {
            const selectedColor = colorPicker.value;
            
            // Apply color to body
            document.body.style.backgroundColor = selectedColor;
            
            // Save color preference to localStorage
            localStorage.setItem('backgroundColor', selectedColor);
            
            // Show feedback
            showColorFeedback(selectedColor);
        });
    }
    
    // Helper function to show feedback
    function showColorFeedback(color) {
        // Create or get feedback element
        let feedbackEl = document.querySelector('.color-feedback');
        
        if (!feedbackEl) {
            feedbackEl = document.createElement('p');
            feedbackEl.className = 'color-feedback note';
            document.querySelector('.color-picker').appendChild(feedbackEl);
        }
        
        // Show feedback message
        feedbackEl.textContent = `Color ${color} applied and saved!`;
        
        // Hide feedback after 3 seconds
        setTimeout(() => {
            feedbackEl.textContent = '';
        }, 3000);
    }
});
