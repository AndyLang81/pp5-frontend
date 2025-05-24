import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm'; // Import the form to add new tasks

// This component fetches and displays the user's tasks
function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);     // Stores the list of tasks
  const [error, setError] = useState('');     // Stores any fetch error

  // This function fetches tasks from the backend API
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);       // Save the fetched tasks
      setError('');
    } catch (err) {
      setError('Could not load tasks.');
      console.error(err);
    }
  };

  // Fetch tasks once on component mount
  useEffect(() => {
    fetchTasks();
  }, [token]);

  // This is called by TaskForm after a task is successfully added
  const handleTaskAdded = () => {
    fetchTasks(); // Refresh the list
  };

  return (
    <div>
      <h2>Your Tasks</h2>

      {/* Task creation form */}
      <TaskForm token={token} onTaskAdded={handleTaskAdded} />

      {/* Error message if something goes wrong */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display task list or fallback if empty */}
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
