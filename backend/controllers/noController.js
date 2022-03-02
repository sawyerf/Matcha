import userModels from '../models/user';

const validMail = async (req, res) => {
    const user = userModels.selectBy('keymail', req.params.key);
    if (user === false) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else if (user === null) {
        res.status(404).json({ 'error': 1, 'message': 'Key not good' });
    } else {
        const ret = userModels.setVal(user.uid, 'validmail', true);
        if (ret === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            res.status(200).json();
        }
    }
}

const resetPass = async (req, res) => {
    const isCheck = checkBody({
        'new_password': 'password'
    }, req.body);
    
    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
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
    }
}

const askReset = async (req, res) => {
    const isCheck = checkBody({
        'email': 'email'
    }, req.body);
    
    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        
    }
}

export default {
    validMail,
    resetPass,
    askReset
}