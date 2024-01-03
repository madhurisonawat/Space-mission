import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app">
      {!loggedIn ? (
        <Login onLogin={() => setLoggedIn(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;
