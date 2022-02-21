DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "likes";
DROP TABLE IF EXISTS "matchs";

CREATE TABLE users (
    -- uid varchar NOT NULL,
    uid SERIAL PRIMARY KEY,
    email varchar UNIQUE,
    username varchar UNIQUE,
    password varchar,
    age timestamp,
    gender varchar(2),
    sexuality varchar(2),
    bio varchar
    -- popularity int,
    -- localisation varchar,
    -- tags varchar
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


INSERT INTO users (email, username, password, age, gender, sexuality) VALUES ('user1@lol.com', 'user1', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '2000-02-02T00:00:00.000Z', 'H', 'FH');
INSERT INTO users (email, username, password, age, gender, sexuality) VALUES ('user2@lol.com', 'user2', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '2000-02-02T00:00:00.000Z', 'F', 'H');
INSERT INTO users (email, username, password, age, gender, sexuality) VALUES ('user3@lol.com', 'user3', '$2b$10$i2mzQl6vU59t53eXp3ZlxueyiVTLeQTRhrHB3zq.kabbDduUD7BH.', '2000-02-02T00:00:00.000Z', 'H', 'F');
INSERT INTO matchs (id_user1, id_user2) VALUES(1, 2);
INSERT INTO matchs (id_user1, id_user2) VALUES(1, 3);
