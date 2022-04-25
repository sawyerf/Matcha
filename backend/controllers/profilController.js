import bcrypt from 'bcrypt';

import { checkBody } from '../utils/checkBody';
import { hashPassword } from '../utils/hash';
import { v4 as uuidv4 } from 'uuid';
import userModels from '../models/user';
import notifModels from '../models/notif';
import { sendmail } from '../utils/mail';
import { checkProfilUid } from '../utils/chekProfil';
import { locationByIp } from '../utils/location';

require('dotenv').config();

const setInfo = async (req, res) => {
    let ret;
    const isCheck = checkBody({
        'gender': 'string',
        'sexuality': 'sexuality',
        'tags': 'tags',
        'bio': 'string',
        'firstname': 'string',
        'lastname': 'string',
    }, req.body);

    if (isCheck == false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        ret = await userModels.setInfo(req.me.uid, req.body.gender, req.body.sexuality, req.body.tags, req.body.bio, req.body.firstname, req.body.lastname);
        if (ret == false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            checkProfilUid(req.me.uid);
            res.status(200).json();
        }
    }
}

const changePassword = async (req, res) => {
    const isCheck = checkBody({
        'old_password': 'password',
        'new_password': 'password'
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const ret = await bcrypt.compare(req.body.old_password, req.me.password);
        if (ret === true) {
            const hashPass = await hashPassword(req.body.new_password);
            if (hashPass == null) {
                res.status(500).json({ 'error': 1, 'message': 'Error hash' });
            } else {
                const isOK = await userModels.setVal(req.me.uid, 'password', hashPass);
                if (isOK === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else if (isOK === true) {
                    res.status(200).json();
                }
            }
        } else {
            res.status(200).json({ 'error': 1, 'message': 'Bad password' });
        }
    }
}

const changeMail = async (req, res) => {
    const isCheck = checkBody({
        'new_mail': 'email'
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        const user = await userModels.selectBy('email', req.body.new_mail);
        if (user === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else if (user != null) {
            res.status(400).json({ 'error': 1, 'message': 'Email is already use' });
        } else {
            const keymail = uuidv4();
            const isOK = await userModels.updateMail(req.me.uid, req.body.new_mail, keymail);
            if (isOK === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                sendmail(req.me.email,
                    'Welcome ' + req.me.username,
                    `Hi ${req.me.username},\n${process.env.HOST}/profil/validmail/${keymail}\nBye !`
                );
                checkProfilUid(req.me.uid);
                res.status(200).json();
            }
        }
    }
}

const addImage = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({ 'error': 1, 'message': 'No files were uploaded' });
    } else if (req.me.images != null && req.me.images.length >= 5) {
        res.status(400).json({ 'error': 1, 'message': 'Too many Images' });
    } else {
        const { file } = req.files;
        const type_accept = ['image/jpeg', 'image/png'];
        const type = { 'image/jpeg': '.jpg', 'image/png': '.png' }
        if (type_accept.indexOf(file.mimetype) == -1) {
            res.status(400).json({ 'error': 1, 'message': 'Type of the file not accept' });
        } else {
            const name_file = file.md5 + type[file.mimetype];

            try {
                await file.mv(__dirname + '/../uploads/' + name_file);
            } catch {
                return res.status(400).json({ 'error': 1, 'message': 'Image not Upload' });
            }
            let images = req.me.images;
            if (images === null) images = [];
            images.push(`${process.env.HOST}/images/${name_file}`);
            const isOK = await userModels.setVal(req.me.uid, 'images', images);
            if (isOK === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                checkProfilUid(req.me.uid);
                res.status(200).json({ image: `${process.env.HOST}/images/${name_file}` });
            }
        }
    }
}

const delImage = async (req, res) => {
    const isCheck = checkBody({
        'image': 'string'
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else if (req.me.images === null) {
        res.status(404).json({ 'error': 1, 'message': 'No Image' });
    } else {
        const index = req.me.images.indexOf(req.body.image);
        if (index == -1) {
            res.status(404).json({ 'error': 1, 'message': 'Image not found' });
        } else {
            req.me.images.splice(index, 1);
            const ImgIsOK = userModels.setVal(req.me.uid, 'images', req.me.images);
            if (await ImgIsOK === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                checkProfilUid(req.me.uid);
                res.status(200).json();
            }
        }
    }
}

const setLocation = async (req, res) => {
    const isCheck = checkBody({
        'latitude': 'number',
        'longitude': 'number'
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        if (req.body.latitude === 0.0 && req.body.longitude === 0.0) {
            [req.body.latitude, req.body.longitude] = locationByIp('62.210.32.247');
        }
        console.log(req.me.uid, req.body.latitude, req.body.longitude)
        const isOK = userModels.setLocation(req.me.uid, req.body.latitude, req.body.longitude);
        if (isOK === false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            res.status(200).json();
        }
    }
}

const me = async (req, res) => {
    const notifs = await notifModels.select(req.me.uid);

    if (notifs !== false) {
        req.me.notifs = notifs;
        for (const notif of req.me.notifs) {
            notif.content = JSON.parse(notif.content)
        }
    }
    delete req.me.password;
    delete req.me.validmail;
    delete req.me.uid;
    res.status(200).json(req.me);
}

const readNotif = async (req, res) => {
    notifModels.del(req.me.uid);
    res.status(200).json();
}

export default {
    setInfo,
    changePassword,
    addImage,
    delImage,
    changeMail,
    setLocation,
    me,
    readNotif,
}