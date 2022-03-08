import { Router } from 'express';
import profilController from '../controllers/profilController';

export const profilRouter = Router();

profilRouter.post('/setinfo', async (req, res) => profilController.setInfo(req, res));
profilRouter.post('/changepassword', async (req, res) => profilController.changePassword(req, res));
profilRouter.post('/addimage', async (req, res) => profilController.addImage(req, res));
profilRouter.post('/delimage', async (req, res) => profilController.delImage(req, res));