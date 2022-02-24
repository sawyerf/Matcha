import { checkBody } from '../utils/checkBody';
import matchModels from '../models/match';
import userModels from '../models/user';
import likeModels from '../models/like';
import blockModels from  '../models/block';
import reportModels from '../models/report';
import { scoreMatch } from '../utils/score';
import jwt from '../utils/jwt';
import { locationByIp, distance } from '../utils/location';

const matchs = async (req, res) => {
    const user = jwt.checkToken(req.cookies.token);
    const uidMatchs = await matchModels.selectByUser(user.uid);

    if (uidMatchs == null) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else {
        const matchs = await userModels.selectByUids(uidMatchs);
        if (matchs == null) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            res.status(200).json(matchs);
        }
    }
}

const likes = async (req, res) => {
    const user = jwt.checkToken(req.cookies.token);
    const uidsMyLiker = await likeModels.selectMyLiker(user.uid);

    if (uidsMyLiker === false) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else {
        const myLiker = await userModels.selectByUids(uidsMyLiker);
        if (myLiker == null) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            res.status(200).json(myLiker);
        }
    }
}

const offer = async (req, res) => {
    const user = jwt.checkToken(req.cookies.token);
    const me = await userModels.selectMe(user.uid);

    if (me == false) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else {
        const offers = await userModels.selectOffer(me.uid, me.gender, me.sexuality);
        const likes  = await likeModels.selectMyLike(me.uid);
        const blocks = await blockModels.selectBlocked(me.uid);
        if (offers === false || likes === false || blocks === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            scoreMatch(me, offers);
            let maxScore = 0;
            let retOffer = null;
            for (const offer of offers) {
                if (offer.score > maxScore && likes.indexOf(offer.uid) == -1 && blocks.indexOf(offer.uid) == -1) {
                    maxScore = offer.score;
                    retOffer = offer;
                }
            }
            res.status(200).json({
                'The Offer': retOffer,
                'offers': offers
            });
        }
    }
}

const search = async (req, res) => {
    const isCheck = checkBody({
        'minAge': 'number',
        'maxAge': 'number',
        'minPopularity': 'number',
        'maxPopularity': 'number',
        'maxDistance': 'number',
        'tags': 'object' // changer ca pour list
    }, req.body);
    const user = jwt.checkToken(req.cookies.token);
    const me = await userModels.selectMe(user.uid);
    // distance(locationByIp('82.64.133.36'),
    // locationByIp('80.215.207.91'));
    // console.log('me: ', me);
    if (isCheck == false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const users  = await userModels.search(me.uid, me.gender, me.sexuality, req.body);
        const blocks = await blockModels.selectBlocked(me.uid);
        if (users === false || blocks === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            const newUsers = [];
            for (const ouser of users) {
                if (distance([me.latitude, me.longitude], [ouser.latitude, ouser.longitude]) > req.body.maxDistance) continue;
                const Tags = ouser.tags.split(',');
                let isIn = true;
                for (const tag of req.body.tags) {
                    console.log(tag, Tags);
                    if (Tags.indexOf(tag) < 0) {
                        isIn = false;
                        break;
                    }
                }
                if (isIn == true && blocks.indexOf(ouser.uid) == -1) {
                    delete ouser['uid'];
                    newUsers.push(ouser);
                }
            }
            res.status(200).json(newUsers);
        }
    }
}

const report = async (req, res) => {
    const isCheck = checkBody({
        'username': 'string',
    }, req.body);
    const user = jwt.checkToken(req.cookies.token);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const reported = await userModels.selectByName(req.body.username);
        if (reported === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (reported == null) {
            res.status(404).json({ 'error': 1, 'message': 'User not found' });
        } else {
            const isExist = await reportModels.isExist(user.uid, reported.uid);
            if (isExist === null) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else if (isExist == true) {
                res.status(200).json({ 'message': 'Already reported' });
            } else {
                const isAdd = await reportModels.insert(user.uid, reported.uid);
                if (isAdd === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    res.status(200).json()
                }
            }
        }
    }
}

const block = async (req, res) => {
    const isCheck = checkBody({
        'username': 'string',
    }, req.body);
    const user = jwt.checkToken(req.cookies.token);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const blocked = await userModels.selectByName(req.body.username);
        if (blocked === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (blocked == null) {
            res.status(404).json({ 'error': 1, 'message': 'User not found' });
        } else {
            const isExist = await blockModels.isExist(user.uid, blocked.uid);
            if (isExist === null) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else if (isExist == true) {
                res.status(200).json({ 'message': 'Already Blocked' });
            } else {
                const isAdd = await blockModels.insert(user.uid, blocked.uid);
                if (isAdd === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    res.status(200).json()
                }
            }
        }
    }
}

export default {
    matchs,
    likes,
    offer,
    search,
    report,
    block
}