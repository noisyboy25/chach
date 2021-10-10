import React from 'react';
import { Message } from '../../src/dao';
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
          [{m.author && m.author.login}] {m.text}
        </div>
      ))}
    </div>
  );
};

export default Messenger;
