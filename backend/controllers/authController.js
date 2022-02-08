import userModels from '../models/user';
import { hashPassword } from '../utils/hash';
import { checkBody } from '../utils/checkBody';
import jwt from '../utils/jwt';

const login = async (req, res) => {
    console.log('req : ', req.body);
    const isCheck = checkBody({
        'username': 'string',
        'password': 'string'
    }, req.body);
    if (isCheck == false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content'})
        return
    }

    const user = await userModels.selectUser(req.body.username);
    if (user == false) {
        res.status(500);
    } else if (user == null) {
        res.status(200).json({ 'error': 1, 'message': 'User not found' });
    } else {
        let hashPass;
        try {
            hashPass = await bcrypt.compare(req.body.password, user.password);
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'error': 1, 'message': 'Error hash' });
            return
        }
        if (hashPass == true) {
            const jwtToken = jwt.createToken(user.username, user.email);
            res.cookie('token', jwtToken)
            res.status(200).json({ 'token': jwtToken });
        } else {
            res.status(200).json({ 'error': 1, 'message': 'Bad password' });
        }
    }
};

const register = async (req, res) => {
    console.log('req : ', req.body);
    const isCheck = checkBody({
        "email": "email",
        "username": "string",
        "password": "password",
        "age": 'date'
    }, req.body);
    if (isCheck == false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content'})
        return
    }

    const isExist = await userModels.existUser(req.body.email, req.body.username);
    if (isExist == true) {
        res.status(200).json({ 'error': 1, 'message': 'Email or Username is already use' });
    } else {
        const hashPass = await hashPassword(req.body.password);
        if (hashPass == null) {
            res.status(500).json({ 'error': 1, 'message': 'Error hash' });
        } else {
            userModels.insertUser(
                req.body.email,
                req.body.username,
                hashPass,
                req.body.age
            );
            res.status(201).json();
        }
    }
};

const check = async (req, res) => {
    console.log('req : ', req.body);
    console.log('cookies: ', req.cookies);
    const isConnect = jwt.checkToken(req.cookies.token);
    if (isConnect == false) console.log('Bad Token');
    res.status(200).json(isConnect);
}

export default {
    login,
    register,
    check
}