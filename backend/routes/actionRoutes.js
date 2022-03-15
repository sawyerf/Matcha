import { Router } from 'express';
import actionController from '../controllers/actionController';

export const actionRouter = Router();

actionRouter.post('/like', async (req, res) => actionController.like(req, res));
actionRouter.post('/report', async (req, res) => actionController.report(req, res));
actionRouter.post('/block', async (req, res) => actionController.block(req, res));