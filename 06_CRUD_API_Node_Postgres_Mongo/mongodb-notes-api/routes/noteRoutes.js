const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// GET all notes
router.get('/', noteController.getAllNotes);

// GET note by ID
router.get('/:id', noteController.getNoteById);

// POST create a new note
router.post('/', noteController.createNote);

// PUT update a note
router.put('/:id', noteController.updateNote);

// DELETE a note
router.delete('/:id', noteController.deleteNote);

module.exports = router;
