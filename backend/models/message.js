import { client } from './connection'

const insert = async (id_from, id_to, msg) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO messages (id_from, id_to, msg, date)
                VALUES ($1, $2, $3, NOW())`,
            [id_from, id_to, msg]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const select = async (uid1, uid2) => {
    let res;

    try {
        res = await client.query(
            `SELECT * FROM messages
            WHERE (id_to=$1 AND id_from=$2) OR (id_to=$2 AND id_from=$1)`,
            [uid1, uid2]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return res.rows;
}
const selectLast = async (uid1, uid2) => {
    let res;

    try {
        res = await client.query(
            `SELECT * FROM messages
            WHERE (id_to=$1 AND id_from=$2) OR (id_to=$2 AND id_from=$1)
            ORDER BY date DESC LIMIT 1;`,
            [uid1, uid2]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    if (res.rowCount == 0) return null;
    return res.rows[0];
}

export default {
    insert,
    select,
    selectLast,
}