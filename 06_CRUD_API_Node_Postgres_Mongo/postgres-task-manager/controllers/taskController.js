const Task = require('../models/task');

// Task controller
const taskController = {
  // Get all tasks
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.getAll();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
  },

  // Get task by ID
  async getTaskById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const task = await Task.getById(id);
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      res.status(200).json(task);
    } catch (error) {
      console.error('Error getting task:', error);
      res.status(500).json({ error: 'Failed to retrieve task' });
    }
  },

  // Create a new task
  async createTask(req, res) {
    try {
      // Validate task data
      const { error, value } = Task.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      
      // Create task
      const newTask = await Task.create(value);
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  },

  // Update a task
  async updateTask(req, res) {
    try {
      const id = parseInt(req.params.id);
      
      // Check if task exists
      const task = await Task.getById(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      // Validate task data
      const { error, value } = Task.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      
      // Update task
      const updatedTask = await Task.update(id, value);
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  },

  // Delete a task
  async deleteTask(req, res) {
    try {
      const id = parseInt(req.params.id);
      
      // Check if task exists
      const task = await Task.getById(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      // Delete task
      const deletedTask = await Task.delete(id);
      res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
};

module.exports = taskController;
