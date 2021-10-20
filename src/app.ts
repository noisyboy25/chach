require('dotenv').config();

import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import authRouter from './auth';
import messageRouter from './message';
import argon2 from 'argon2';
import { Auth } from './interfaces';

const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

export const prisma = new PrismaClient();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

wss.on('connection', (ws, req) => {
  console.log(
    `WS client connected to ${req.socket.remoteAddress}:${req.socket.remotePort}`
  );

  ws.on('message', async (msg) => {
    const data = JSON.parse(msg.toString());
    console.log(data);

    if (data.type === 'newMessage') {
      const message = data.message;
      const auth: Auth = data.auth;

      const user = await prisma.user.findUnique({
        where: { login: auth.username },
      });

      if (!user) return;

      if (!(await argon2.verify(user.password, auth.password))) return;

      console.log(auth);

      const createdMessage = await prisma.message.create({
        data: {
          author: { connect: { login: auth.username } },
          text: message.text,
        },
        include: { author: true },
      });

      wss.clients.forEach((client) => {
        client.send(
          JSON.stringify({ type: 'newMessage', message: createdMessage })
        );
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Local server started on http://localhost:${PORT}`);
});
