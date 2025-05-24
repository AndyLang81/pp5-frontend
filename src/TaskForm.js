import React, { useState } from 'react';

// Form to create a task with all required fields
function TaskForm({ token, onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      due_date: dueDate,
      priority,
      category,
    };

    console.log("Sending payload:", payload); // Debug log

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error('Backend error:', errData); // Debug backend response
        throw new Error('Failed to create task');
      }

      // Reset form
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setCategory('');
      setError('');
      onTaskAdded(); // Refresh list

    } catch (err) {
      setError('Could not add task.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <br />

      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <br />

      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <br />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <br />

      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <br />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
