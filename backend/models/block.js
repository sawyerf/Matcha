import { client } from './connection'

const insert = async (id_blocker, id_blocked) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO blocks (id_blocker, id_blocked)
            VALUES ($1, $2)`,
            [id_blocker, id_blocked]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const isExist = async (id_blocker, id_blocked) => {
    let res;
    try {
        res = await client.query(
            `SELECT id_blocker FROM blocks WHERE id_blocker=$1 AND id_blocked=$2`,
            [id_blocker, id_blocked]
        );
    } catch (error) {
        console.log(error);
        return null;
    }
    if (res.rowCount == 0) {
        return false;
    } else {
        return true;
    }
}

const selectBlocker = async (uid) => {
    let res;
    let blocks = [];

    try {
        res = await client.query(
            `SELECT id_blocker FROM blocks WHERE id_blocked=$1`,
            [uid]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    for (const block of res.rows) {
        blocks.push(block.id_blocker);
    }
    return blocks;
}

const selectBlocked = async (uid) => {
    let res;
    let blocks = [];

    try {
        res = await client.query(
            `SELECT id_blocked FROM blocks WHERE id_blocker=$1`,
            [uid]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    for (const block of res.rows) {
        blocks.push(block.id_blocked);
    }
    return blocks;
}

export default {
    insert,
    isExist,
    selectBlocker,
    selectBlocked
}