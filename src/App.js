import React, { useState } from 'react';
import Login from './Login';
import TaskList from './TaskList';
import './App.css'; // import the styling

function App() {
  const [token, setToken] = useState(null);

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
        <Login onLogin={handleLogin} />
      ) : (
        <TaskList token={token} />
      )}
    </div>
  );
}

export default App;
