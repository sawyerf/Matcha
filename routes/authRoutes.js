import { Router } from 'express';

export const authRouter = Router();

authRouter.get('/login', (req, res) => {
    res.status(200).json({
        'desbarres': 'lol'
    });
});