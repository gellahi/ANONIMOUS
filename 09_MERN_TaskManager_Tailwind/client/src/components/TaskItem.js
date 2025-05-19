import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { deleteTask, updateTask } = useContext(TaskContext);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleStatus = async () => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      await updateTask(task._id, { ...task, status: newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-xl font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          <p className="text-gray-600 mt-2">{task.description}</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span className="mr-4">Created: {formatDate(task.createdAt)}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {task.status}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <button
          onClick={toggleStatus}
          className={`px-3 py-1 rounded-md text-white ${
            task.status === 'completed' 
              ? 'bg-yellow-500 hover:bg-yellow-600' 
              : 'bg-green-500 hover:bg-green-600'
          } transition-colors`}
        >
          {task.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
        </button>
        
        <Link
          to={`/edit/${task._id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Edit
        </Link>
        
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
