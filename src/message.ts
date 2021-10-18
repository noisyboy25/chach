import { Router } from 'express';
import { prisma } from './app';

const messageRouter = Router();

messageRouter.get('/:id', async (req, res) => {
  const message = await prisma.message.findUnique({
    where: { id: +req.params.id },
    include: { author: true },
  });
  res.json({
    message,
  });
});

messageRouter.get('/', async (req, res) => {
  res.json({
    messages: await prisma.message.findMany({ include: { author: true } }),
  });
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
