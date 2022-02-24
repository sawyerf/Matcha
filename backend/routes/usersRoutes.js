import { Router } from 'express';
import usersController from '../controllers/usersController'

export const usersRouter = Router();

usersRouter.get('/matchs', async (req, res) => usersController.matchs(req, res));
usersRouter.get('/likes', async (req, res) => usersController.likes(req, res));
usersRouter.get('/offer', async (req, res) => usersController.offer(req, res));
usersRouter.get('/search', async (req, res) => usersController.search(req, res));

usersRouter.post('/report', async (req, res) => usersController.report(req, res));
usersRouter.post('/block', async (req, res) => usersController.block(req, res));