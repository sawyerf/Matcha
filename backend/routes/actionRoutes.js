import { Router } from 'express';
import actionController from '../controllers/actionController';

export const actionRouter = Router();

actionRouter.post('/like', async (req, res) => actionController.like(req, res));