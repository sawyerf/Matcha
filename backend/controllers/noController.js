import userModels from '../models/user';
import { sendmail } from '../utils/mail';
import { checkBody } from '../utils/checkBody';
import { hashPassword } from '../utils/hash';
import { checkProfilUid } from '../utils/chekProfil';

require('dotenv').config();

const validMail = async (req, res) => {
    const user = await userModels.selectBy('keymail', req.params.key);

    if (user === false) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else if (user === null) {
        res.status(404).json({ 'error': 1, 'message': 'Key not good' });
    } else {
        const ret = await userModels.setVal(user.uid, 'validmail', true);
        if (ret === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            checkProfilUid(user.uid);
            res.redirect(301, `${process.env.HOST}`);
            // res.status(200).json();
        }
    }
}

// change keypass after
const resetPass = async (req, res) => {
    const isCheck = checkBody({
        'new_password': 'password'
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const user = await userModels.selectBy('keypass', req.params.key);
        if (user === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (user === null) {
            res.status(404).json({ 'error': 1, 'message': 'Key not good' });
        } else {
            const hashPass = await hashPassword(req.body.new_password);
            if (hashPass == null) {
                res.status(500).json({ 'error': 1, 'message': 'Error hash' });
            } else {
                const isOK = await userModels.setVal(user.uid, 'password', hashPass);
                if (isOK === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else if (isOK === true) {
                    res.status(200).json();
                }
            }
        }
    }
}

const askReset = async (req, res) => {
    const isCheck = checkBody({
        'email': 'email'
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const user = await userModels.selectBy('email', req.body.email);
        if (user === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (user === null) {
            res.status(404).json({ 'error': 1, 'message': 'Email not found' });
        } else {
            sendmail(req.body.email,
                'Reset Password',
                `Hello ${user.username}\nClick on the link to change your password\n${process.env.HOST}/no/resetpass/${user.keypass}\n`
            );
            res.status(200).json();
        }
    }
}

export default {
    validMail,
    resetPass,
    askReset
}