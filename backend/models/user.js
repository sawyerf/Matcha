import { client } from './connection'
import { v4 as uuidv4 }  from 'uuid'

const insert = async (email, username, password, age) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO users (email, username, password, age)
            VALUES ($1, $2, $3, $4)`,
            [email, username, password, age]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const setInfo = async (uid, gender, sexuality, tags, bio) => {
    let res;
    try {
        res = await client.query(
            `UPDATE users
            SET gender=$2, sexuality=$3, tags=$4, bio=$5
            WHERE uid=$1`,
            [uid, gender, sexuality, tags, bio]
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
    if (res.rowCount == 0) return null;
    return res.rows[0];
}

const selectByUids = async (uids) => {
    let res;
    const sql = `SELECT uid, username, date_part('year', age(age))
        FROM users WHERE uid IN (${uids.map((val, index) => `$${index + 1}`).join(',')})`;

    if (uids.length == 0) return ([]);
    try {
        res = await client.query(
            sql,
            uids
        );
    } catch (error) {
        console.log(error);
        return null;
    }
    return res.rows;
}

const selectMe = async (uid) => {
    let res;

    try {
        res = await client.query(
            `SELECT * FROM users WHERE uid=$1`,
            [uid]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    // if (res.rowCount == 0) return null;
    return res.rows[0];
}

const selectOffer = async (myGender, mySexuality) => {
    let res;

    try {
        res = await client.query(
            `SELECT username, date_part('year', age(age)), gender, sexuality, bio FROM users 
            WHERE (position($1 in sexuality) > 0 AND position(gender in $2) > 0)`,
            [myGender, mySexuality]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    console.log(res.rows)
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
    selectByUids,
    selectMe,
    selectOffer,
    setInfo
};