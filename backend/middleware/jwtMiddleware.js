import jwt from '../utils/jwt';
import userModels from '../models/user';

export const jwtMiddleware = async (req, res, next) => {
    console.log(req.headers.authorization);
    const user = jwt.checkToken(req.headers.authorization);

    if (user == false) {
        res.status(403).json({ 'error': 1, 'message': 'Bad Token' })
    } else if ((Date.now() - user.iat) / 1000 > 3600 * 24) {
        res.status(403).json({ 'error': 1, 'message': 'Token expire' })
    } else {
        const me = await userModels.selectMe(user.uid);

        if (me === false) {
            res.status(400).json({ 'error': 1, 'message': 'SQL Error' })
        } else if (me === null) {
            res.status(404).json({ 'error': 1, 'message': 'User Not Found' })
        } else {
            req.me = me;
            const DateNow = Date.now();
            const isOK = await userModels.setVal(me.uid, 'last_visit', new Date(DateNow).toISOString());
            if (isOK === false) {
                res.status(400).json({ 'error': 1, 'message': 'SQL Error' })
            } else {
                next();
            }
        }
    }
}