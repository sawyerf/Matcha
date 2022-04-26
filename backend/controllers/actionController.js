import { checkBody } from '../utils/checkBody';
import { sendNotif } from '../socket';
import likeModels from '../models/like.js';
import matchModels from '../models/match.js';
import userModels from '../models/user.js';
import blockModels from '../models/block';
import reportModels from '../models/report';
import historyModels from '../models/history';

const match = async (req, res, liked) => {
    let ret;

    const isMatch = await likeModels.isMatch(req.me.uid, liked.uid);
    if (isMatch == null) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else if (isMatch === false) {
        sendNotif([liked.uid], 'notif', {act: 'like', username: req.me.username, msg:`${req.me.username} like you`});
        res.status(200).json({ 'match': false });
    } else if (isMatch === true) {
        const isMatchExist = await matchModels.isExist(req.me.uid, liked.uid);
        if (isMatchExist == null) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (isMatchExist === false) {
            ret = await matchModels.insert(req.me.uid, liked.uid);
            if (ret === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else if (ret === true) {
                sendNotif([liked.uid], 'notif', {act: 'match', username: req.me.username, msg:`You match with ${req.me.username}`});
                sendNotif([req.me.uid], 'notif', {act: 'match', username: liked.username, msg:`You match with ${liked.username}`});
                res.status(200).json({ 'match': true });
            }
        } else if (isMatchExist === true) {
            res.status(200).json({ 'match': true });
        }
    }
}

const unmatch = async (req, res, liked) => {
    const isMatchExist = await matchModels.isExist(req.me.uid, liked.uid);
    if (isMatchExist == null) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else if (isMatchExist === false) {
        res.status(200).json();
    } else {
        const isOK = await matchModels.del(req.me.uid, liked.uid);
        if (isOK === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            sendNotif([liked.uid], 'notif', {act: 'unmatch', username: req.me.username, msg:`You unmatch with ${req.me.username}`});
            res.status(200).json({ 'match': false });
        }
    }
}

const caculatePopularity = async (user) => {
    const likesOther = await likeModels.selectMyJudge(user.uid);

    if (likesOther !== false) {
        let likes = {dislike: 0, like: 0};
        for (const like of likesOther) {
            if (like.islike === true) {
                likes.like++;
            } else {
                likes.dislike++;
            }
        }
        const popularity = (likes.like * 100) / (likes.like + likes.dislike);
        userModels.setVal(user.uid, 'popularity', popularity.toFixed(0));
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
                    return res.status(200).json();
                }
                if (ret === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    caculatePopularity(liked);
                    if (req.body.islike == true) {
                        await match(req, res, liked);
                    } else {
                        await unmatch(req, res, liked);
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
                await likeModels.del(req.me.uid, reported.uid);
                await matchModels.del(req.me.uid, reported.uid);
                await historyModels.del(req.me.uid, reported.uid);
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
                await likeModels.del(req.me.uid, blocked.uid);
                await matchModels.del(req.me.uid, blocked.uid);
                await historyModels.del(req.me.uid, blocked.uid);
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