import bcrypt from 'bcrypt';

import { checkBody } from '../utils/checkBody';
import { hashPassword } from '../utils/hash';
import { v4 as uuidv4 } from 'uuid';
import userModels from '../models/user';
import imgModels from '../models/image';
import user from '../models/user';

const setInfo = async (req, res) => {
    let ret;
    const isCheck = checkBody({
        'gender': 'string',
        'sexuality': 'sexuality',
        'tags': 'tags',
        'bio': 'string',
    }, req.body);
    if (isCheck == false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        ret = await userModels.setInfo(req.me.uid, req.body.gender, req.body.sexuality, req.body.tags, req.body.bio);
        if (ret == false) {
            res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
        } else {
            userModels.setIsOK(req.me.uid, true);
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
                const isOK = await userModels.updatePassword(req.me.uid, hashPass);
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

const addImage = async (req, res) => {
    const isCheck = checkBody({
        'image': 'string' // change to image
    }, req.body);

    if (isCheck === false) {
        res.status(400).json({ 'error': 1, 'message': 'Bad Content' });
    } else {
        if (req.me.images != null && req.me.images.length >= 5) {
            res.status(400).json({ 'error': 1, 'message': 'Too many Images' });
        } else {
            const id_img = uuidv4();
            let isOK = await imgModels.insert(id_img, req.me.uid, req.body.image);
            
            if (isOK === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                let images = req.me.images;
                if (images === null) {
                    images = [id_img];
                } else {
                    images.push(id_img)
                }
                isOK = await userModels.setVal(req.me.uid, 'images', images);
                if (isOK === false) {
                    res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
                } else {
                    res.status(200).json();
                }
            }
        }
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
            const ImgIsOK = await userModels.setVal(req.me.uid, 'images', req.me.images);
            const delIsOK = imgModels.del(req.body.id_image);
            if (ImgIsOK === false || delIsOK === false) {
                res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
            } else {
                res.status(200).json();
            }
        }
    }
}

export default {
    setInfo,
    changePassword,
    addImage,
    delImage,
}