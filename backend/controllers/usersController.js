import { checkBody } from '../utils/checkBody';
import matchModels from '../models/match';
import userModels from '../models/user';
import likeModels from '../models/like';
import { scoreMatch } from '../utils/score';
import jwt from '../utils/jwt';

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
        if (offers === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            scoreMatch(me, offers);
            let maxScore = 0;
            let retOffer = null;
            for (const offer of offers) {
                if (offer.score > maxScore) {
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
        'localisation': 'string',
        'tags': 'object' // changer ca pour list
    }, req.body);
    const user = jwt.checkToken(req.cookies.token);
    const me = await userModels.selectMe(user.uid);
    console.log(me)
    if (isCheck == false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const users = await userModels.search(me.uid, me.gender, me.sexuality, req.body);
        console.log(users);
        res.status(200).json(users);
    }
}

export default {
    matchs,
    likes,
    offer,
    search
}