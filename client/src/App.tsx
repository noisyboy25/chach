import React, { useEffect, useState } from 'react';
import './App.css';
import Messenger from './Messenger';
import useWebSocket from 'react-use-websocket';
import { Message } from '../../src/dao';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);

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

  const sendNewMessage = (message: Message) => {
    sendMessage(JSON.stringify({ type: 'newMessage', message }));
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
          </ul>
        </nav>
        <Switch>
          <Route path="/messenger">
            <div>{connected ? 'Ready!' : 'Connecting...'}</div>
            <Messenger messages={messages} sendMessage={sendNewMessage} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
