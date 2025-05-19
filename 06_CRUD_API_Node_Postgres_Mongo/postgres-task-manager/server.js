const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/tasks', taskRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Task Manager API',
    endpoints: {
      tasks: {
        getAllTasks: 'GET /tasks',
        getTaskById: 'GET /tasks/:id',
        createTask: 'POST /tasks',
        updateTask: 'PUT /tasks/:id',
        deleteTask: 'DELETE /tasks/:id'
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
