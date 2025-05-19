/**
 * Map functionality for the Location Finder App
 * Handles map initialization, user location, and markers
 */

// Mapbox access token - Replace with your own token from https://account.mapbox.com/
const MAPBOX_ACCESS_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';

// Map instance
let map;
// User location marker
let userMarker;
// Collection of place markers
let placeMarkers = [];

/**
 * Initialize the map
 */
function initMap() {
    // Show loading indicator
    document.getElementById('loading-map').classList.remove('hidden');
    
    // Set Mapbox access token
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    
    // Create map instance
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        zoom: 13
    });
    
    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // When map has loaded
    map.on('load', () => {
        // Hide loading indicator
        document.getElementById('loading-map').classList.add('hidden');
        
        // Get user's location
        getUserLocation();
    });
    
    // Handle map errors
    map.on('error', (e) => {
        showError('Map error: ' + e.error.message);
        document.getElementById('loading-map').classList.add('hidden');
    });
}

/**
 * Get the user's current location using the Geolocation API
 */
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success callback
            (position) => {
                const userLocation = {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                };
                
                // Center map on user location
                map.flyTo({
                    center: userLocation,
                    zoom: 14,
                    essential: true
                });
                
                // Add marker at user location
                addUserMarker(userLocation);
            },
            // Error callback
            (error) => {
                let errorMessage;
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location access was denied. Please enable location services.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "The request to get user location timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred while getting location.";
                }
                showError(errorMessage);
                
                // Default to a fallback location (New York City)
                const fallbackLocation = { lng: -74.006, lat: 40.7128 };
                map.flyTo({
                    center: fallbackLocation,
                    zoom: 12
                });
            },
            // Options
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        showError("Geolocation is not supported by this browser.");
        
        // Default to a fallback location
        const fallbackLocation = { lng: -74.006, lat: 40.7128 };
        map.flyTo({
            center: fallbackLocation,
            zoom: 12
        });
    }
}

/**
 * Add a marker at the user's location
 * @param {Object} location - The user's location {lat, lng}
 */
function addUserMarker(location) {
    // Remove existing user marker if any
    if (userMarker) {
        userMarker.remove();
    }
    
    // Create a DOM element for the marker
    const el = document.createElement('div');
    el.className = 'user-marker';
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = '#3b82f6';
    el.style.border = '3px solid #ffffff';
    el.style.boxShadow = '0 0 0 2px rgb(59 130 246 / 0.5)';
    
    // Add marker to map
    userMarker = new mapboxgl.Marker(el)
        .setLngLat(location)
        .addTo(map);
    
    // Add popup to user marker
    new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    })
    .setLngLat(location)
    .setHTML('<strong>You are here</strong>')
    .addTo(map);
}

/**
 * Add place markers to the map
 * @param {Array} places - Array of place objects
 */
function addPlaceMarkers(places) {
    // Clear existing place markers
    clearPlaceMarkers();
    
    // Add new markers for each place
    places.forEach((place, index) => {
        // Create marker element
        const el = document.createElement('div');
        el.className = 'place-marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.backgroundImage = 'url("https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png")';
        el.style.backgroundSize = 'cover';
        el.style.cursor = 'pointer';
        
        // Create marker
        const marker = new mapboxgl.Marker(el)
            .setLngLat(place.location)
            .addTo(map);
        
        // Create popup with place info
        const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(createPopupContent(place));
        
        // Show popup on marker click
        marker.setPopup(popup);
        
        // Store marker reference
        placeMarkers.push(marker);
    });
    
    // Fit map to include all markers if there are any
    if (places.length > 0) {
        fitMapToMarkers();
    }
}

/**
 * Clear all place markers from the map
 */
function clearPlaceMarkers() {
    placeMarkers.forEach(marker => marker.remove());
    placeMarkers = [];
}

/**
 * Create HTML content for marker popup
 * @param {Object} place - Place object with details
 * @returns {string} HTML content for popup
 */
function createPopupContent(place) {
    return `
        <div class="popup-content">
            <h3 class="font-bold text-lg">${place.name}</h3>
            <div class="star-rating my-1">
                ${getStarRating(place.rating)}
                <span class="text-gray-600 text-sm">${place.rating ? place.rating.toFixed(1) : 'N/A'}</span>
            </div>
            <p class="text-gray-700 text-sm">${place.address || 'No address available'}</p>
            ${place.openNow !== undefined ? 
                `<p class="text-sm mt-1 ${place.openNow ? 'text-green-600' : 'text-red-600'}">
                    ${place.openNow ? 'Open now' : 'Closed'}
                </p>` : ''
            }
        </div>
    `;
}

/**
 * Generate HTML for star rating display
 * @param {number} rating - Rating value (0-5)
 * @returns {string} HTML for star display
 */
function getStarRating(rating) {
    if (!rating) return '';
    
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    
    // Half star
    if (halfStar) {
        starsHTML += '★';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
    }
    
    return starsHTML;
}

/**
 * Adjust map view to fit all markers
 */
function fitMapToMarkers() {
    if (placeMarkers.length === 0) return;
    
    // Create bounds object
    const bounds = new mapboxgl.LngLatBounds();
    
    // Include user marker in bounds
    if (userMarker) {
        bounds.extend(userMarker.getLngLat());
    }
    
    // Include all place markers in bounds
    placeMarkers.forEach(marker => {
        bounds.extend(marker.getLngLat());
    });
    
    // Fit map to bounds with padding
    map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
    });
}

/**
 * Focus on a specific place marker
 * @param {number} index - Index of the marker in the placeMarkers array
 */
function focusMarker(index) {
    if (index >= 0 && index < placeMarkers.length) {
        const marker = placeMarkers[index];
        
        // Fly to marker
        map.flyTo({
            center: marker.getLngLat(),
            zoom: 16,
            essential: true
        });
        
        // Open popup
        marker.togglePopup();
    }
}
