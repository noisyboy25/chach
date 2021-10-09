import React, { useState } from 'react';
import './App.css';
import Messenger from './Messenger';
import useWebSocket from 'react-use-websocket';
import { Message } from '../../src/common/Message';

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

  const sendNewMessage = (message: Message) => {
    sendMessage(JSON.stringify({ type: 'newMessage', message }));
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div>{connected ? 'Ready!' : 'Connecting...'}</div>
      <Messenger messages={messages} sendMessage={sendNewMessage} />
    </div>
  );
}

export default App;
