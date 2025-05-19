/**
 * API functions for interacting with the backend
 */

const API_URL = 'http://localhost:3002/students';

const API = {
    /**
     * Get all students
     * @returns {Promise} Promise object representing the students
     */
    getAllStudents: function() {
        return $.ajax({
            url: API_URL,
            type: 'GET'
        });
    },
    
    /**
     * Get a student by ID
     * @param {string} id - The student ID
     * @returns {Promise} Promise object representing the student
     */
    getStudentById: function(id) {
        return $.ajax({
            url: `${API_URL}/${id}`,
            type: 'GET'
        });
    },
    
    /**
     * Create a new student
     * @param {Object} student - The student data
     * @returns {Promise} Promise object representing the created student
     */
    createStudent: function(student) {
        return $.ajax({
            url: API_URL,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(student)
        });
    },
    
    /**
     * Update a student
     * @param {string} id - The student ID
     * @param {Object} student - The updated student data
     * @returns {Promise} Promise object representing the updated student
     */
    updateStudent: function(id, student) {
        return $.ajax({
            url: `${API_URL}/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(student)
        });
    },
    
    /**
     * Delete a student
     * @param {string} id - The student ID
     * @returns {Promise} Promise object representing the result
     */
    deleteStudent: function(id) {
        return $.ajax({
            url: `${API_URL}/${id}`,
            type: 'DELETE'
        });
    },
    
    /**
     * Check if an email already exists
     * @param {string} email - The email to check
     * @returns {Promise} Promise object representing the result
     */
    checkEmailExists: function(email) {
        return $.ajax({
            url: `${API_URL}/check-email?email=${encodeURIComponent(email)}`,
            type: 'GET'
        });
    }
};
