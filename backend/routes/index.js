import { Router } from 'express';
// const { authRouter } = require('./authRoutes')
import { authRouter } from './authRoutes';
import { actionRouter } from './actionRoutes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/action', actionRouter);