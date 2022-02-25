import { checkBody } from '../utils/checkBody';
import likeModels from '../models/like.js';
import matchModels from '../models/match.js';
import userModels from '../models/user.js';
import jwt from '../utils/jwt';

const match = async (req, res, user, liked) => {
    let ret;

    const isMatch = await likeModels.isMatch(user.uid, liked.uid);
    if (isMatch == null) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else if (isMatch === false) {
        res.status(200).json({ 'match': false });
    } else if (isMatch === true) {
        const isMatchExist = await matchModels.isExist(user.uid, liked.uid);
        if (isMatchExist == null) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (isMatchExist === false) {
            ret = await matchModels.insert(user.uid, liked.uid);
            if (ret === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else if (ret === true) {
                res.status(200).json({ 'match': true });
            }
        } else if (isMatchExist === true) {
            res.status(200).json({ 'match': true });
        }
    }
}

// check if user exist (uid)

const like = async (req, res) => {
    const user = jwt.checkToken(req.cookies.token);
    const isCheck = checkBody({
        'username': 'string',
        'islike': 'boolean'
    }, req.body);

    if (isCheck === false || user.username == req.body.username) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' })
    } else {
        const liked = await userModels.selectByName(req.body.username);
        if (liked === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (like === null) {
            res.status(404).json({ 'error': 1, 'message': 'Username not found' });
        } else {
            const preLike = await likeModels.select(user.uid, liked.uid);
            if (preLike === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                let ret;
                if (preLike === null) {
                    ret = await likeModels.insert(user.uid, liked.uid, req.body.islike);
                } else if (preLike.islike != req.body.islike) {
                    ret = await likeModels.update(user.uid, liked.uid, req.body.islike);
                } else {
                    ret = true;
                }
                if (ret === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    if (req.body.islike == true) {
                        await match(req, res, user, liked);
                    } else {
                        res.status(200).json();
                    }
                }
            }
        }
    }
}

export default {
    like,
}