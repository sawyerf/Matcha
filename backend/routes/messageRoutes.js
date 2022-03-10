import { Router } from 'express';
import messageController from '../controllers/messageController';

export const messageRouter = Router();

messageRouter.post('/send', async (req, res) => messageController.sendMessage(req, res));