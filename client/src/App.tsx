import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Message } from '../../src/common/Message';
import Messenger from './Messenger';
import useWebSocket from 'react-use-websocket';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(
    `ws://${document.location.hostname}:${process.env.PORT || 5000}`,
    {
      onOpen: () =>
        console.log(
          `WebSocket connected to ${document.location.hostname}:${
            process.env.PORT || 5000
          }`
        ),
      onMessage: (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'newMessage')
          setMessages((prev) => [...prev, data.message]);
      },
      shouldReconnect: (closeEvent) => true,
    }
  );

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
