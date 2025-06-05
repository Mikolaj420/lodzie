import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const response = await fetch('http://127.0.0.1:8000/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('Użytkownik zarejestrowany');
    } else {
      setMessage(data.error || 'Błąd rejestracji');
    }
  };

  return (
    <div>
      <h1>Rejestracja</h1>
      <input
        type="text"
        placeholder="Nazwa użytkownika"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: '0.5rem' }}
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '0.5rem' }}
      />
      <button onClick={handleRegister}>Zarejestruj</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
