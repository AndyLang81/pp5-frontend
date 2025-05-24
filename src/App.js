import './App.css';
import React, { useState } from 'react';
import Login from './Login';
import TaskList from './TaskList';

function App() {
  const [token, setToken] = useState(null); // Stores the user's access token

  // Called after successful login to store the token
  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  // Log the user out by clearing the token
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="App">
      <h1>PP5 Task Manager</h1>

      {/* If logged in, show logout button and task list */}
      {token ? (
        <>
          <button onClick={handleLogout} style={{ marginBottom: '1em' }}>
            Log Out
          </button>
          <TaskList token={token} />
        </>
      ) : (
        // If not logged in, show the login screen
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
