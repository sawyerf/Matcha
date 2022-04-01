import userModels from '../models/user';
import jwt from '../utils/jwt'

export const initSocket = (io) => {
    console.log('Start Socket');
    io.sockets.on('connection', (socket) => {
        socket.on('token', async (token) => {
            const user = await jwt.socketToken(socket, token);
            if (user === false) {
                socket.disconnect();
            } else {
                socket.me = user;
                console.log('Connect', user.username)
                socket.join(user.uid);
                const DateNow = Date.now();
                userModels.setVal(socket.me.uid, 'last_visit', new Date(DateNow).toISOString());
            }
        })
        
        socket.on('disconnect', () => {
            console.log('disconnect')
            if (socket.me !== undefined) {
                const DateNow = Date.now();
                userModels.setVal(socket.me.uid, 'last_visit', new Date(DateNow).toISOString());
            }
        });
    });
}