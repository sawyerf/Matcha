import { Router } from 'express';
import profilController from '../controllers/profilController';

export const profilRouter = Router();

profilRouter.get('/me', async (req, res) => profilController.me(req, res));
profilRouter.post('/setinfo', async (req, res) => profilController.setInfo(req, res));
profilRouter.post('/changepassword', async (req, res) => profilController.changePassword(req, res));
profilRouter.post('/changemail', async (req, res) => profilController.changeMail(req, res));
profilRouter.post('/setlocation', async (req, res) => profilController.setLocation(req, res));
profilRouter.post('/image', async (req, res) => profilController.addImage(req, res));
profilRouter.delete('/image', async (req, res) => profilController.delImage(req, res));