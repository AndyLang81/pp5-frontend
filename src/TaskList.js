import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import './App.css';

function TaskList({ token, API_URL }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sortField, setSortField] = useState('due_date');
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Could not load tasks.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleTaskAdded = (text, type) => {
    fetchTasks();
    setShowForm(false);
    setMessage({ text, type });

    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Delete failed');
      fetchTasks();
    } catch (err) {
      console.error('Could not delete task', err);
    }
  };

  const handleEdit = (task) => setEditingTask(task);

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/tasks/${editingTask.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingTask),
      });

      if (!response.ok) throw new Error('Update failed');
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Could not update task', err);
    }
  };

  const handleEditChange = (e) => {
    setEditingTask({
      ...editingTask,
      [e.target.name]: e.target.value,
    });
  };

  const markAsComplete = async (task) => {
    if (task.state === 'done') return;

    try {
      const response = await fetch(`${API_URL}/api/tasks/${task.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...task, state: 'done' }),
      });

      if (!response.ok) throw new Error('Failed to mark complete');
      fetchTasks();
    } catch (err) {
      console.error('Error marking task as complete:', err);
    }
  };

  const sortTasks = (taskList) => {
    return [...taskList].sort((a, b) => {
      if (sortField === 'due_date') return new Date(a.due_date) - new Date(b.due_date);
      if (sortField === 'title') return a.title.localeCompare(b.title);
      if (sortField === 'priority') return a.priority.localeCompare(b.priority);
      if (sortField === 'state') return a.state.localeCompare(b.state);
      return 0;
    });
  };

  return (
    <div>
      {/* Floating message top-left */}
      {message.text && (
        <div style={{
          position: 'fixed',
          top: '1em',
          left: '1em',
          zIndex: 1000,
          padding: '1em',
          backgroundColor: message.type === 'error' ? '#ffe6e6' : '#e6ffe6',
          border: `1px solid ${message.type === 'error' ? 'red' : 'green'}`,
          color: message.type === 'error' ? 'darkred' : 'darkgreen',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          fontWeight: 'bold',
        }}>
          {message.text}
        </div>
      )}

      <h2>Your Tasks</h2>

      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '1em' }}>
        {showForm ? 'Hide Task Form' : 'Add Task'}
      </button>

      {showForm && (
        <div style={{ marginBottom: '2em' }}>
          <TaskForm token={token} onTaskAdded={handleTaskAdded} API_URL={API_URL} />
        </div>
      )}

      <label htmlFor="sort">Sort by:</label>{' '}
      <select id="sort" value={sortField} onChange={(e) => setSortField(e.target.value)}>
        <option value="due_date">Due Date</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="state">Status</option>
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {sortTasks(tasks).map((task) => (
            <li key={task.id} className={`task-tile task-priority-${task.priority}`}>
              {editingTask?.id === task.id ? (
                <form onSubmit={handleEditSubmit}>
                  <input type="text" name="title" value={editingTask.title} onChange={handleEditChange} required />
                  <input type="text" name="description" value={editingTask.description} onChange={handleEditChange} />
                  <input type="date" name="due_date" value={editingTask.due_date} onChange={handleEditChange} required />
                  <select name="priority" value={editingTask.priority} onChange={handleEditChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <select name="state" value={editingTask.state} onChange={handleEditChange}>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <input type="text" name="category" value={editingTask.category} onChange={handleEditChange} />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <h3>{task.title}</h3>
                  <p><strong>Description:</strong> {task.description || 'N/A'}</p>
                  <p><strong>Due Date:</strong> {task.due_date}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <p><strong>Status:</strong> {task.state}</p>
                  <p><strong>Category:</strong> {task.category || 'None'}</p>
                  <div style={{ display: 'flex', gap: '0.5em', flexWrap: 'wrap' }}>
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                    {task.state !== 'done' && (
                      <button onClick={() => markAsComplete(task)}>Complete</button>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
