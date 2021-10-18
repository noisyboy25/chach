import React, { useState } from 'react';

const RegisterForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event: React.MouseEvent) => {
    event.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) return;
    setLogin('');
    setPassword('');
    const data = await res.json();
    console.log(data);
  };

  return (
    <form>
      <input
        type="text"
        name="login"
        id="login"
        value={login}
        onChange={(event) => setLogin(event.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={(event) => handleRegister(event)}>Register</button>
    </form>
  );
};

export default RegisterForm;
