import userModels from '../models/user';
import jwt from '../utils/jwt'
import messageController from '../controllers/messageController';

export const initSocket = (io) => {
    console.log('des barres');
    // console.log(io)
    io.sockets.on('connection', (socket) => {
        console.log('Connect', socket.id)
        socket.on('token', async (token) => {
            const user = await jwt.socketToken(socket, token);
            socket.me = user;
            console.log(user);
            if (user === false) {
                socket.disconnect();
            } else {
                socket.join(user.uid);
            }
        })

        socket.on('message', (data) => messageController.sendMessage(socket, data));
    });

    
}