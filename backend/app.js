import express from 'express';
import cors from 'cors';

import { apiRouter } from './routes';
import { client } from './models/connection'

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(process.env.PORT || 3000);