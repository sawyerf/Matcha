import bcrypt from 'bcrypt';

import userModels from '../models/user';
import { checkBody } from '../utils/checkBody';

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }
    return null;
}

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
            res.status(200).json({ 'token': 'des barres' });
        } else {
            res.status(200).json({ 'error': 1, 'message': 'Bad password' });
        }
    }
};

const register = async (req, res) => {
    console.log('req : ', req.body);
    const isCheck = checkBody({
        "email": "string",
        "username": "string",
        "password": "string",
        "age": 'number'
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

export default {
    login,
    register,
}