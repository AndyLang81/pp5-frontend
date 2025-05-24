import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';

// This component handles listing and deleting tasks
function TaskList({ token }) {
  const [tasks, setTasks] = useState([]); // Store fetched tasks
  const [error, setError] = useState(''); // Store any error messages

  // Fetch tasks from the API
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

  // Call once on component mount and whenever token changes
  useEffect(() => {
    fetchTasks();
  }, [token]);

  // Called by the TaskForm when a task is added
  const handleTaskAdded = () => {
    fetchTasks();
  };

  // Handle deleting a task
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Refresh task list after deletion
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Could not delete task.');
    }
  };

  return (
    <div>
      <h2>Your Tasks</h2>

      {/* Show task creation form */}
      <TaskForm token={token} onTaskAdded={handleTaskAdded} />

      {/* Show any errors */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display tasks or fallback text */}
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
              <button
                onClick={() => handleDelete(task.id)}
                style={{ marginTop: '0.5em', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '0.5em' }}
              >
                Delete Task
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
