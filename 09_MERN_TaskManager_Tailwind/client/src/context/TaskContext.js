import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (task) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/tasks', task);
      setTasks([response.data, ...tasks]);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get a single task
  const getTask = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/tasks/${id}`);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to get task');
      console.error('Error getting task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a task
  const updateTask = async (id, updatedTask) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load tasks on initial render
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      fetchTasks,
      addTask,
      getTask,
      updateTask,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};
