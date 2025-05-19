const { Student, validateStudent } = require('../models/Student');

// Student controller
const studentController = {
  // Get all students
  async getAllStudents(req, res) {
    try {
      const students = await Student.find().sort({ registrationDate: -1 });
      res.status(200).json(students);
    } catch (error) {
      console.error('Error getting students:', error);
      res.status(500).json({ error: 'Failed to retrieve students' });
    }
  },

  // Get student by ID
  async getStudentById(req, res) {
    try {
      const student = await Student.findById(req.params.id);
      
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      
      res.status(200).json(student);
    } catch (error) {
      console.error('Error getting student:', error);
      res.status(500).json({ error: 'Failed to retrieve student' });
    }
  },

  // Create a new student
  async createStudent(req, res) {
    try {
      // Validate student data
      const { error } = validateStudent(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      
      // Check if email already exists
      const existingStudent = await Student.findOne({ email: req.body.email });
      if (existingStudent) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      
      // Create student
      const newStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        registrationDate: req.body.registrationDate || new Date()
      });
      
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(500).json({ error: 'Failed to create student' });
    }
  },

  // Update a student
  async updateStudent(req, res) {
    try {
      // Validate student data
      const { error } = validateStudent(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      
      // Check if email already exists (but not for this student)
      if (req.body.email) {
        const existingStudent = await Student.findOne({ 
          email: req.body.email,
          _id: { $ne: req.params.id }
        });
        
        if (existingStudent) {
          return res.status(400).json({ error: 'Email already registered to another student' });
        }
      }
      
      // Update student
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          email: req.body.email,
          course: req.body.course,
          registrationDate: req.body.registrationDate
        },
        { new: true } // Return the updated document
      );
      
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      
      res.status(200).json(updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Failed to update student' });
    }
  },

  // Delete a student
  async deleteStudent(req, res) {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      
      if (!deletedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      
      res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ error: 'Failed to delete student' });
    }
  },

  // Check if email exists
  async checkEmailExists(req, res) {
    try {
      const email = req.query.email;
      
      if (!email) {
        return res.status(400).json({ error: 'Email parameter is required' });
      }
      
      const student = await Student.findOne({ email: email });
      res.status(200).json({ exists: !!student });
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ error: 'Failed to check email' });
    }
  }
};

module.exports = studentController;
