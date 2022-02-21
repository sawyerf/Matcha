import { checkBody } from '../utils/checkBody';
import matchModels from '../models/match';
import userModels from '../models/user'
import likeModels from '../models/like'
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

const offer = async (req, res) => {
    const user = jwt.checkToken(req.cookies.token);

    const me = await userModels.selectMe(user.uid);
    console.log('me: ', me)
    if (me == false) { 
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else {
        const offers = await userModels.selectOffer(me.gender, me.sexuality);
        console.log('offers', offers)
        if (offers === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            res.status(200).json(offers);
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

export default {
    matchs,
    likes,
    offer
}