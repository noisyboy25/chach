import React, { useState } from 'react';
import { Message } from '../../src/dao';

const MessageInput = ({
  sendMessage,
}: {
  sendMessage: (message: Message) => void;
}) => {
  const [text, setText] = useState('');
  const [login, setName] = useState('');
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendMessage({
          text,
          author: { login },
        });

        setText('');
      }}
    >
      <input
        type="text"
        name="name"
        id="name"
        value={login}
        placeholder="name"
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        name="text"
        id="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button>Send</button>
    </form>
  );
};

export default MessageInput;
