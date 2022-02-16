import { checkBody } from '../utils/checkBody';
import likeModels from '../models/like.js';
import jwt from '../utils/jwt';

const like = async (req, res) => {
    console.log('req: ', req.body)
    const user = jwt.checkToken(req.cookies.token);
    if (user == false) res.status(403).json({ 'error': 1, 'message': 'Bad Token' })
    
    const isCheck = checkBody({
        'id_liked': 'string',
        'islike': 'boolean'
    }, req.body);
    if (isCheck == false) res.status(400).json({ 'error': 1, 'message': 'Bad Content' })

    if (user != false && ischeck != false) {
        let ret;
        const preLike = await likeModels.select(user.uid, req.body.id_liked);
        if (preLike === false) {
            res.status(404).json();
        } else {
            if (preLike === null) {
                ret = await likeModels.insert(user.uid, req.body.id_liked, req.body.islike);
            } else {
                ret = await likeModels.update(user.uid, req.body.id_liked, req.body.islike);
            }
            if (ret == false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' })
            } else {
                res.status(200).json();
            }
        }
    }
}

export default {
    like,
}