import { checkBody } from '../utils/checkBody';
import likeModels from '../models/like.js';
import matchModels from '../models/match.js';
import jwt from '../utils/jwt';

const match = async (req, res, user) => {
    let ret;
    
    const isMatch = await likeModels.isMatch(user.uid, req.body.id_liked);
    if (isMatch == null) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else if (isMatch == false) {
        res.status(200).json({'match': false});
    } else if (isMatch == true) {
        const isMatchExist = await matchModels.isExist(user.uid, req.body.id_liked);
        if (isMatchExist == null) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (isMatchExist == false) {
            ret = await matchModels.insert(user.uid, req.body.id_liked);
            if (ret == false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else if (ret == true) {
                res.status(200).json({'match': true});
            }
        } else if (isMatchExist == true) {
            res.status(200).json({'match': true});
        }
    }
}

const like = async (req, res) => {
    console.log('req: ', req.body)
    const user = jwt.checkToken(req.cookies.token);
    if (user == false) res.status(403).json({ 'error': 1, 'message': 'Bad Token' })

    const isCheck = checkBody({
        'id_liked': 'string',
        'islike': 'boolean'
    }, req.body);
    if (isCheck == false) res.status(400).json({ 'error': 1, 'message': 'Bad Content' })

    if (user != false && isCheck != false) {
        let ret;
        const preLike = await likeModels.select(user.uid, req.body.id_liked);
        if (preLike === false) {
            res.status(404).json();
        } else {
            if (preLike === null) {
                ret = await likeModels.insert(user.uid, req.body.id_liked, req.body.islike);
            } else if (preLike.islike != req.body.islike) {
                ret = await likeModels.update(user.uid, req.body.id_liked, req.body.islike);
            } else {
                ret = true
            }
            if (ret == false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' })
            } else {
                if (req.body.islike == true) {
                    await match(req, res, user);
                } else {
                    res.status(200).json();
                }
            }
        }
    }
}

export default {
    like,
}