import { Router } from 'express';
import usersController from '../controllers/usersController'

export const usersRouter = Router();

usersRouter.get('/offer', async (req, res) => usersController.offer(req, res));
usersRouter.post('/search', async (req, res) => usersController.search(req, res));
usersRouter.post('/visit', async (req, res) => usersController.visit(req, res));
usersRouter.get('/matchs', async (req, res) => usersController.matchs(req, res));
usersRouter.get('/bighistory', async (req, res) => usersController.bigHistory(req, res));