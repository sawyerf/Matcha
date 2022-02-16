import jwt from 'jsonwebtoken';

require('dotenv').config();

const createToken = (uid, username, email) => {
    const token = jwt.sign({
        'uid': uid,
        'username': username,
        'email': email, 
        'iat': Date.now()
    }, process.env.JWT_SECRET);
    return token;
}

const checkToken = (token) => {
    let verified;
    try {
        verified = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return false;
    }
    return verified;
}

export default {
    createToken,
    checkToken
};