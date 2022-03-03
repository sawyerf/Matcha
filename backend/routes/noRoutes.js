import { Router } from 'express';
import noController from '../controllers/noController';

export const noRouter = Router();

noRouter.get('/validmail/:key', async (req, res) => noController.validMail(req, res));
noRouter.post('/resetpass/:key', async (req, res) => noController.resetPass(req, res));
noRouter.post('/askreset', async (req, res) => noController.askReset(req, res));