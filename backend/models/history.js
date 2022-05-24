import { client } from './connection'

const insert = async (id_visiter, id_visited, time) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO history (id_visiter, id_visited, time)
            VALUES ($1, $2, $3)`,
            [id_visiter, id_visited, time]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const isExist = async (id_visiter, id_visited) => {
    let res;
    try {
        res = await client.query(
            `SELECT * FROM history WHERE id_visiter=$1 AND id_visited=$2`,
            [id_visiter, id_visited]
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

const update = async (id_visiter, id_visited, time) => {
    let res;

    try {
        res = await client.query(
            `UPDATE history
            SET time=$3
            WHERE id_visiter=$1 AND id_visited=$2`,
            [id_visiter, id_visited, time]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const select = async (id_visited) => {
    let res;

    try {
        res = await client.query(
            `SELECT id_visiter, time FROM history
            WHERE id_visited=$1`,
            [id_visited]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    const visits = {};
    for (const visit of res.rows) {
        visits[visit.id_visiter] = visit.time;
    }
    return visits;
}

const del = async (id_visiter, id_visited) => {
    let res;
    try {
        res = await client.query(
            `DELETE FROM history
                WHERE (id_visited=$1 AND id_visiter=$2) OR (id_visited=$2 AND id_visiter=$1)`,
            [id_visiter, id_visited]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

export default {
    insert,
    isExist,
    update,
    select,
    del,
}