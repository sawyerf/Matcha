import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import socket from 'socket.io';
import { apiRouter } from './routes';
// import { client } from './models/connection'
import { initSocket } from './socket'

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRouter);

const server = app.listen(process.env.PORT || 3000);

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
initSocket(io)