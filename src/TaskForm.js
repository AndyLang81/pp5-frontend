import React, { useState } from 'react';

function TaskForm({ token, onTaskAdded, API_URL }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [state, setState] = useState('open');
  const [category, setCategory] = useState('');

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
        onTaskAdded('Failed to create task.', 'error');
        return;
      }

      // ✅ Success
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setState('open');
      setCategory('');
      onTaskAdded('Task added successfully.', 'success');

    } catch (err) {
      onTaskAdded('Could not add task.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Task</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
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

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
