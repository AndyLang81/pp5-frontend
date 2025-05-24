import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';

function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false); // Controls visibility of TaskForm

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
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

  const handleTaskAdded = () => {
    fetchTasks();
    setShowForm(false); // Hide form after adding
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
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
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${editingTask.id}/`, {
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

  return (
    <div>
      <h2>Your Tasks</h2>

      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '1em' }}>
        {showForm ? 'Hide Task Form' : 'Add Task'}
      </button>

      {showForm && (
        <div style={{ marginBottom: '2em' }}>
          <TaskForm token={token} onTaskAdded={handleTaskAdded} />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}>
              {editingTask?.id === task.id ? (
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="title"
                    value={editingTask.title}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    value={editingTask.description}
                    onChange={handleEditChange}
                  />
                  <input
                    type="date"
                    name="due_date"
                    value={editingTask.due_date}
                    onChange={handleEditChange}
                    required
                  />
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
                  <input
                    type="text"
                    name="category"
                    value={editingTask.category}
                    onChange={handleEditChange}
                  />
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
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
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
