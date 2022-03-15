import { checkBody } from '../utils/checkBody';
import matchModels from '../models/match';
import userModels from '../models/user';
import likeModels from '../models/like';
import blockModels from '../models/block';
import reportModels from '../models/report';
import imgModels from '../models/image';
import historyModels from '../models/history';
import { scoreMatch } from '../utils/score';
import { locationByIp, distance } from '../utils/location';

const matchs = async (req, res) => {
    const uidMatchs = await matchModels.selectByUser(req.me.uid);

    if (uidMatchs == null) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else {
        const matchs = await userModels.selectByUids(uidMatchs);
        if (matchs == null) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            // for (const match of matchs) {
            //     const images = await imgModels.select(match.uid);
            //     if (images === false) {
            //         return res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            //     }
            //     if (images.length === 0) {
            //         match.image = [];
            //     } else {
            //         match.image = images[0];
            //     }
            // }
            res.status(200).json(matchs);
        }
    }
}

const likes = async (req, res) => {
    const uidsMyLiker = await likeModels.selectMyLiker(req.me.uid);

    if (uidsMyLiker === false) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else {
        const myLiker = await userModels.selectByUids(uidsMyLiker);
        if (myLiker == null) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            // for (const like of myLiker) {
            //     const images = await imgModels.select(like.uid);
            //     if (images === false) {
            //         return res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            //     }
            //     if (images.length === 0) {
            //         like.image = [];
            //     } else {
            //         like.image = images[0];
            //     }
            // }
            res.status(200).json(myLiker);
        }
    }
}

const offer = async (req, res) => {
    const offers = await userModels.selectOffer(req.me.uid, req.me.gender, req.me.sexuality);
    const likes = await likeModels.selectMyLike(req.me.uid);
    const blocks = await blockModels.selectBlocked(req.me.uid);
    let retOffers;

    if (offers === false || likes === false || blocks === false) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else {
        scoreMatch(req.me, offers);
        let index = 0;
        for (const offer of offers.sort((a, b) => { return b.score - a.score })) {
            if (likes.indexOf(offer.uid) == -1 && blocks.indexOf(offer.uid) == -1) {
                // const images = await imgModels.select(offer.uid);
                // if (images === false) {
                //     return res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                // }
                // offer.images = images;
                delete offer.uid
                retOffers = offer;
                index++
            }
            if (index >= 1) break;
        }
        res.status(200).json({
            // 'me': req.me, // To delete
            'offers': retOffers
        });
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

    if (isCheck == false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const users = await userModels.search(req.me.uid, req.me.gender, req.me.sexuality, req.body);
        const blocks = await blockModels.selectBlocked(req.me.uid);
        if (users === false || blocks === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            const newUsers = [];
            for (const ouser of users) {
                if (distance([req.me.latitude, req.me.longitude], [ouser.latitude, ouser.longitude]) > req.body.maxDistance) continue;
                const Tags = ouser.tags.split(',');
                let isIn = true;
                for (const tag of req.body.tags) {
                    if (Tags.indexOf(tag) < 0) {
                        isIn = false;
                        break;
                    }
                }
                if (isIn == true && blocks.indexOf(ouser.uid) == -1) {
                    // const images = await imgModels.select(ouser.uid);
                    // if (images === false) {
                    //     return res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                    // }
                    // ouser.images = images;
                    delete ouser['uid'];
                    newUsers.push(ouser);
                }
            }
            res.status(200).json(newUsers);
        }
    }
}

const visit = async (req, res) => {
    const isCheck = checkBody({
        'username': 'string',
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const user = await userModels.selectBy('username', req.body.username);
        if (user === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (user === null) {
            res.status(404).json({ 'error': 1, 'message': 'User not found' });
        } else {
            const isExist = await historyModels.isExist(req.me.uid, user.uid);
            if (isExist === null) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                let ret;
                const DateNow = new Date(Date.now()).toISOString();
                if (isExist === false) {
                    ret = await historyModels.insert(req.me.uid, user.uid, DateNow)
                } else {
                    ret = await historyModels.update(req.me.uid, user.uid, DateNow)
                }
                if (ret === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    res.status(200).json();
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
            if (isExist === null) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else if (isExist == true) {
                res.status(200).json({ 'message': 'Already reported' });
            } else {
                const isAdd = await reportModels.insert(req.me.uid, reported.uid);
                if (isAdd === false) {
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
    matchs,
    likes,
    offer,
    search,
    report,
    block,
    visit,
}