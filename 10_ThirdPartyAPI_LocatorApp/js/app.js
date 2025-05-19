/**
 * Main application script for the Location Finder App
 * Initializes the app and handles user interactions
 */

// Store user's location
let userLocation = null;

// DOM elements
const searchForm = document.getElementById('search-form');
const placeTypeInput = document.getElementById('place-type');
const radiusInput = document.getElementById('radius');
const errorModal = document.getElementById('error-modal');
const errorMessage = document.getElementById('error-message');
const closeErrorButton = document.getElementById('close-error');

/**
 * Initialize the application
 */
function initApp() {
    // Initialize map
    try {
        initMap();
    } catch (error) {
        showError(`Failed to initialize map: ${error.message}`);
    }
    
    // Set up event listeners
    setupEventListeners();
}

/**
 * Set up event listeners for user interactions
 */
function setupEventListeners() {
    // Search form submission
    searchForm.addEventListener('submit', handleSearch);
    
    // Close error modal
    closeErrorButton.addEventListener('click', () => {
        errorModal.classList.add('hidden');
    });
    
    // Close error modal when clicking outside
    errorModal.addEventListener('click', (event) => {
        if (event.target === errorModal) {
            errorModal.classList.add('hidden');
        }
    });
    
    // Close error modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !errorModal.classList.contains('hidden')) {
            errorModal.classList.add('hidden');
        }
    });
}

/**
 * Handle search form submission
 * @param {Event} event - Form submit event
 */
async function handleSearch(event) {
    // Prevent form submission
    event.preventDefault();
    
    // Get form values
    const placeType = placeTypeInput.value.trim();
    const radius = parseInt(radiusInput.value, 10);
    
    // Validate input
    if (!placeType) {
        showError('Please enter a place type to search for.');
        return;
    }
    
    // Get current user location from map
    if (userMarker) {
        userLocation = userMarker.getLngLat();
    } else {
        showError('Your location is not available. Please allow location access and try again.');
        return;
    }
    
    try {
        // Search for nearby places
        const places = await searchNearbyPlaces(placeType, userLocation, radius);
        
        // Add markers to map
        addPlaceMarkers(places);
        
        // Display places in list
        displayPlacesList(places);
    } catch (error) {
        showError(`Search failed: ${error.message}`);
    }
}

/**
 * Show error message in modal
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorModal.classList.remove('hidden');
    console.error(message);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
