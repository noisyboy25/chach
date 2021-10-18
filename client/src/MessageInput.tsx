import React, { useState } from 'react';

const MessageInput = ({
  sendMessage,
}: {
  sendMessage: (message: any) => void;
}) => {
  const [text, setText] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendMessage({
          text,
        });

        setText('');
      }}
    >
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
