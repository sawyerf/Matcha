import { client } from './connection';

const insert = async (uid, type, content, msg_from) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO notifs (id_user, type, content, msg_from, date)
                VALUES ($1, $2, $3, $4, NOW())`,
            [uid, type, content, msg_from]
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

const delMessage = async (uid, msg_from) => {
    let res;
    try {
        res = await client.query(
            `DELETE FROM notifs
                WHERE (id_user=$1 AND type=$2 AND msg_from=$3)`,
            [uid, "message", msg_from]
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
    del,
    delMessage,
}