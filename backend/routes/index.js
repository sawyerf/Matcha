import { Router } from 'express';
import { authRouter } from './authRoutes';
import { actionRouter } from './actionRoutes';
import { usersRouter } from './usersRoutes';
import { profilRouter } from './profilRoutes';
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { profilMiddleware } from '../middleware/profilMiddleware';
import { noRouter } from './noRoutes'
import { messageRouter } from './messageRoutes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/no', noRouter);
apiRouter.use('/profil', jwtMiddleware, profilRouter);
apiRouter.use('/action', jwtMiddleware, profilMiddleware, actionRouter);
apiRouter.use('/users',  jwtMiddleware, profilMiddleware, usersRouter);
apiRouter.use('/message',  jwtMiddleware, profilMiddleware, messageRouter);