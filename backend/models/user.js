import { client } from './connection'
import { v4 as uuidv4 }  from 'uuid'

const insert = async (email, username, password, age, keymail, keypass, firstname, lastname) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO users (email, username, password, birthday, keymail, keypass, firstname, lastname)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [email, username, password, age, keymail, keypass, firstname, lastname]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const setInfo = async (uid, gender, sexuality, tags, bio, firstname, lastname) => {
    let res;

    try {
        res = await client.query(
            `UPDATE users
            SET gender=$2, sexuality=$3, tags=$4, bio=$5, firstname=$6, lastname=$7
            WHERE uid=$1`,
            [uid, gender, sexuality, tags, bio, firstname, lastname]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const selectByUids = async (uids) => {
    let res;
    const sql = `SELECT uid, username, date_part('year', age(birthday)) AS age
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
            `SELECT uid, email, username, password, birthday, gender, sexuality, bio, tags, popularity, date_part('year', age(birthday)) AS age, latitude, longitude, images, firstname, lastname
            FROM users WHERE uid=$1`,
            [uid]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    if (res.rowCount == 0) return null;
    return res.rows[0];
}

const selectOffer = async (uid, myGender, mySexuality) => {
    let res;

    try {
        res = await client.query(
            `SELECT uid, username, date_part('year', age(birthday)) AS age, gender, sexuality, bio, tags, popularity, latitude, longitude, last_visit
            FROM users
            WHERE (uid!=$1 AND isOK=TRUE AND position($2 in sexuality) > 0 AND position(gender in $3) > 0)`,
            [uid, myGender, mySexuality]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
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

const setVal = async (uid, name, value) => {
    let res;
    try {
        res = await client.query(
            `UPDATE users SET ${name}=$2 WHERE uid=$1`,
            [uid, value]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const updateMail = async (uid, mail, keymail) => {
    let res;
    try {
        res = await client.query(
            `UPDATE users 
            SET email=$2, keymail=$3, validmail=FALSE
            WHERE uid=$1`,
            [uid, mail, keymail]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const selectBy = async (name, value) => {
    let res;

    try {
        res = await client.query(
            `SELECT * FROM users WHERE ${name}=$1`,
            [value]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    if (res.rowCount == 0) return null;
    return res.rows[0];
}

const search = async (uid, myGender, mySexuality, body) => {
    let res;

    try {
        res = await client.query(
            `SELECT uid, username, date_part('year', age(birthday)) AS age, gender, sexuality, bio, tags, popularity, last_visit
            FROM users
            WHERE uid!=$1 AND isok=TRUE AND position($2 in sexuality) > 0 AND position(gender in $3) > 0
                AND $4 <= date_part('year', age(birthday)) AND date_part('year', age(birthday)) <= $5
                AND $6 <= popularity AND popularity <= $7`,
            [uid, myGender, mySexuality, body.minAge, body.maxAge, body.minPopularity, body.maxPopularity]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return res.rows;
}

export default {
    insert,
    exist,
    selectByUids,
    selectMe,
    selectOffer,
    selectBy,
    setVal,
    setInfo,
    search,
    updateMail,
};