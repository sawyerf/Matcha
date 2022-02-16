import { checkBody } from '../utils/checkBody';
import likeModels from '../models/like.js';
import jwt from '../utils/jwt';

const like = async (req, res) => {
    let ret;

    console.log('req: ', req.body)
    const isCheck = checkBody({
        'id_liked': 'string',
        'islike': 'boolean'
    }, req.body);
    if (isCheck == false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content'})
        return
    }
    const user = jwt.checkToken(req.cookies.token);
    if (user == false) {
        res.status(403).json({ 'error': 1, 'message': 'Bad Token'})
        return
    }
    const preLike = await likeModels.select(user.uid, req.body.id_liked);
    // console.log('prelike: ', preLike, preLike == [], typeof preLike)
    if (preLike === false) {
        console.log('ouff')
        res.status(404).json();
        return
    } else if (preLike === null) {
        console.log('des barres')
        ret = await likeModels.insert(user.uid, req.body.id_liked, req.body.islike);
        if (ret == false) {
            res.status(500).json({'error': 1, 'message': 'SQL Error'})
            return
        }
    } else {
        console.log('ah ouai')
        ret = await likeModels.update(user.uid, req.body.id_liked, req.body.islike);
        if (ret == false) {
            res.status(500).json({'error': 1, 'message': 'SQL Error'})
            return
        }
    }
    res.status(200).json();
}

export default {
    like,
}