import React, { useState } from 'react';
import Login from './Login';
import TaskList from './TaskList';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="App">
      {token && (
        <div className="logout-container">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <h1>PP5 Task Manager</h1>

      {!token ? (
        <Login onLogin={handleLogin} API_URL={API_URL} />
      ) : (
        <TaskList token={token} API_URL={API_URL} />
      )}
    </div>
  );
}

export default App;
