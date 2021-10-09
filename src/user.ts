import { Router } from 'express';
import { prisma } from './app';

const userRouter = Router();

userRouter.get('/:id', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: +req.params.id } });
  res.end(
    JSON.stringify({
      user,
    })
  );
});

userRouter.get('/', async (req, res) => {
  res.end(JSON.stringify({ users: await prisma.user.findMany() }));
});

userRouter.post('/', async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.end(JSON.stringify({ user }));
  } catch (error) {
    res.end(JSON.stringify(error));
  }
});

userRouter.put('/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: +req.params.id },
      data: req.body,
    });
    res.end(JSON.stringify({ user }));
  } catch (error) {
    res.end(JSON.stringify(error));
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({ where: { id: +req.params.id } });
    res.end(JSON.stringify({ user }));
  } catch (error) {
    res.end(JSON.stringify(error));
  }
});

export default userRouter;
