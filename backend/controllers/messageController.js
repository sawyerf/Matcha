import userModels from '../models/user';
import messageModels from '../models/message';
import matchModels from '../models/match';
import { checkBody } from '../utils/checkBody';

const sendMessage = async (socket, data) => {
    const isCheck = checkBody({
        'id_match': 'number',
        'username': 'string',
        'message': 'string'
    }, data);

    if (isCheck === false) {
        // res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const isExist = await matchModels.isExistId(data.id_match, socket.me.uid);
        if (isExist === null) {
            // res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (isExist === false) {
            socket.emit('error', 'You can\'t send a message to this person');
            // res.status(403).json({ 'error': 1, 'message': 'You can\'t send a message to this person' });
        } else {
            const isOK = await messageModels.insert(data.id_match, socket.me.uid, data.message);
            if (isOK === false) {
                // res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                socket.to(isExist.id_user1).emit('message', data.message);
                socket.to(isExist.id_user2).emit('message', data.message);
                // res.status(200).json();
            }
        }
    }
}

export default {
    sendMessage,
}