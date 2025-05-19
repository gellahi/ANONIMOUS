import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';

const EditTask = () => {
  const { id } = useParams();
  const { getTask, updateTask } = useContext(TaskContext);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTask(id);
        setTask(taskData);
      } catch (err) {
        setError('Failed to fetch task details');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, getTask]);

  const handleSubmit = async (formData) => {
    try {
      await updateTask(id, formData);
      navigate('/');
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Task not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Task</h2>
      <TaskForm task={task} onSubmit={handleSubmit} buttonText="Update Task" />
    </div>
  );
};

export default EditTask;
