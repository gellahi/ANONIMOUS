# Student Management System

A full-stack CRUD web application built with Node.js, Express, MongoDB, jQuery, and AJAX.

## Project Structure

```
07_CRUD_UI_AJAX_JQuery/
├── backend/                  # Backend API
│   ├── controllers/          # Request handlers
│   ├── db/                   # Database connection
│   ├── middleware/           # Custom middleware
│   ├── models/               # Data models
│   ├── routes/               # API routes
│   ├── .env                  # Environment variables
│   ├── package.json          # Project dependencies
│   └── server.js             # Entry point
│
└── frontend/                 # Frontend application
    ├── css/                  # Stylesheets
    │   └── styles.css        # Main stylesheet
    ├── js/                   # JavaScript files
    │   ├── app.js            # Main application logic
    │   └── api.js            # API interaction functions
    └── index.html            # Main HTML page
```

## Features

- RESTful API with Express and MongoDB
- Complete CRUD operations
- AJAX-driven frontend with jQuery
- Real-time email availability checking
- Inline editing of student records
- Responsive design with Bootstrap
- Form validation
- Success/error notifications

## Backend API Endpoints

- `GET /students` - Get all students
- `GET /students/:id` - Get a specific student
- `POST /students` - Create a new student
- `PUT /students/:id` - Update a student
- `DELETE /students/:id` - Delete a student
- `GET /students/check-email?email=example@example.com` - Check if email exists

## Setup and Running

### Backend

1. Navigate to the backend directory:
```
cd backend
```

2. Install dependencies:
```
npm install
```

3. Make sure MongoDB is running on your system.

4. Configure the `.env` file with your MongoDB URI.

5. Start the server:
```
npm start
```

The API will be available at http://localhost:3002

### Frontend

1. Open the `frontend/index.html` file in your browser.

2. Make sure the backend server is running.

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - MongoDB with Mongoose
  - Joi (for validation)
  - CORS

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript
  - jQuery
  - Bootstrap 5
  - AJAX
