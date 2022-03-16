DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "likes";
DROP TABLE IF EXISTS "matchs";
DROP TABLE IF EXISTS "blocks";
DROP TABLE IF EXISTS "reports";
DROP TABLE IF EXISTS "images";
DROP TABLE IF EXISTS "history";
DROP TABLE IF EXISTS "messages";

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    email varchar UNIQUE,
    firstname varchar,
    lastname varchar,
    username varchar UNIQUE,
    password varchar,
    birthday timestamp,
    last_visit timestamp,
    gender varchar(1),
    sexuality varchar(2) DEFAULT 'HF',
    bio varchar,
    popularity int DEFAULT 0,
    tags varchar,
    latitude float DEFAULT 48.8582,
    longitude float DEFAULT 2.3387,
    isOK boolean DEFAULT FALSE,
    keymail varchar UNIQUE,
    keypass varchar UNIQUE,
    validmail boolean DEFAULT FALSE,
    images text ARRAY[5]
);

CREATE TABLE matchs (
    uid SERIAL PRIMARY KEY,
    id_user1 int,
    id_user2 int
);

CREATE TABLE likes (
    id_liker int,
    id_liked int,
    islike boolean
);

CREATE TABLE blocks (
    id_blocker int,
    id_blocked int
);

CREATE TABLE reports (
    id_reporter int,
    id_reported int
);

CREATE TABLE images (
    id_image varchar UNIQUE,
    id_user int,
    image text
);

CREATE TABLE history (
    id_visiter int,
    id_visited int,
    time timestamp
);

CREATE TABLE messages (
    id_match int,
    id_from int,
    msg text,
    date timestamp
);

INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity, isOK) VALUES ('user1@lol.com', 'user1', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '1992-02-02T00:00:00.000Z', 'H', 'HF', '#bite,#barres,#lolipop' , 20, TRUE);
-- INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity, isOK) VALUES ('user2@lol.com', 'user2', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '1995-02-02T00:00:00.000Z', 'F', 'HF', '#des,#barres,#vaches'   , 10, TRUE);
-- INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity, isOK) VALUES ('user3@lol.com', 'user3', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '1999-02-02T00:00:00.000Z', 'H', 'HH', '#des,#vaches,#lolipop'  , 50, TRUE);
-- INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity, isOK) VALUES ('user4@lol.com', 'user4', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '2000-02-02T00:00:00.000Z', 'F', 'FF', '#salop,#vaches,#lolipop', 40, TRUE);
-- INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity, isOK) VALUES ('user5@lol.com', 'user5', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '2001-02-02T00:00:00.000Z', 'H', 'FF', '#des,#salop,#lolipop'   , 30, TRUE);
-- INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity, isOK) VALUES ('user6@lol.com', 'user6', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '1989-02-02T00:00:00.000Z', 'F', 'HH', '#hydro,#vaches,#poney'  , 20, FALSE);
INSERT INTO matchs (id_user1, id_user2) VALUES(1, 2);
INSERT INTO matchs (id_user1, id_user2) VALUES(1, 3);
INSERT INTO matchs (id_user1, id_user2) VALUES(1, 13);
INSERT INTO matchs (id_user1, id_user2) VALUES(1, 30);
INSERT INTO matchs (id_user1, id_user2) VALUES(1, 35);
INSERT INTO matchs (id_user1, id_user2) VALUES(1, 36);


INSERT INTO matchs (id_liker, id_liked, islike) VALUES(2, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(3, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(4, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(5, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(6, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(7, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(8, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(9, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(10, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(11, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(12, 1, TRUE);
INSERT INTO matchs (id_liker, id_liked, islike) VALUES(13, 1, TRUE);
