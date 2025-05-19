// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const bmiTab = document.getElementById('bmi-tab');
    const billTab = document.getElementById('bill-tab');
    const bmiSection = document.getElementById('bmi-calculator');
    const billSection = document.getElementById('restaurant-bill');

    // BMI Calculator elements
    const bmiForm = document.getElementById('bmi-form');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const bmiClearBtn = document.getElementById('bmi-clear');
    const bmiValue = document.getElementById('bmi-value');
    const bmiStatus = document.getElementById('bmi-status');
    const weightError = document.getElementById('weight-error');
    const heightError = document.getElementById('height-error');

    // Restaurant Bill elements
    const billForm = document.getElementById('bill-form');
    const taxCheckbox = document.getElementById('tax');
    const billClearBtn = document.getElementById('bill-clear');
    const subtotalElement = document.getElementById('subtotal');
    const taxAmountElement = document.getElementById('tax-amount');
    const totalAmountElement = document.getElementById('total-amount');
    const taxRow = document.getElementById('tax-row');
    const quantityInputs = document.querySelectorAll('.quantity-input');

    // Menu items with prices
    const menuItems = [
        { id: 'item1', price: 12.99 },
        { id: 'item2', price: 8.99 },
        { id: 'item3', price: 10.99 },
        { id: 'item4', price: 6.99 },
        { id: 'item5', price: 2.49 }
    ];

    // Tab switching functionality
    bmiTab.addEventListener('click', function() {
        setActiveTab(bmiTab, bmiSection);
    });

    billTab.addEventListener('click', function() {
        setActiveTab(billTab, billSection);
    });

    function setActiveTab(activeTab, activeSection) {
        // Update tab buttons
        bmiTab.classList.remove('active');
        billTab.classList.remove('active');
        activeTab.classList.add('active');
        
        // Update sections
        bmiSection.classList.remove('active');
        billSection.classList.remove('active');
        activeSection.classList.add('active');
    }

    // BMI Calculator functionality
    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        weightError.textContent = '';
        heightError.textContent = '';
        
        // Get input values
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        
        // Validate inputs
        let isValid = true;
        
        if (isNaN(weight) || weight <= 0) {
            weightError.textContent = 'Please enter a valid weight';
            isValid = false;
        }
        
        if (isNaN(height) || height <= 0) {
            heightError.textContent = 'Please enter a valid height';
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        const roundedBmi = bmi.toFixed(2);
        
        // Determine BMI status
        let status;
        if (bmi < 18.5) {
            status = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            status = 'Normal';
        } else if (bmi >= 25 && bmi < 30) {
            status = 'Overweight';
        } else {
            status = 'Obese';
        }
        
        // Display results
        bmiValue.textContent = roundedBmi;
        bmiStatus.textContent = status;
        
        // Apply color based on status
        bmiStatus.className = ''; // Reset classes
        if (status === 'Underweight') {
            bmiStatus.classList.add('underweight');
        } else if (status === 'Normal') {
            bmiStatus.classList.add('normal');
        } else if (status === 'Overweight') {
            bmiStatus.classList.add('overweight');
        } else {
            bmiStatus.classList.add('obese');
        }
    });
    
    // Clear BMI form
    bmiClearBtn.addEventListener('click', function() {
        weightInput.value = '';
        heightInput.value = '';
        bmiValue.textContent = '-';
        bmiStatus.textContent = '-';
        bmiStatus.className = '';
        weightError.textContent = '';
        heightError.textContent = '';
    });

    // Restaurant Bill functionality
    billForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Calculate subtotal
        let subtotal = 0;
        menuItems.forEach(item => {
            const quantity = parseInt(document.getElementById(item.id).value) || 0;
            subtotal += quantity * item.price;
        });
        
        // Calculate tax if applicable
        const taxRate = 0.08; // 8%
        const applyTax = taxCheckbox.checked;
        const taxAmount = applyTax ? subtotal * taxRate : 0;
        const total = subtotal + taxAmount;
        
        // Display results
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxAmountElement.textContent = `$${taxAmount.toFixed(2)}`;
        totalAmountElement.textContent = `$${total.toFixed(2)}`;
        
        // Show/hide tax row
        taxRow.style.display = applyTax ? 'flex' : 'none';
    });
    
    // Clear bill form
    billClearBtn.addEventListener('click', function() {
        quantityInputs.forEach(input => {
            input.value = 0;
        });
        
        taxCheckbox.checked = true;
        subtotalElement.textContent = '$0.00';
        taxAmountElement.textContent = '$0.00';
        totalAmountElement.textContent = '$0.00';
        taxRow.style.display = 'flex';
    });

    // Add input validation for quantity inputs
    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });

    // Initialize with BMI Calculator as active tab
    setActiveTab(bmiTab, bmiSection);
});
