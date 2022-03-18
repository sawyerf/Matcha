import { client } from './connection'

const insert = async (id_image, id_user, image) => {
    let res;

    try {
        res = await client.query(
            `INSERT INTO images (id_image, id_user, image)
            VALUES ($1, $2, $3)`,
            [id_image, id_user, image]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const select = async (id_user) => {
    let res;

    try {
        res = await client.query(
            `SELECT id_image, image FROM images WHERE id_user=$1`,
            [id_user]
        );
    } catch (error) {
        console.log('error: ', error);
        return false;
    }
    return res.rows;
}

const selectByUid = async (uid) => {
    let res;

    try {
        res = await client.query(
            `SELECT id_image, image FROM images WHERE id_image=$1`,
            [uid]
        );
    } catch (error) {
        console.log('error: ', error);
        return false;
    }
    if (res.rowCount === 0) return null;
    return res.rows[0];
}

const del = async (id_image) => {
    let res;

    try {
        res = await client.query(
            `DELETE FROM images WHERE id_image=$1`,
            [id_image]
        );
    } catch (error) {
        console.log('error: ', error);
        return false;
    }
    return true;
}

export default {
    insert,
    select,
    del,
    selectByUid,
};