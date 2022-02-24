import { client } from './connection'

const insert = async (id_reporter, id_reported) => {
    let res;
    try {
        res = await client.query(
            `INSERT INTO reports (id_reporter, id_reported)
            VALUES ($1, $2)`,
            [id_reporter, id_reported]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const isExist = async (id_reporter, id_reported) => {
    let res;
    try {
        res = await client.query(
            `SELECT id_reporter FROM reports WHERE id_reporter=$1 AND id_reported=$2`,
            [id_reporter, id_reported]
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

const selectReporter = async (uid) => {
    let res;
    let reports;

    try {
        res = await client.query(
            `SELECT id_reporter FROM reports WHERE id_reported=$1`,
            [uid]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    for (const report of res.rows) {
        reports.push(report.id_reporter);
    }
    return reports;
}

const selectReported = async (uid) => {
    let res;
    let reports;

    try {
        res = await client.query(
            `SELECT id_reported FROM reports WHERE id_reporter=$1`,
            [uid]
        );
    } catch (error) {
        console.log(error);
        return false;
    }
    for (const report of res.rows) {
        reports.push(report.id_reported);
    }
    return reports;
}

export default {
    insert,
    isExist,
    selectReporter,
    selectReported
}