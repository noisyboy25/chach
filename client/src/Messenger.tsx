import React, { useEffect, useState } from 'react';
import { Message } from '../../src/common/Message';
import MessageInput from './MessageInput';

const Messenger = ({
  messages,
  sendMessage,
}: {
  messages: Message[];
  sendMessage: (message: Message) => void;
}) => {
  return (
    <div>
      <MessageInput sendMessage={sendMessage} />
      {[...messages].reverse().map((m: Message, i: number) => (
        <div key={i}>
          [{m.author && m.author.name}] {m.text}
        </div>
      ))}
    </div>
  );
};

export default Messenger;
