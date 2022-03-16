import userModels from '../models/user';
import jwt from '../utils/jwt'
import messageController from '../controllers/messageController';

export const initSocket = (io) => {
    console.log('Start Socket');
    io.sockets.on('connection', (socket) => {
        socket.on('token', async (token) => {
            const user = await jwt.socketToken(socket, token);
            socket.me = user;
            if (user === false) {
                socket.disconnect();
            } else {
                console.log('Connect', user.username)
                socket.join(user.uid);
            }
        })

        socket.on('message', (data) => messageController.sendMessage(socket, data));
    });
}