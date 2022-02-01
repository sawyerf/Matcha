import { Router } from 'express';
// const { authRouter } = require('./authRoutes')
import { authRouter } from './authRoutes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);