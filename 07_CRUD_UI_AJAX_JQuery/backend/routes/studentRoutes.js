const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET all students
router.get('/', studentController.getAllStudents);

// GET check if email exists
router.get('/check-email', studentController.checkEmailExists);

// GET student by ID
router.get('/:id', studentController.getStudentById);

// POST create a new student
router.post('/', studentController.createStudent);

// PUT update a student
router.put('/:id', studentController.updateStudent);

// DELETE a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
