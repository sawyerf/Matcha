DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "likes";

CREATE TABLE users (
    uid varchar NOT NULL,
    email varchar,
    username varchar,
    password varchar,
    age varchar
);
-- CREATE UNIQUE INDEX uid ON users (uid); 

CREATE TABLE likes (
    id_liker varchar,
    id_liked varchar,
    islike boolean
);