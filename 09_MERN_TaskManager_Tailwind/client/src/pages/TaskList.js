import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';

const TaskList = () => {
  const { tasks, loading, error, fetchTasks } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading && tasks.length === 0) {
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

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">No tasks found</h2>
        <p className="text-gray-500">Start by adding a new task</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Tasks</h2>
      <div className="grid grid-cols-1 gap-4">
        {tasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
