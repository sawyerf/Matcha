const express = require('express');
import { apiRouter } from './routes';

const app = express();

app.use(express.json())

app.use('/api', apiRouter)

app.listen(3000);