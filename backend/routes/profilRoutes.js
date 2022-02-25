import { Router } from 'express';
import profilController from '../controllers/profilController';

export const profilRouter = Router();

profilRouter.post('/setinfo', async (req, res) => profilController.setInfo(req, res));
profilRouter.post('/changepassword', async (req, res) => profilController.changePassword(req, res));