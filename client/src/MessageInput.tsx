import React, { useState } from 'react';
import { Message } from '../../src/common/Message';

const MessageInput = ({
  sendMessage,
}: {
  sendMessage: (message: Message) => void;
}) => {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendMessage({
          id: -1,
          text,
          author: { id: 1, name },
        });

        setText('');
      }}
    >
      <input
        type="text"
        name="name"
        id="name"
        value={name}
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
