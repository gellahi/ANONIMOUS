/**
 * Main application logic for Student Management System
 */

$(document).ready(function() {
    // DOM elements
    const $studentForm = $('#studentForm');
    const $studentId = $('#studentId');
    const $name = $('#name');
    const $email = $('#email');
    const $course = $('#course');
    const $submitBtn = $('#submitBtn');
    const $resetBtn = $('#resetBtn');
    const $studentList = $('#studentList');
    const $noStudents = $('#noStudents');
    const $alertContainer = $('#alertContainer');
    
    // Load students on page load
    loadStudents();
    
    // Event listeners
    $studentForm.on('submit', handleFormSubmit);
    $resetBtn.on('click', resetForm);
    $email.on('blur', checkEmailAvailability);
    
    /**
     * Load all students and display them in the table
     */
    function loadStudents() {
        API.getAllStudents()
            .done(function(students) {
                renderStudentList(students);
            })
            .fail(function(xhr) {
                showAlert('Error loading students: ' + (xhr.responseJSON?.error || 'Unknown error'), 'danger');
            });
    }
    
    /**
     * Render the student list in the table
     * @param {Array} students - Array of student objects
     */
    function renderStudentList(students) {
        $studentList.empty();
        
        if (students.length === 0) {
            $noStudents.removeClass('d-none');
            return;
        }
        
        $noStudents.addClass('d-none');
        
        students.forEach(function(student) {
            const registrationDate = new Date(student.registrationDate).toLocaleDateString();
            
            const $row = $(`
                <tr data-id="${student._id}">
                    <td class="name">${student.name}</td>
                    <td class="email">${student.email}</td>
                    <td class="course">${student.course}</td>
                    <td>${registrationDate}</td>
                    <td>
                        <button class="btn btn-edit btn-sm me-1">Edit</button>
                        <button class="btn btn-delete btn-sm">Delete</button>
                    </td>
                </tr>
            `);
            
            // Add event listeners to the buttons
            $row.find('.btn-edit').on('click', function() {
                startEditing(student._id);
            });
            
            $row.find('.btn-delete').on('click', function() {
                deleteStudent(student._id);
            });
            
            $studentList.append($row);
        });
    }
    
    /**
     * Handle form submission (create or update student)
     * @param {Event} event - The form submit event
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const studentData = {
            name: $name.val().trim(),
            email: $email.val().trim(),
            course: $course.val().trim()
        };
        
        const id = $studentId.val();
        
        if (id) {
            // Update existing student
            API.updateStudent(id, studentData)
                .done(function(updatedStudent) {
                    showAlert('Student updated successfully!', 'success');
                    resetForm();
                    loadStudents();
                })
                .fail(function(xhr) {
                    showAlert('Error updating student: ' + (xhr.responseJSON?.error || 'Unknown error'), 'danger');
                });
        } else {
            // Create new student
            API.createStudent(studentData)
                .done(function(newStudent) {
                    showAlert('Student registered successfully!', 'success');
                    resetForm();
                    loadStudents();
                })
                .fail(function(xhr) {
                    showAlert('Error registering student: ' + (xhr.responseJSON?.error || 'Unknown error'), 'danger');
                });
        }
    }
    
    /**
     * Start editing a student
     * @param {string} id - The student ID
     */
    function startEditing(id) {
        API.getStudentById(id)
            .done(function(student) {
                $studentId.val(student._id);
                $name.val(student.name);
                $email.val(student.email);
                $course.val(student.course);
                
                $submitBtn.text('Update Student');
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                
                // Highlight the row being edited
                $studentList.find('tr').removeClass('editing');
                $studentList.find(`tr[data-id="${id}"]`).addClass('editing');
            })
            .fail(function(xhr) {
                showAlert('Error loading student details: ' + (xhr.responseJSON?.error || 'Unknown error'), 'danger');
            });
    }
    
    /**
     * Delete a student
     * @param {string} id - The student ID
     */
    function deleteStudent(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            API.deleteStudent(id)
                .done(function(result) {
                    showAlert('Student deleted successfully!', 'success');
                    loadStudents();
                    
                    // If we were editing this student, reset the form
                    if ($studentId.val() === id) {
                        resetForm();
                    }
                })
                .fail(function(xhr) {
                    showAlert('Error deleting student: ' + (xhr.responseJSON?.error || 'Unknown error'), 'danger');
                });
        }
    }
    
    /**
     * Check if email is available when the field loses focus
     */
    function checkEmailAvailability() {
        const email = $email.val().trim();
        const currentId = $studentId.val();
        
        if (!email) return;
        
        API.checkEmailExists(email)
            .done(function(result) {
                if (result.exists && (!currentId || currentId !== result.studentId)) {
                    $email.addClass('is-invalid');
                    $('#emailFeedback').text('This email is already registered.');
                } else {
                    $email.removeClass('is-invalid');
                    $('#emailFeedback').text('');
                }
            })
            .fail(function(xhr) {
                showAlert('Error checking email: ' + (xhr.responseJSON?.error || 'Unknown error'), 'warning');
            });
    }
    
    /**
     * Reset the form to its initial state
     */
    function resetForm() {
        $studentId.val('');
        $studentForm[0].reset();
        $submitBtn.text('Register Student');
        $email.removeClass('is-invalid');
        $('#emailFeedback').text('');
        $studentList.find('tr').removeClass('editing');
    }
    
    /**
     * Show an alert message
     * @param {string} message - The message to display
     * @param {string} type - The alert type (success, danger, warning, info)
     */
    function showAlert(message, type = 'info') {
        const $alert = $(`
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        
        $alertContainer.append($alert);
        
        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            $alert.alert('close');
        }, 5000);
    }
});
