# Location Finder App

A web application that uses the browser's Geolocation API and Mapbox to help users find nearby places.

## Features

1. **Map Integration**
   - Displays an interactive map centered on the user's current location
   - Shows a marker at the user's location
   - Provides navigation controls for zooming and panning

2. **Nearby Search**
   - Allows users to search for places by type (e.g., restaurants, hospitals, cafes)
   - Displays results as markers on the map
   - Shows a list of results with details including name, rating, and address

3. **Interactive Elements**
   - Clicking on a marker shows an info window with place details
   - Clicking on a list item focuses the map on the corresponding marker
   - Responsive design works on both desktop and mobile devices

## Technologies Used

- HTML5, CSS3, JavaScript
- Tailwind CSS for styling
- Mapbox GL JS for maps and geocoding
- Browser Geolocation API

## Setup Instructions

1. **Get a Mapbox Access Token**
   - Sign up for a free account at [Mapbox](https://account.mapbox.com/auth/signup/)
   - Create an access token in your account dashboard
   - Replace `YOUR_MAPBOX_ACCESS_TOKEN` in `js/map.js` with your actual token

2. **Run the Application**
   - Open `index.html` in a web browser
   - Allow location access when prompted
   - Start searching for nearby places!

## API Usage Notes

This application uses the following APIs:

1. **Browser Geolocation API**
   - Used to get the user's current location
   - Requires user permission

2. **Mapbox GL JS**
   - Used for displaying the interactive map
   - Free tier includes 50,000 map loads per month

3. **Mapbox Geocoding API**
   - Used as a substitute for Google Places API
   - Free tier includes 100,000 requests per month

## Alternative APIs

For a production application, consider using:

- **Google Maps JavaScript API** with **Google Places API** for more comprehensive place data
- **Foursquare Places API** for detailed venue information
- **Yelp Fusion API** for business listings with reviews

## Browser Compatibility

- Chrome 49+
- Firefox 41+
- Safari 10+
- Edge 12+

## License

This project is for educational purposes only.
