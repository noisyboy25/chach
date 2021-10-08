import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import * as path from 'path';

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

wss.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log(msg);
  });
});

app.listen(PORT, () => {
  console.log(`Local server started on http://localhost:${PORT}`);
});
