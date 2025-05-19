const mongoose = require('mongoose');
const Joi = require('joi');

// Student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  course: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

// Create Student model
const Student = mongoose.model('Student', studentSchema);

// Validation schema
const validateStudent = (student) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    course: Joi.string().min(2).max(100).required(),
    registrationDate: Joi.date()
  });
  
  return schema.validate(student);
};

module.exports = {
  Student,
  validateStudent
};
