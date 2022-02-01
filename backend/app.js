import express from 'express';
import { apiRouter } from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(3000);