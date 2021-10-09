import { Router } from 'express';
import { prisma } from './app';

const messageRouter = Router();

messageRouter.get('/:id', async (req, res) => {
  const message = await prisma.message.findUnique({
    where: { id: +req.params.id },
  });
  res.end(
    JSON.stringify({
      message,
    })
  );
});

messageRouter.get('/', async (req, res) => {
  res.end(JSON.stringify({ messages: await prisma.message.findMany() }));
});

messageRouter.post('/', async (req, res) => {
  try {
    const message = await prisma.message.create({ data: req.body });
    res.end(JSON.stringify({ message }));
  } catch (error) {
    res.end(JSON.stringify(error));
  }
});

messageRouter.put('/:id', async (req, res) => {
  try {
    const message = await prisma.message.update({
      where: { id: +req.params.id },
      data: req.body,
    });
    res.end(JSON.stringify({ message }));
  } catch (error) {
    res.end(JSON.stringify(error));
  }
});

messageRouter.delete('/:id', async (req, res) => {
  try {
    const message = await prisma.message.delete({
      where: { id: +req.params.id },
    });
    res.end(JSON.stringify({ message }));
  } catch (error) {
    res.end(JSON.stringify(error));
  }
});

export default messageRouter;
