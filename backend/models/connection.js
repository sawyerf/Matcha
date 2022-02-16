import { Client } from 'pg';

export const client = new Client({
  host: 'localhost',
  user: 'matcha',
  database: 'matcha',
  password: 'password',
  port: 5432,
});

client.connect();

// client.query(`CREATE TABLE users (
//   email varchar,
//   username varchar,
//   password varchar,
//   age varchar
// );`, (err, res) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Table is successfully created');
// });