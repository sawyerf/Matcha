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
    // console.log(res.rows)
    if (res.rowCount == 0) {
        return null;
    }
    return res.rows;
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
    update
}