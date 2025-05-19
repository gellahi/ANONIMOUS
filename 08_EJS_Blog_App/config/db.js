const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017/ejs_blog_app';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
