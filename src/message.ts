import { Router } from 'express';
import { prisma } from './app';

const messageRouter = Router();

messageRouter.get('/:id', async (req, res) => {
  const message = await prisma.message.findUnique({
    where: { id: +req.params.id },
  });
  res.json({
    message,
  });
});

messageRouter.get('/', async (req, res) => {
  res.json({ messages: await prisma.message.findMany() });
});

messageRouter.post('/', async (req, res) => {
  try {
    const message = await prisma.message.create({ data: req.body });
    res.json({ message });
  } catch (error) {
    res.json(error);
  }
});

messageRouter.put('/:id', async (req, res) => {
  try {
    const message = await prisma.message.update({
      where: { id: +req.params.id },
      data: req.body,
    });
    res.json({ message });
  } catch (error) {
    res.json(error);
  }
});

messageRouter.delete('/:id', async (req, res) => {
  try {
    const message = await prisma.message.delete({
      where: { id: +req.params.id },
    });
    res.json({ message });
  } catch (error) {
    res.json(error);
  }
});

export default messageRouter;
