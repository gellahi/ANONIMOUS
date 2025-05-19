const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a virtual property for short description
PostSchema.virtual('shortDescription').get(function() {
  return this.content.length > 150 ? 
    this.content.substring(0, 150) + '...' : 
    this.content;
});

// Ensure virtuals are included when converting to JSON
PostSchema.set('toJSON', { virtuals: true });
PostSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Post', PostSchema);
