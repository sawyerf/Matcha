import { checkBody } from '../utils/checkBody';
import userModels from '../models/user';
import jwt from '../utils/jwt';

const setInfo = async (req, res) => {
    let ret;
    const isCheck = checkBody({
        'gender': 'string',
        'sexuality': 'sexuality',
        'tags': 'tags',
        'bio': 'string',
    }, req.body);
    if (isCheck == false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        ret = await userModels.setInfo(req.me.uid, req.body.gender, req.body.sexuality, req.body.tags, req.body.bio);
        if (ret == false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            userModels.setIsOK(req.me.uid, true);
            res.status(200).json();
        }
    }
}

export default {
    setInfo,
}