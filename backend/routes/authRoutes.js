import { Router } from 'express';
import authController from '../controllers/authController';

export const authRouter = Router();

authRouter.get('/login', async (req, res) => authController.login(req, res));