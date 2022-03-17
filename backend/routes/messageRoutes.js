import { Router } from 'express';
import messageController from '../controllers/messageController';

export const messageRouter = Router();

messageRouter.get('/room', async (req, res) => messageController.roomMessage(req, res));