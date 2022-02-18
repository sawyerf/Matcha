import { Router } from 'express';
import usersController from '../controllers/usersController'

export const usersRouter = Router();

usersRouter.get('/matchs', async (req, res) => usersController.matchs(req, res));