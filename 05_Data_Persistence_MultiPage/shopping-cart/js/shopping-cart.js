/**
 * Shopping cart functionality using cookies
 */

// Product data (in a real app, this would come from a server)
const products = [
    { id: 1, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Smartphone', price: 699.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Headphones', price: 149.99, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Tablet', price: 349.99, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Smartwatch', price: 199.99, image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Camera', price: 499.99, image: 'https://via.placeholder.com/150' }
];

document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on
    const currentPage = window.location.pathname;
    
    // Update cart count on both pages
    updateCartCount();
    
    // Handle products page
    if (currentPage.includes('index.html') || currentPage.endsWith('shopping-cart/')) {
        displayProducts();
    }
    
    // Handle cart page
    if (currentPage.includes('cart.html')) {
        displayCartItems();
        setupCartControls();
    }
});

/**
 * Display products on the products page
 */
function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    
    if (productGrid) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${FormatUtil.formatCurrency(product.price)}</p>
                <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            
            productGrid.appendChild(productCard);
        });
        
        // Add event listeners to "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
}

/**
 * Add a product to the cart
 * @param {number} productId - The ID of the product to add
 */
function addToCart(productId) {
    // Get current cart from cookies
    let cart = getCart();
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Increment quantity if product is already in cart
        existingItem.quantity += 1;
    } else {
        // Add new item to cart
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
    }
    
    // Save cart to cookies
    saveCart(cart);
    
    // Update cart count
    updateCartCount();
    
    // Show feedback
    alert(`${products.find(p => p.id === productId).name} added to cart!`);
}

/**
 * Display cart items on the cart page
 */
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cartItemsContainer) {
        // Get cart from cookies
        const cart = getCart();
        
        // Show/hide empty cart message
        if (cart.length === 0) {
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'block';
            }
            if (cartTotalElement) {
                cartTotalElement.textContent = FormatUtil.formatCurrency(0);
            }
            return;
        } else {
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'none';
            }
        }
        
        // Clear existing items
        cartItemsContainer.innerHTML = '';
        
        // Calculate total
        let total = 0;
        
        // Add each item to the cart
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>${FormatUtil.formatCurrency(item.price)} x ${item.quantity}</p>
                </div>
                <div>
                    <p>${FormatUtil.formatCurrency(itemTotal)}</p>
                    <button class="btn btn-secondary remove-item-btn" data-id="${item.id}">Remove</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Add event listeners to "Remove" buttons
        const removeButtons = document.querySelectorAll('.remove-item-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
                displayCartItems(); // Refresh cart display
            });
        });
        
        // Update total
        if (cartTotalElement) {
            cartTotalElement.textContent = FormatUtil.formatCurrency(total);
        }
    }
}

/**
 * Set up cart control buttons
 */
function setupCartControls() {
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const updateExpirationBtn = document.getElementById('update-expiration-btn');
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Checkout functionality would be implemented in a real application.');
        });
    }
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            clearCart();
            displayCartItems();
            updateCartCount();
        });
    }
    
    if (updateExpirationBtn) {
        updateExpirationBtn.addEventListener('click', function() {
            const expirationSelect = document.getElementById('cookie-expiration');
            if (expirationSelect) {
                const days = parseInt(expirationSelect.value);
                updateCartExpiration(days);
                alert(`Cart expiration updated to ${days} day${days === 1 ? '' : 's'}.`);
            }
        });
    }
}

/**
 * Get the cart from cookies
 * @returns {Array} The cart items
 */
function getCart() {
    const cartJson = CookieUtil.getCookie('cart');
    return cartJson ? JSON.parse(cartJson) : [];
}

/**
 * Save the cart to cookies
 * @param {Array} cart - The cart items to save
 */
function saveCart(cart) {
    // Get expiration days from cookie or use default
    const days = parseInt(CookieUtil.getCookie('cartExpiration') || '7');
    CookieUtil.setCookie('cart', JSON.stringify(cart), days);
}

/**
 * Update the cart expiration
 * @param {number} days - The number of days until the cart expires
 */
function updateCartExpiration(days) {
    CookieUtil.setCookie('cartExpiration', days.toString(), days);
    
    // Update the cart cookie with the new expiration
    const cart = getCart();
    CookieUtil.setCookie('cart', JSON.stringify(cart), days);
}

/**
 * Remove an item from the cart
 * @param {number} productId - The ID of the product to remove
 */
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
}

/**
 * Clear the cart
 */
function clearCart() {
    CookieUtil.deleteCookie('cart');
}

/**
 * Update the cart count in the navigation
 */
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const cart = getCart();
    
    // Calculate total quantity
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = `(${totalItems})`;
    });
}
