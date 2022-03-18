import bcrypt from 'bcrypt';

import { checkBody } from '../utils/checkBody';
import { hashPassword } from '../utils/hash';
import { v4 as uuidv4 } from 'uuid';
import userModels from '../models/user';
import imgModels from '../models/image';
import { sendmail } from '../utils/mail';
import { checkProfilUid } from '../utils/chekProfil';

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
                    `Hi ${req.me.username},\nhttp://localhost:3000/profil/validmail/${keymail}\nBye !`
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
        const id_img = uuidv4();
        file.mv(__dirname +  '/pictures/')
        // let isOK = await imgModels.insert(id_img, req.me.uid, file.data);
        // if (isOK === false) {
        //     res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        // } else {
        //     let images = req.me.images;
        //     if (images === null) {
        //         images = [id_img];
        //     } else {
        //         images.push(id_img)
        //     }
        //     isOK = await userModels.setVal(req.me.uid, 'images', images);
        //     if (isOK === false) {
        //         res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        //     } else {
        //         checkProfilUid(req.me.uid);
        //         res.status(200).json();
        //     }
        // }
    }
}

const delImage = async (req, res) => {
    const isCheck = checkBody({
        'id_image': 'uid'
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else if (req.me.images === null) {
        res.status(404).json({ 'error': 1, 'message': 'No Image' });
    } else {
        const index = req.me.images.indexOf(req.body.id_image);
        if (index == -1) {
            res.status(404).json({ 'error': 1, 'message': 'Image not found' });
        } else {
            req.me.images.splice(index, 1);
            const ImgIsOK = userModels.setVal(req.me.uid, 'images', req.me.images);
            const delIsOK = imgModels.del(req.body.id_image);
            if (await ImgIsOK === false || await delIsOK === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                checkProfilUid(req.me.uid);
                res.status(200).json();
            }
        }
    }
}

const me = async (req, res) => {
    delete req.me.password;
    delete req.me.validmail;
    delete req.me.uid;
    res.status(200).json(req.me);
}

export default {
    setInfo,
    changePassword,
    addImage,
    delImage,
    changeMail,
    me,
}