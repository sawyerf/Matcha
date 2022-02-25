const casual = require('casual').fr_FR;
import { client } from '../models/connection'

const generateUser = () => {
    const gender = ['H', 'F'];
    const sexuality = ['H', 'F', 'HF'];
    // const tags = ['#des', '#barres', '#de', '#rire', '#un', '#plaisir', '#constant'];

    const user = {
        'email': casual.email,
        'username': casual.username,
        'password': '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.',
        'birthday': casual.date('YYYY-MM-DD') + 'T00:00:00.000Z',
        'gender': gender[(Math.random() * 2) | 0],
        'sexuality': sexuality[(Math.random() * 3) | 0],
        'bio': casual.sentences,
        'popularity': (Math.random() * 100) | 0,
        'tags': ['#' + casual.word, '#' + casual.word, '#' + casual.word].join(),
        'latitude':  48.0 + Math.random(),
        'longitude': 2.0 + Math.random(),
        'isOK': true,
    };
    return user;
}

const addUser = async (newUser) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO users (email, username, password, birthday, gender, sexuality, bio, popularity, tags, latitude, longitude, isOK)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [newUser.email, newUser.username, newUser.password, newUser.birthday, newUser.gender, newUser.sexuality, newUser.bio, newUser.popularity, newUser.tags, newUser.latitude, newUser.longitude, newUser.isOK]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const main = async (max) => {
    let promise;
    for (let i = 0; i < max; i++) {
        promise = addUser(generateUser());
    }
    await promise;
    console.log('voila');

}

main(1000);