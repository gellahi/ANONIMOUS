// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add character counter for textarea in new and edit post forms
  const contentTextarea = document.getElementById('content');
  
  if (contentTextarea) {
    // Create character counter element
    const counterDiv = document.createElement('div');
    counterDiv.className = 'text-muted mt-2';
    counterDiv.id = 'char-counter';
    
    // Insert counter after textarea
    contentTextarea.parentNode.insertBefore(counterDiv, contentTextarea.nextSibling);
    
    // Update counter function
    const updateCounter = () => {
      const count = contentTextarea.value.length;
      counterDiv.textContent = `Character count: ${count}`;
    };
    
    // Add event listeners
    contentTextarea.addEventListener('input', updateCounter);
    contentTextarea.addEventListener('keyup', updateCounter);
    
    // Initialize counter
    updateCounter();
  }
  
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
