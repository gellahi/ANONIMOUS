const db = require('../db');
const Joi = require('joi');

// Task validation schema
const taskSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending')
});

// Task model
const Task = {
  // Get all tasks
  async getAll() {
    const result = await db.query('SELECT * FROM tasks ORDER BY id ASC');
    return result.rows;
  },

  // Get task by ID
  async getById(id) {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Create a new task
  async create(task) {
    const { title, description, status } = task;
    const result = await db.query(
      'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
      [title, description, status || 'pending']
    );
    return result.rows[0];
  },

  // Update a task
  async update(id, task) {
    const { title, description, status } = task;
    const result = await db.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
      [title, description, status, id]
    );
    return result.rows[0];
  },

  // Delete a task
  async delete(id) {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  // Validate task data
  validate(task) {
    return taskSchema.validate(task);
  }
};

module.exports = Task;
