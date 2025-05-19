const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/notes', noteRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Notes API',
    endpoints: {
      notes: {
        getAllNotes: 'GET /notes',
        getNoteById: 'GET /notes/:id',
        createNote: 'POST /notes',
        updateNote: 'PUT /notes/:id',
        deleteNote: 'DELETE /notes/:id'
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
