import argon2 from 'argon2';
import { Router } from 'express';
import { prisma } from './app';
import { LoginForm } from './interfaces';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const user: LoginForm = req.body;
    await prisma.user.create({
      data: { login: user.login, password: await argon2.hash(user.password) },
    });
    res.json({ message: 'User created' });
  } catch (error) {
    res.status(500).json(error);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const user: LoginForm = req.body;
    const foundUser = await prisma.user.findUnique({
      where: { login: user.login },
    });

    if (!foundUser) return res.status(404).json({ message: 'User not found' });
    if (!(await argon2.verify(foundUser.password, user.password)))
      res.status(401).json({ message: 'Wrong password' });
    else res.json({ message: 'logged in successfully' });
  } catch (error) {
    res.status(401).json({ error });
  }
});

export default authRouter;
