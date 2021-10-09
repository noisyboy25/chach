import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Message } from '../../src/common/Message';
import Messenger from './Messenger';
import useWebSocket from 'react-use-websocket';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const host = window.location.origin.replace(/^http/, 'ws');

  console.log(`Connecting WebSocket to ${host}`);

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(host, {
    onOpen: () => console.log(`WebSocket connected to ${host}`),
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'newMessage')
        setMessages((prev) => [...prev, data.message]);
    },
    shouldReconnect: (closeEvent) => true,
  });

  const sendNewMessage = (message: Message) => {
    sendMessage(JSON.stringify({ type: 'newMessage', message }));
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <Messenger messages={messages} sendMessage={sendNewMessage} />
    </div>
  );
}

export default App;
