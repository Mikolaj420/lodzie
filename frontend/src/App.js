import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import BoatList from './BoatList';
import './App.css';
import logo from './logo.png';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [view, setView] = useState('login');

  const handleSetToken = (newToken, user) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', user);
    setToken(newToken);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername('');
    setView('login');
  };

  return (
    
    <div className="container">
      <img src={logo} alt="Logo" style={{ width: '80px', marginBottom: '1rem' }} />
      {!token ? (
        <>
          <button onClick={() => setView('register')}>Rejestracja</button>
          <button onClick={() => setView('login')}>Logowanie</button>
        </>
      ) : (
        <>
          <span>Zalogowany jako: <strong>{username}</strong></span>
          <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Wyloguj</button>
        </>
      )}

      {!token && view === 'register' && <Register />}
      {!token && view === 'login' && <Login setToken={handleSetToken} />}
      {token && (
        <>
          <BoatList token={token} />
        </>
      )}
    </div>
    

  );
}

export default App;
