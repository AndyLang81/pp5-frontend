import React, { useState, useEffect } from 'react';
import Login from './Login';
import TaskList from './TaskList';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // Save token to localStorage on login
  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Logout clears token
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="App">
      <h1>PP5 Task Manager</h1>

      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <button onClick={handleLogout}>Log out</button>
          <TaskList token={token} />
        </>
      )}
    </div>
  );
}

export default App;
