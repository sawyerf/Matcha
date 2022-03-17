import userModels from '../models/user';
import messageModels from '../models/message';
import matchModels from '../models/match';
import { checkBody } from '../utils/checkBody';

const sendMessage = async (socket, data) => {
    const isCheck = checkBody({
        'username': 'string',
        'message': 'string'
    }, data);

    if (isCheck === false) {
        // res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const user = await userModels.selectBy('username', data.username);
        if (user === false) {
            // res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (user === null) {
            // res.status(403).json({ 'error': 1, 'message': 'User not found' });
        } else {
            const isExist = await matchModels.isExist(socket.me.uid, user.uid);
            if (isExist === null) {
                // res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else if (isExist === false) {
                socket.emit('error', 'You can\'t send a message to this person');
                // res.status(403).json({ 'error': 1, 'message': 'You can\'t send a message to this person' });
            } else {
                const isOK = await messageModels.insert(socket.me.uid, user.uid, data.message);
                if (isOK === false) {
                    // res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    global.io.sockets.to(socket.me.uid).to(user.uid).emit('message', { id_match: data.id_match, username: socket.me.username, msg: data.message });
                }
            }
        }
    }
}

const roomMessage = async (req, res) => {
    const isCheck = checkBody({
        'username': 'string',
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const user = await userModels.selectBy('username', req.body.username);
        if (user === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (user === null) {
            res.status(404).json({ 'error': 1, 'message': 'User not found' });
        } else {
            const isExist = await matchModels.isExist(req.me.uid, user.uid);
            if (isExist === null) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else if (isExist === false) {
                res.status(403).json({ 'error': 1, 'message': 'You are not authorize to see this message' });
            } else {
                const messages = await messageModels.select(req.me.uid, user.uid);
                if (messages === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    for (const msg of messages) {
                        if (msg.id_from === req.me.uid) {
                            msg.from = req.me.username;
                            msg.to = user.username;
                        } else {
                            msg.to = req.me.username;
                            msg.from = user.username;
                        }
                        delete msg.id_from;
                        delete msg.id_to;
                        delete msg.id_match;
                    }
                    res.status(200).json(messages);
                }
            }
        }
    }
}

export default {
    sendMessage,
    roomMessage,
}