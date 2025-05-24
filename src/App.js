import React, { useState } from 'react';
import Login from './Login'; // Login component for token-based login

function App() {
  // This state stores the JWT access token from the backend
  const [token, setToken] = useState(null);

  // This function is passed to the Login component to update token state
  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div className="App">
      <h1>PP5 Task Manager</h1>
      {!token ? (
        <Login onLogin={handleLogin} /> // Show login form if no token yet
      ) : (
        <p>You are logged in! Token: {token.slice(0, 10)}...</p> // Show token preview if logged in
      )}
    </div>
  );
}

export default App;
