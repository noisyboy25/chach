import React from 'react';
import { Message } from '../../src/dao';
import MessageInput from './MessageInput';

const Messenger = ({
  auth,
  messages,
  sendMessage,
}: {
  auth: string;
  messages: Message[];
  sendMessage: (message: any) => void;
}) => {
  return (
    <div>
      {auth && <MessageInput sendMessage={sendMessage} />}
      {[...messages].reverse().map((m: Message) => (
        <div key={m.id}>
          [{m.author && m.author.login}] {m.text}
        </div>
      ))}
    </div>
  );
};

export default Messenger;
