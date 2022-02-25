import { Client } from 'pg';

export const client = new Client({
  host: 'localhost',
  user: 'matcha',
  database: 'matcha',
  password: 'password',
  port: 5432,
});

client.connect();