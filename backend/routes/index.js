import { Router } from 'express';
import { authRouter } from './authRoutes';
import { actionRouter } from './actionRoutes';
import { usersRouter } from './usersRoutes';
import { jwtMiddleware } from '../middleware/jwtMiddleware';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/action', jwtMiddleware, actionRouter);
apiRouter.use('/users', jwtMiddleware, usersRouter)