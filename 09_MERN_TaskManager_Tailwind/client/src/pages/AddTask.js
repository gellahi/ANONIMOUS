import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';

const AddTask = () => {
  const { addTask } = useContext(TaskContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await addTask(formData);
      navigate('/');
    } catch (err) {
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <TaskForm onSubmit={handleSubmit} buttonText="Add Task" />
    </div>
  );
};

export default AddTask;
