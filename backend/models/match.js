import { client } from './connection'

const insert = async (uid1, uid2) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO matchs (id_user1, id_user2)
                VALUES ($1, $2)`,
            [uid1, uid2]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const isExist = async (uid1, uid2) => {
    let res;
    try {
        res = await client.query(
            `SELECT * FROM matchs
                WHERE (id_user1=$1 AND id_user2=$2) OR (id_user1=$2 AND id_user2=$1)`,
            [uid1, uid2]
        );
    } catch (error) {
        console.log(error);
        return null;
    }
    if (res.rowCount == 0) {
        return false;
    }
    return res.rows[0];
}

const isExistId = async (id_match, id_user) => {
    let res;
    try {
        res = await client.query(
            `SELECT * FROM matchs
                WHERE uid=$1 AND (id_user1=$2 OR id_user2=$2)`,
            [id_match, id_user]
        );
    } catch (error) {
        console.log(error);
        return null;
    }
    if (res.rowCount == 0) {
        return false;
    }
    return true;
}

const selectByUser = async (uid) => {
    let res;
    let ret = [];

    try {
        res = await client.query(
            `SELECT id_user1, id_user2 FROM matchs
                WHERE id_user1=$1 OR id_user2=$1`,
            [uid]
        );
    } catch (error) {
        console.log(error);
        return null;
    }
    for (const match of res.rows) {
        if (uid != match.id_user1) {
            ret.push(match.id_user1);
        } else if (uid != match.id_user2) {
            ret.push(match.id_user2);
        }
    }
    console.log(ret)
    return ret;
}

export default {
    insert,
    isExist,
    selectByUser,
    isExistId,
}