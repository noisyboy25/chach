import React, { useEffect, useState } from 'react';
import './App.css';
import Messenger from './Messenger';
import useWebSocket from 'react-use-websocket';
import { Message } from '../../src/dao';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const [auth, setAuth] = useState('');

  const host = window.location.origin.replace(/^http/, 'ws') + '/ws';

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(host, {
    onOpen: () => {
      setConnected(true);
      console.log(`WebSocket connected to ${host}`);
    },
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'newMessage')
        setMessages((prev) => [...prev, data.message]);
    },
    shouldReconnect: (closeEvent) => {
      setConnected(false);
      return true;
    },
  });

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/message');
      const data = await res.json();
      setMessages(data.messages);
    })();
  }, []);

  const sendNewMessage = (message: any) => {
    sendMessage(JSON.stringify({ type: 'newMessage', message, auth }));
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/messenger">Messenger</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/messenger">
            <div>{connected ? 'Ready!' : 'Connecting...'}</div>
            <Messenger messages={messages} sendMessage={sendNewMessage} />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/login">
            <LoginForm setAuth={setAuth} />
            {auth && <Redirect to="/messenger" />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
