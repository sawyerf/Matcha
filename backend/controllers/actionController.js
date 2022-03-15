import { checkBody } from '../utils/checkBody';
import likeModels from '../models/like.js';
import matchModels from '../models/match.js';
import userModels from '../models/user.js';
import blockModels from '../models/block';
import reportModels from '../models/report';

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

const like = async (req, res) => {
    const isCheck = checkBody({
        'username': 'string',
        'islike': 'boolean'
    }, req.body);

    if (isCheck === false || req.me.username == req.body.username) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' })
    } else {
        const liked = await userModels.selectBy('username', req.body.username);
        if (liked === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (like === null) {
            res.status(404).json({ 'error': 1, 'message': 'Username not found' });
        } else {
            const preLike = await likeModels.select(req.me.uid, liked.uid);
            if (preLike === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                let ret;
                if (preLike === null) {
                    ret = await likeModels.insert(req.me.uid, liked.uid, req.body.islike);
                } else if (preLike.islike != req.body.islike) {
                    ret = await likeModels.update(req.me.uid, liked.uid, req.body.islike);
                } else {
                    ret = true;
                }
                if (ret === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    if (req.body.islike == true) {
                        await match(req, res, req.me, liked);
                    } else {
                        res.status(200).json();
                    }
                }
            }
        }
    }
}

const report = async (req, res) => {
    const isCheck = checkBody({
        'username': 'string',
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const reported = await userModels.selectBy('username', req.body.username);
        if (reported === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (reported == null) {
            res.status(404).json({ 'error': 1, 'message': 'User not found' });
        } else {
            const isExist = await reportModels.isExist(req.me.uid, reported.uid);
            const blockExist = await blockModels.isExist(req.me.uid, reported.uid);
            if (isExist === null || blockExist === null) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else if (isExist == true) {
                res.status(200).json({ 'message': 'Already reported' });
            } else {
                const isAdd = await reportModels.insert(req.me.uid, reported.uid);
                let blockAdd = true;
                if (blockExist === false) blockAdd = await blockModels.insert(req.me.uid, reported.uid);
                if (isAdd === false || blockAdd === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    res.status(200).json();
                }
            }
        }
    }
}

const block = async (req, res) => {
    const isCheck = checkBody({
        'username': 'string',
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const blocked = await userModels.selectBy('username', req.body.username);
        if (blocked === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (blocked == null) {
            res.status(404).json({ 'error': 1, 'message': 'User not found' });
        } else {
            const isExist = await blockModels.isExist(req.me.uid, blocked.uid);
            if (isExist === null) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else if (isExist == true) {
                res.status(200).json({ 'message': 'Already Blocked' });
            } else {
                const isAdd = await blockModels.insert(req.me.uid, blocked.uid);
                if (isAdd === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    res.status(200).json();
                }
            }
        }
    }
}

export default {
    like,
    report,
    block,
}