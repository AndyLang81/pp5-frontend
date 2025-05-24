import React, { useState } from 'react';

// A form that lets the user add a new task
function TaskForm({ token, onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  // Send the new task to the API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Auth header
        },
        body: JSON.stringify({ title }), // Send only title
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      setTitle(''); // Clear the input field
      setError('');
      onTaskAdded(); // Notify parent to refresh task list
    } catch (err) {
      setError('Could not add task.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
