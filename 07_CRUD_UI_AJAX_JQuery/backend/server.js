const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const studentRoutes = require('./routes/studentRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/students', studentRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Student Management API',
    endpoints: {
      students: {
        getAllStudents: 'GET /students',
        getStudentById: 'GET /students/:id',
        createStudent: 'POST /students',
        updateStudent: 'PUT /students/:id',
        deleteStudent: 'DELETE /students/:id',
        checkEmailExists: 'GET /students/check-email?email=example@example.com'
      }
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
