import { checkBody } from '../utils/checkBody';
import matchModels from '../models/match';
import userModels from '../models/user'
import jwt from '../utils/jwt';

const matchs = async (req, res) => {
    // const isCheck = checkBody({
    // }, req.body);
    // if (isCheck == false) res.status(400).json({ 'error': 1, 'message': 'Bad Content' })

    const user = jwt.checkToken(req.cookies.token);
    const uidMatchs = await matchModels.selectByUser(user.uid);
    if (uidMatchs == null) {
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else {
        const matchs = await userModels.selectByUids(uidMatchs);
        console.log(matchs);
        if (matchs == null) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            res.status(200).json(matchs)
        }
    }
}



export default {
    matchs
}