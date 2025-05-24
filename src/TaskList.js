import React, { useEffect, useState } from 'react';

// This component fetches and displays the user's tasks
function TaskList({ token }) {
  const [tasks, setTasks] = useState([]); // Holds the list of tasks
  const [error, setError] = useState(''); // Holds any error message

  // Fetch tasks from the backend when the component loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include auth token in header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json(); // Convert response to JSON
        setTasks(data); // Update the state with the task list
      } catch (err) {
        setError('Could not load tasks.'); // Set error message
        console.error(err); // For developer debugging
      }
    };

    fetchTasks(); // Call fetch function when component mounts
  }, [token]); // Only re-run when token changes

  return (
    <div>
      <h2>Your Tasks</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li> // Show each task title
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
