import bcrypt from 'bcrypt';

import { checkBody } from '../utils/checkBody';
import { hashPassword } from '../utils/hash';
import userModels from '../models/user';

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

const changePassword = async (req, res) => {
    const isCheck = checkBody({
        'old_password': 'password',
        'new_password': 'password'
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const ret = await bcrypt.compare(req.body.old_password, req.me.password);
        if (ret === true) {
            const hashPass = await hashPassword(req.body.new_password);
            if (hashPass == null) {
                res.status(500).json({ 'error': 1, 'message': 'Error hash' });
            } else {
                const isOK = await userModels.updatePassword(req.me.uid, hashPass);
                if (isOK === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else if (isOK === true) {
                    res.status(200).json();
                }
            }
        } else {
            res.status(200).json({ 'error': 1, 'message': 'Bad password' });
        }
    }
}

export default {
    setInfo,
    changePassword,
}