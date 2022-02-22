DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "likes";
DROP TABLE IF EXISTS "matchs";

CREATE TABLE users (
    -- uid varchar NOT NULL,
    uid SERIAL PRIMARY KEY,
    email varchar UNIQUE,
    username varchar UNIQUE,
    password varchar,
    birthday timestamp,
    gender varchar(1),
    sexuality varchar(2) DEFAULT 'HF',
    bio varchar,
    popularity int DEFAULT 0,
    tags varchar
    -- localisation varchar,
);
-- CREATE UNIQUE INDEX uid ON users (uid); 

CREATE TABLE matchs (
    id_user1 int,
    id_user2 int
);

CREATE TABLE likes (
    id_liker int,
    id_liked int,
    islike boolean
);


INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity) VALUES ('user1@lol.com', 'user1', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '1992-02-02T00:00:00.000Z', 'H', 'HF', '#bite,#barres,#lolipop' , 20);
INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity) VALUES ('user2@lol.com', 'user2', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '1995-02-02T00:00:00.000Z', 'F', 'HF', '#des,#barres,#vaches'   , 10);
INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity) VALUES ('user3@lol.com', 'user3', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '1999-02-02T00:00:00.000Z', 'H', 'HH', '#des,#vaches,#lolipop'  , 50);
INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity) VALUES ('user4@lol.com', 'user4', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '2000-02-02T00:00:00.000Z', 'F', 'FF', '#salop,#vaches,#lolipop', 40);
INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity) VALUES ('user5@lol.com', 'user5', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '2001-02-02T00:00:00.000Z', 'H', 'FF', '#des,#salop,#lolipop'   , 30);
INSERT INTO users (email, username, password, birthday, gender, sexuality, tags, popularity) VALUES ('user6@lol.com', 'user6', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '1989-02-02T00:00:00.000Z', 'F', 'HH', '#hydro,#vaches,#poney'  , 20);
INSERT INTO matchs (id_user1, id_user2) VALUES(1, 2);
INSERT INTO matchs (id_user1, id_user2) VALUES(1, 3);
