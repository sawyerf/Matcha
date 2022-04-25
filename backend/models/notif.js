import { client } from './connection';

const insert = async (uid, type, content) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO notifs (id_user, type, content, date)
                VALUES ($1, $2, $3, NOW())`,
            [uid, type, content]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const select = async (uid) => {
    let res;

    try {
        res = await client.query(
            `SELECT content, type, date FROM notifs
            WHERE (id_user=$1)`,
            [uid]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return res.rows;
}

const del = async (uid) => {
    let res;
    try {
        res = await client.query(
            `DELETE FROM notifs
                WHERE (id_user=$1)`,
            [uid]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

export default {
    insert,
    select,
    del
}