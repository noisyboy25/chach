require('dotenv').config();

import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import * as path from 'path';

const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

wss.on('connection', (ws, req) => {
  console.log(
    `WS client connected to ${req.socket.remoteAddress}:${req.socket.remotePort}`
  );

  ws.on('message', (msg) => {
    const data = JSON.parse(msg.toString());
    console.log(data);

    if (data.type === 'newMessage') {
      const m = data.message;
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: 'newMessage', message: m }));
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Local server started on http://localhost:${PORT}`);
});
