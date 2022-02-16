import { client } from './connection'
import { v4 as uuidv4 }  from 'uuid'

const insertUser = async (email, username, password, age) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO users (uid, email, username, password, age)
            VALUES ($1, $2, $3, $4, $5)`,
            [uuidv4(), email, username, password, age]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const selectUser = async (username) => {
    let res;
    try {
        res = await client.query(
            `SELECT * FROM users WHERE username=$1`,
            [username]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    console.log(res.rows);
    if (res.rowCount == 0) return null;
    return res.rows[0];
}

const existUser = async (email, username) => {
    let res;
    try {
        res = await client.query(
            `SELECT * FROM users WHERE email=$1 OR username=$2`,
            [email, username]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    if (res.rowCount == 0) {
        return (false);
    } else {
        return true;
    }
}

export default {
    insertUser,
    selectUser,
    existUser
};