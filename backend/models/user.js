import { client } from './connection'
import { v4 as uuidv4 }  from 'uuid'

const insert = async (email, username, password, age) => {
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

const select = async (username) => {
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

const selectByUids = async (uids) => {
    let res;
    console.log("'" + uids.join("', '") + "'");
    try {
        res = await client.query(
            // `SELECT uid, username, age FROM users WHERE uid IN ('359aaf5c-5610-42a7-a422-2248e7fcc410', '4151fdff-f827-47a3-8f05-b27416fc9f9e')`
            `SELECT uid, username, age FROM users WHERE uid IN ($1)`,
            // [('359aaf5c-5610-42a7-a422-2248e7fcc410',  'f5d28c71-17ad-4df5-a642-50495c31bd73', '4151fdff-f827-47a3-8f05-b27416fc9f9e')]
            [uids]
            // ["'" + uids.join("', '") + "'"]
        );
    } catch (error) {
        console.log(error);
        return null;
    }
    console.log(res.rows);
    return res.rows;
}

const exist = async (email, username) => {
    let res;
    try {
        res = await client.query(
            `SELECT * FROM users WHERE email=$1 OR username=$2`,
            [email, username]
        );
    } catch (error) {
        console.log(error);
        return null;
    }
    if (res.rowCount == 0) {
        return (false);
    } else {
        return true;
    }
}

export default {
    insert,
    select,
    exist,
    selectByUids
};