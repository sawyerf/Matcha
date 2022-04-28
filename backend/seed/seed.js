const casual = require('casual').fr_FR;
import { client } from '../models/connection';
import { hashPassword } from '../utils/hash';

const generateTags = (tags) => {
    let ret = [];

    for (const tag of tags) {
        if (((Math.random() * 3) | 0) % 3 === 0) {
            ret.push(tag);
        }
    }
    if (ret.length === 0) {
        ret.push(tags[(Math.random() * tags.length  - 1) | 0]);
    }
    return (ret.join());
}

const generateImage = () => {
    const images = [
        'https://images.unsplash.com/photo-1647144121201-ca19d1573288?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
        'https://images.unsplash.com/photo-1647220882982-cdcae89a93d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=788&q=80',
        'https://images.unsplash.com/photo-1647181322489-db4580f968af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8dG93SlpGc2twR2d8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1646734035877-4230056cea09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1646734035873-a42ce4d5b9c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        'https://images.unsplash.com/photo-1646916069913-31705711bb91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1646963558425-8ac585f362cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1646951535217-b6f5874a74e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    ];

    return images[(Math.random() * images.length) | 0];
}
const generateUser = (hash) => {
    const gender = ['H', 'F'];
    const sexuality = ['H', 'F', 'HF'];
    const tags = ['#music', '#voyage', '#cuisine', '#sport', '#fitness', '#poney', '#programmation', '#gaming', '#danse']
    const username = casual.username

    const user = {
        'email': `${username}@matcha.fr`,
        'username': username,
        'firstname': casual.first_name,
        'lastname': casual.last_name,
        'password': hash,
        'birthday': casual.date('YYYY-MM-DD') + 'T00:00:00.000Z',
        'gender': gender[(Math.random() * 2) | 0],
        'sexuality': sexuality[(Math.random() * 3) | 0],
        'bio': casual.sentences(),
        'popularity': (Math.random() * 100) | 0,
        'tags': generateTags(tags),
        'latitude':  48.0 + Math.random(),
        'longitude': 2.0 + Math.random(),
        'isOK': true,
        'images': [generateImage(), generateImage()],
        'validmail': true,
        'keymail': `fake_${username}_keymail`,
        'keypass': `fake_${username}_keymail`,
    };
    return user;
}

const addUser = async (newUser) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO users (email, username, firstname, lastname, password, birthday, gender, sexuality, bio, popularity, tags, latitude, longitude, isOK, validmail, images, keymail, keypass)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
            [newUser.email, newUser.username, newUser.firstname, newUser.lastname, newUser.password, newUser.birthday, newUser.gender, newUser.sexuality, newUser.bio, newUser.popularity, newUser.tags, newUser.latitude, newUser.longitude, newUser.isOK, newUser.validmail, newUser.images, newUser.keymail, newUser.keypass]
        );
    } catch (error) {
        // console.log(error);
        return false;
    }
    return true;
}

const main = async (max) => {
    let promise;
    const hash = '$2b$10$hKlJQ1XgNlLlG6wefeR34.lXCUWKbSeD5h8Ba2/SUQnr.m1MK098W'; //await hashPassword('Password*0');

    for (let i = 0; i < max; i++) {
        promise = addUser(generateUser(hash));
    }
    await promise;
    console.log('voila');

}

main(1000);