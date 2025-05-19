const mongoose = require('mongoose');
const Joi = require('joi');

// Note schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create Note model
const Note = mongoose.model('Note', noteSchema);

// Validation schema
const validateNote = (note) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    content: Joi.string().required()
  });
  
  return schema.validate(note);
};

module.exports = {
  Note,
  validateNote
};
