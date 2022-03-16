import jwt from 'jsonwebtoken';
import userModels from '../models/user';

require('dotenv').config();

const createToken = (uid, username, email) => {
    const token = jwt.sign({
        'uid': uid,
        'username': username,
        'email': email, 
        'iat': Date.now()
    }, process.env.JWT_SECRET);
    return token;
}

const checkToken = (token) => {
    let verified;
    try {
        verified = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return false;
    }
    return verified;
}

const socketToken = async (socket, token) => {
    const user = checkToken(token);

    if (user == false) {
        await socket.emit('error', 'Bad Token')
        return false; // res.status(403).json({ 'error': 1, 'message': 'Bad Token' })
    } else if ((Date.now() - user.iat) / 1000 > 3600 * 24) {
        await socket.emit('error', 'Token expire')
        return false; // res.status(403).json({ 'error': 1, 'message': 'Token expire' })
    } else {
        const me = await userModels.selectMe(user.uid);

        if (me === false) {
            await socket.emit('error', 'SQL Error')
            return false; // res.status(400).json({ 'error': 1, 'message': 'SQL Error' })
        } else if (me === null) {
            await socket.emit('error', 'User Not Found')
            return false; // res.status(404).json({ 'error': 1, 'message': 'User Not Found' })
        } else {
            const DateNow = Date.now();
            const isOK = await userModels.setVal(me.uid, 'last_visit', new Date(DateNow).toISOString());
            if (isOK === false) {
                await socket.emit('error', 'SQL Error')
                return false; // res.status(400).json({ 'error': 1, 'message': 'SQL Error' })
            } else {
                return me;
            }
        }
    }
}

export default {
    createToken,
    checkToken,
    socketToken,
};