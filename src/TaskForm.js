import React, { useState } from 'react';

function TaskForm({ token, onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [state, setState] = useState('open');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      due_date: dueDate,
      priority,
      state,
      category,
    };

    try {
      const response = await fetch(`${API_URL}/api/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error('Backend error:', errData);
        setMessage({ text: 'Failed to create task.', type: 'error' });
        return;
      }

      // Reset form and show success message
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setState('open');
      setCategory('');
      setMessage({ text: 'Task added successfully.', type: 'success' });
      onTaskAdded();

    } catch (err) {
      setMessage({ text: 'Could not add task.', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Task</h3>

      {/* Message display */}
      {message.text && (
        <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.text}
        </p>
      )}

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
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <br />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
