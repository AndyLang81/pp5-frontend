import React, { useState } from 'react';

function TaskForm({ token, onTaskAdded, API_URL }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [state, setState] = useState('open');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const clearMessage = () => {
    if (message.text) setMessage({ text: '', type: '' });
  };

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
        setMessage({ text: 'Failed to create task.', type: 'error' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        return;
      }

      // ✅ Success
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setState('open');
      setCategory('');
      setMessage({ text: 'Task added successfully.', type: 'success' });
      console.log('✅ Task added and message set');
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      onTaskAdded();

    } catch (err) {
      setMessage({ text: 'Could not add task.', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Task</h3>

      {message.text && (
        <div style={{
          padding: '0.5em',
          marginBottom: '1em',
          border: '1px solid',
          borderColor: message.type === 'error' ? 'red' : 'green',
          backgroundColor: message.type === 'error' ? '#ffe6e6' : '#e6ffe6',
          color: message.type === 'error' ? 'darkred' : 'darkgreen',
          borderRadius: '5px',
          fontWeight: 'bold',
        }}>
          {message.text}
        </div>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => { setTitle(e.target.value); clearMessage(); }}
        required
      />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => { setDescription(e.target.value); clearMessage(); }}
      />
      <br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => { setDueDate(e.target.value); clearMessage(); }}
        required
      />
      <br />

      <select value={priority} onChange={(e) => { setPriority(e.target.value); clearMessage(); }}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <br />

      <select value={state} onChange={(e) => { setState(e.target.value); clearMessage(); }}>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <br />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => { setCategory(e.target.value); clearMessage(); }}
      />
      <br />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
