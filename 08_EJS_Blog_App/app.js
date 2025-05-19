const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
require('./config/db');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const postRoutes = require('./routes/posts');
app.use('/', postRoutes);

// Error handling middleware
app.use((req, res) => {
  res.status(404).render('error', { 
    title: 'Error',
    message: 'Page not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
