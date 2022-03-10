import { client } from './connection'

const insert = async (id_match, id_from, msg) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO messages (id_match, id_from, msg, date)
                VALUES ($1, $2, $3, NOW())`,
            [id_match, id_from, msg]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const select = async (id_match) => {
    let res;

    try {
        res = await client.query(
            `SELECT * FROM messages WHERE id_match=$1`,
            [id_match]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    if (res.rowCount === 0) return null;
    return res.rows;
}

export default {
    insert,
    select,
}