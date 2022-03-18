import { Router } from 'express';
import imageController from '../controllers/imageController';

export const imageRouter = Router();

imageRouter.get('/:uid', async (req, res) => imageController.get(req, res));