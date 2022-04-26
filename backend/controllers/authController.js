import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

import userModels from '../models/user';
import { hashPassword } from '../utils/hash';
import { checkBody } from '../utils/checkBody';
import jwt from '../utils/jwt';
import { sendmail } from '../utils/mail';

require('dotenv').config();

const login = async (req, res) => {
    const isCheck = checkBody({
        'username': 'string',
        'password': 'string'
    }, req.body);
    if (isCheck === false) {
        res.status(401).json({ 'error': 1, 'message': 'Bad Content' })
    } else {
        const user = await userModels.selectBy('username', req.body.username);
        if (user === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (user == null) {
            res.status(404).json({ 'error': 1, 'message': 'User not found' });
        } else {
            try {
                const hashPass = await bcrypt.compare(req.body.password, user.password);
                if (hashPass == true) {
                    const jwtToken = jwt.createToken(user.uid, user.username, user.email);
                    const DateNow = Date.now();
                    const isOK = await userModels.setVal(user.uid, 'last_visit', new Date(DateNow).toISOString());
                    if (isOK === false) {
                        res.status(400).json({ 'error': 1, 'message': 'SQL Error' });
                    } else {
                        res.cookie('token', jwtToken);
                        res.status(200).json({ 'token': jwtToken });
                    }
                } else {
                    res.status(401).json({ 'error': 1, 'message': 'Bad password' });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ 'error': 1, 'message': 'Error hash' });
            }
        }
    }
};

const calcAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const register = async (req, res) => {
    const isCheck = checkBody({
        'email': 'email',
        'username': 'string',
        'password': 'password',
        'age': 'date',
        'firstname': 'string',
        'lastname': 'string',
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' })
    } else if (calcAge(req.body.age) < 18) {
        res.status(200).json({ 'error': 1, 'message': 'You must be 18yo' });
    } else {
        const isExist = await userModels.exist(req.body.email, req.body.username);
        if (isExist == null) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (isExist === true) {
            res.status(200).json({ 'error': 1, 'message': 'Email or Username is already use' });
        } else {
            const hashPass = await hashPassword(req.body.password);
            if (hashPass == null) {
                res.status(500).json({ 'error': 1, 'message': 'Error hash' });
            } else {
                const keymail = uuidv4();
                const keypass = uuidv4();
                const ret = await userModels.insert(
                    req.body.email,
                    req.body.username,
                    hashPass,
                    req.body.age,
                    keymail,
                    keypass,
                    req.body.firstname,
                    req.body.lastname
                );
                if (ret === true) {
                    sendmail(req.body.email,
                        'Welcome ' + req.body.username,
                        `Hi ${req.body.username},\n${process.env.HOST}/api/no/validmail/${keymail}\nBye !`);
                    res.status(201).json();
                } else {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                }
            }
        }
    }
};

const check = async (req, res) => {
    console.log('req : ', req.body);
    console.log('cookies: ', req.cookies);
    const isConnect = jwt.checkToken(req.cookies.token);
    if (isConnect === false) console.log('Bad Token');
    res.status(200).json(isConnect);
}

export default {
    login,
    register,
    check
}