CREATE DATABASE IF NOT EXISTS `spring_admin`;
USE `spring_admin`;

CREATE TABLE authorities
(
  username  VARCHAR(50) NOT NULL,
  authority VARCHAR(50) NOT NULL,
  CONSTRAINT authorities_ibfk_1 FOREIGN KEY (username) REFERENCES users (username)
);
CREATE UNIQUE INDEX authorities_idx_1 ON authorities (username, authority);
CREATE TABLE users
(
  username VARCHAR(50) PRIMARY KEY NOT NULL,
  password VARCHAR(255)            NOT NULL,
  enabled  TINYINT(1)              NOT NULL
);