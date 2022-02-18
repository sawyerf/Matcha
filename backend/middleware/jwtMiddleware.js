import jwt from '../utils/jwt';

export const jwtMiddleware = (req, res, next) => {
    console.log('req: ', req.body)
    const user = jwt.checkToken(req.cookies.token);
    if (user == false) {
        res.status(403).json({ 'error': 1, 'message': 'Bad Token' })
    } else {
        next()
    }
    // ajoutez un temps max
}