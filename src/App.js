import React, { useState } from 'react';
import Login from './Login';
import TaskList from './TaskList'; // Shows tasks once user is logged in

function App() {
  const [token, setToken] = useState(null); // Stores the access token

  // Updates token when login is successful
  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div className="App">
      <h1>PP5 Task Manager</h1>

      {/* Show login if not logged in yet */}
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        // Once logged in, show the task list
        <TaskList token={token} />
      )}
    </div>
  );
}

export default App;
