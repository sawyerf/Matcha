import { Router } from 'express';
import { authRouter } from './authRoutes';
import { actionRouter } from './actionRoutes';
import { usersRouter } from './usersRoutes';
import { profilRouter } from './profilRoutes';
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { messageRouter } from './messageRoutes';
import { noRouter } from './noRoutes'

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/no', noRouter);
apiRouter.use('/action', jwtMiddleware, actionRouter);
apiRouter.use('/users', jwtMiddleware, usersRouter);
apiRouter.use('/profil', jwtMiddleware, profilRouter);
// apiRouter.use('/message', jwtMiddleware, messageRouter);