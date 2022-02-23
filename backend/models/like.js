import { client } from './connection'

const insert = async (id_liker, id_liked, like) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO likes (id_liker, id_liked, islike)
            VALUES ($1, $2, $3)`,
            [id_liker, id_liked, like]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const select = async (id_liker, id_liked) => {
    let res;
    try {
        res = await client.query(
            `SELECT * FROM likes WHERE id_liker=$1 AND id_liked=$2`,
            [id_liker, id_liked]
        );
    } catch (error) {
        console.log('error: ', error);
        return false;
    }
    if (res.rowCount == 0) {
        return null;
    }
    return res.rows[0];
}

const selectMyLiker = async (id_liked) => {
    let res;
    let ret = [];

    try {
        res = await client.query(
            `SELECT id_liker FROM likes WHERE id_liked=$1`,
            [id_liked]
        );
    } catch (error) {
        console.log('error: ', error);
        return false;
    }
    for (const liker of res.rows) {
        ret.push(liker.id_liker);
    }
    return ret;
}

const selectMyLike = async (id_liker) => {
    let res;
    let ret = [];

    try {
        res = await client.query(
            `SELECT id_liked FROM likes WHERE id_liker=$1`,
            [id_liker]
        );
    } catch (error) {
        console.log('error: ', error);
        return false;
    }
    for (const liker of res.rows) {
        ret.push(liker.id_liked);
    }
    return ret;
}

const isMatch = async (id_liker, id_liked) => {
    let res;
    try {
        res = await client.query(
            `SELECT * FROM likes WHERE (id_liker=$1 AND id_liked=$2) OR (id_liker=$2 AND id_liked=$1)`,
            [id_liker, id_liked]
        );
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
    console.log('isMatch: ', res.rowCount)
    if (res.rowCount == 2) {
        return true;
    } else {
        return false;
    }
}

const update = async (id_liker, id_liked, like) => {
    let res;
    try {
        res = await client.query(
            `UPDATE likes SET islike=$3 WHERE (id_liker=$1 AND id_liked=$2)`,
            [id_liker, id_liked, like]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true
}
export default {
    select,
    insert,
    update,
    isMatch,
    selectMyLiker,
    selectMyLike
}