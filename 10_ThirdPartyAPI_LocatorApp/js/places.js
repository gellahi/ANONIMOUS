/**
 * Places API functionality for the Location Finder App
 * Handles searching for nearby places and processing results
 */

// For demonstration purposes, we'll use Mapbox's Geocoding API
// In a real app, you would use Google Places API or similar
const MAPBOX_GEOCODING_API = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

/**
 * Search for nearby places based on type and user location
 * @param {string} placeType - Type of place to search for
 * @param {Object} userLocation - User's location {lat, lng}
 * @param {number} radius - Search radius in meters
 * @returns {Promise} Promise resolving to array of place objects
 */
async function searchNearbyPlaces(placeType, userLocation, radius) {
    try {
        // Show loading indicator
        document.getElementById('loading-results').classList.remove('hidden');
        document.getElementById('no-results').classList.add('hidden');
        
        // In a real app, you would use Google Places API with the 'nearbysearch' endpoint
        // For this demo, we'll use Mapbox's Geocoding API which is more limited but doesn't require a credit card
        
        // Format the query
        const query = encodeURIComponent(placeType);
        const proximity = `${userLocation.lng},${userLocation.lat}`;
        const limit = 10; // Number of results to return
        
        // Build the URL
        const url = `${MAPBOX_GEOCODING_API}${query}.json?proximity=${proximity}&limit=${limit}&access_token=${MAPBOX_ACCESS_TOKEN}`;
        
        // Fetch data
        const response = await fetch(url);
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        // Parse response
        const data = await response.json();
        
        // Process results
        const places = processMapboxResults(data.features, userLocation, radius);
        
        // Hide loading indicator
        document.getElementById('loading-results').classList.add('hidden');
        
        // Show no results message if needed
        if (places.length === 0) {
            document.getElementById('no-results').classList.remove('hidden');
        }
        
        return places;
    } catch (error) {
        // Hide loading indicator
        document.getElementById('loading-results').classList.add('hidden');
        
        // Show error
        showError(`Failed to search for places: ${error.message}`);
        return [];
    }
}

/**
 * Process Mapbox Geocoding API results into standardized place objects
 * @param {Array} features - Features array from Mapbox response
 * @param {Object} userLocation - User's location {lat, lng}
 * @param {number} radius - Search radius in meters
 * @returns {Array} Array of standardized place objects
 */
function processMapboxResults(features, userLocation, radius) {
    if (!features || features.length === 0) {
        return [];
    }
    
    // Filter places within radius
    const places = features
        .filter(feature => {
            // Calculate distance from user
            const placeLocation = {
                lng: feature.center[0],
                lat: feature.center[1]
            };
            const distance = calculateDistance(
                userLocation.lat, userLocation.lng,
                placeLocation.lat, placeLocation.lng
            );
            
            // Convert radius from meters to kilometers for comparison
            return distance <= (radius / 1000);
        })
        .map((feature, index) => {
            // Extract place details
            return {
                id: feature.id || `place-${index}`,
                name: feature.text || 'Unnamed Place',
                location: {
                    lng: feature.center[0],
                    lat: feature.center[1]
                },
                address: feature.place_name || 'No address available',
                // Mapbox doesn't provide these, so we'll generate random values for demo
                rating: Math.random() * 5,
                openNow: Math.random() > 0.3, // 70% chance of being open
                distance: calculateDistance(
                    userLocation.lat, userLocation.lng,
                    feature.center[1], feature.center[0]
                )
            };
        })
        // Sort by distance
        .sort((a, b) => a.distance - b.distance);
    
    return places;
}

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
}

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} Radians
 */
function deg2rad(deg) {
    return deg * (Math.PI/180);
}

/**
 * Display places in the results list
 * @param {Array} places - Array of place objects
 */
function displayPlacesList(places) {
    const resultsContainer = document.getElementById('results-container');
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // If no places, show message
    if (places.length === 0) {
        return;
    }
    
    // Create results list
    const ul = document.createElement('ul');
    ul.className = 'divide-y divide-gray-200';
    
    // Add each place to the list
    places.forEach((place, index) => {
        const li = document.createElement('li');
        li.className = 'place-result-item py-3 px-2';
        li.dataset.index = index;
        
        // Format distance
        const distance = place.distance < 1 
            ? `${(place.distance * 1000).toFixed(0)} m` 
            : `${place.distance.toFixed(1)} km`;
        
        // Create list item content
        li.innerHTML = `
            <div class="flex justify-between">
                <h3 class="font-medium text-gray-900">${place.name}</h3>
                <span class="text-sm text-gray-500">${distance}</span>
            </div>
            <div class="star-rating text-sm my-1">
                ${getStarRating(place.rating)}
                <span class="text-gray-600 text-xs">${place.rating ? place.rating.toFixed(1) : 'N/A'}</span>
            </div>
            <p class="text-sm text-gray-500 truncate">${place.address}</p>
            ${place.openNow !== undefined ? 
                `<p class="text-xs mt-1 ${place.openNow ? 'text-green-600' : 'text-red-600'}">
                    ${place.openNow ? 'Open now' : 'Closed'}
                </p>` : ''
            }
        `;
        
        // Add click event to focus on map marker
        li.addEventListener('click', () => {
            focusMarker(index);
        });
        
        ul.appendChild(li);
    });
    
    resultsContainer.appendChild(ul);
}
