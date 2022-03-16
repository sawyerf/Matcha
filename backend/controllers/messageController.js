import userModels from '../models/user';
import messageModels from '../models/message';
import matchModels from '../models/match';
import { checkBody } from '../utils/checkBody';

const sendMessage = async (socket, data) => {
    const isCheck = checkBody({
        'id_match': 'number',
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
                global.io.sockets.to(isExist.id_user1).to(isExist.id_user2).emit('message', {id_match: data.id_match, msg: data.message});
            }
        }
    }
}

export default {
    sendMessage,
}