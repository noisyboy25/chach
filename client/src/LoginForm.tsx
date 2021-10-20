import React, { useState } from 'react';
import { Auth } from '../../src/interfaces';

const LoginForm = ({
  setAuth,
}: {
  setAuth: React.Dispatch<React.SetStateAction<Auth | undefined>>;
}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) return;

    setLogin('');
    setPassword('');
    setAuth({ username: login, password });
    const data = await res.json();
    console.log(data);
    if (data.message) setStatus(data.message);
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
      <button onClick={(event) => handleLogin(event)}>Login</button>
      <p>{status}</p>
    </form>
  );
};

export default LoginForm;
