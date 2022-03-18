import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import socket from 'socket.io';
import fileUpload from 'express-fileupload';
import { apiRouter } from './routes';
import { initSocket } from './socket';

require('dotenv').config()

const app = express();

app.use(fileUpload())
app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(cookieParser());

app.use('/api', apiRouter);

const server = app.listen(process.env.PORT || 3000);

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
global.io = io;
initSocket(io)