const { Note, validateNote } = require('../models/Note');

// Note controller
const noteController = {
  // Get all notes
  async getAllNotes(req, res) {
    try {
      const notes = await Note.find().sort({ createdAt: -1 });
      res.status(200).json(notes);
    } catch (error) {
      console.error('Error getting notes:', error);
      res.status(500).json({ error: 'Failed to retrieve notes' });
    }
  },

  // Get note by ID
  async getNoteById(req, res) {
    try {
      const note = await Note.findById(req.params.id);
      
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      
      res.status(200).json(note);
    } catch (error) {
      console.error('Error getting note:', error);
      res.status(500).json({ error: 'Failed to retrieve note' });
    }
  },

  // Create a new note
  async createNote(req, res) {
    try {
      // Validate note data
      const { error } = validateNote(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      
      // Create note
      const newNote = new Note({
        title: req.body.title,
        content: req.body.content
      });
      
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).json({ error: 'Failed to create note' });
    }
  },

  // Update a note
  async updateNote(req, res) {
    try {
      // Validate note data
      const { error } = validateNote(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      
      // Update note
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          content: req.body.content
        },
        { new: true } // Return the updated document
      );
      
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      
      res.status(200).json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ error: 'Failed to update note' });
    }
  },

  // Delete a note
  async deleteNote(req, res) {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      
      if (!deletedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      
      res.status(200).json({ message: 'Note deleted successfully', note: deletedNote });
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'Failed to delete note' });
    }
  }
};

module.exports = noteController;
