import userModels from '../models/user';
import messageModels from '../models/message';
import matchModels from '../models/match';
import { checkBody } from '../utils/checkBody';

const sendMessage = async (req, res) => {
    const isCheck = checkBody({
        'id_match': 'number',
        'message': 'string'
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const isExist = await matchModels.isExistId(req.body.id_match, req.me.uid);
        if (isExist === null) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (isExist === false) {
            res.status(403).json({ 'error': 1, 'message': 'You can\'t send a message to this person' });
        } else {
            const isOK = await messageModels.insert(req.body.id_match, req.me.uid, req.body.message);
            if (isOK === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                res.status(200).json();
            }
        }
    }
}

export default {
    sendMessage,
}