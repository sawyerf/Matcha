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
    return true;
}

export default {
    insert,
    isExist
}