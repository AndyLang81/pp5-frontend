import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';

// This component fetches and displays the user's tasks
function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  // Fetch tasks from the backend API
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
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Could not load tasks.');
      console.error(err);
    }
  };

  // Run once when component mounts
  useEffect(() => {
    fetchTasks();
  }, [token]);

  // Called after a new task is added
  const handleTaskAdded = () => {
    fetchTasks();
  };

  return (
    <div>
      <h2>Your Tasks</h2>

      {/* Task creation form */}
      <TaskForm token={token} onTaskAdded={handleTaskAdded} />

      {/* Show any error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* List of tasks */}
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}>
              <h3>{task.title}</h3>
              <p><strong>Description:</strong> {task.description || 'N/A'}</p>
              <p><strong>Due Date:</strong> {task.due_date}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.state}</p>
              <p><strong>Category:</strong> {task.category || 'None'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
