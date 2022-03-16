import { Router } from 'express';
import profilController from '../controllers/profilController';
// import multer from 'multer';

export const profilRouter = Router();

profilRouter.post('/setinfo', async (req, res) => profilController.setInfo(req, res));
profilRouter.post('/changepassword', async (req, res) => profilController.changePassword(req, res));
profilRouter.post('/changemail', async (req, res) => profilController.changeMail(req, res));
profilRouter.delete('/image', async (req, res) => profilController.delImage(req, res));
profilRouter.get('/me', async (req, res) => profilController.me(req, res));

// const upload = multer({
//     dest: 'images',
// });
profilRouter.post('/image', /*upload.single('image'),*/ async (req, res) => profilController.addImage(req, res));