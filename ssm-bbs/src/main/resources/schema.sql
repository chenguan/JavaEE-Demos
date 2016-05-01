CREATE TABLE `bbs`.`user` (
  `id`          BIGINT       NOT NULL AUTO_INCREMENT,
  `username`    VARCHAR(64)  NOT NULL,
  `password`    VARCHAR(128) NOT NULL,
  `realname`    VARCHAR(64)  NULL     DEFAULT '',
  `logos`       VARCHAR(64)  NULL     DEFAULT '',
  `logom`       VARCHAR(64)  NULL     DEFAULT '',
  `logol`       VARCHAR(64)  NULL     DEFAULT '',
  `mobile`      VARCHAR(32)  NULL     DEFAULT '',
  `email`       VARCHAR(64)  NULL     DEFAULT '',
  `createdTime` DATETIME     NOT NULL,
  `updatedTime` DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC)
)
  COMMENT '用户表';

INSERT INTO user (username, password, realname, mobile, email, createdTime, updatedTime)
VALUES
  ('admin', '123456', '系统管理员', '18221372104', 'kangyonggan@gmail.com', '2016-04-29 23:11:20', '2016-04-29 23:11:20');

CREATE TABLE `bbs`.`category` (
  `id`          BIGINT       NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(64)  NOT NULL,
  `code`        VARCHAR(32)  NOT NULL,
  `status`      VARCHAR(32)  NULL     DEFAULT 'published',
  `picture`     VARCHAR(128) NULL     DEFAULT '',
  `pid`         BIGINT       NOT NULL,
  `createdTime` DATETIME     NOT NULL,
  `updatedTime` DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC)
)
  COMMENT '栏目表';

CREATE TABLE `bbs`.`article` (
  `id`           BIGINT       NOT NULL AUTO_INCREMENT,
  `title`        VARCHAR(256) NOT NULL,
  `body`         LONGTEXT     NOT NULL,
  `categoryId`   BIGINT       NOT NULL,
  `categoryName` VARCHAR(64)  NOT NULL,
  `status`       VARCHAR(32)  NULL     DEFAULT 'published',
  `hits`         BIGINT       NULL     DEFAULT 0,
  `top`          TINYINT      NULL     DEFAULT 0,
  `topTime`      DATETIME     NULL     DEFAULT NULL,
  `userId`       BIGINT       NOT NULL,
  `username`     VARCHAR(64)  NOT NULL,
  `createdTime`  DATETIME     NOT NULL,
  `updatedTime`  DATETIME     NOT NULL,
  PRIMARY KEY (`id`)
)
  COMMENT '帖子表';


CREATE TABLE `bbs`.`reply` (
  `id`          BIGINT      NOT NULL AUTO_INCREMENT,
  `body`        LONGTEXT    NOT NULL,
  `status`      VARCHAR(32) NULL     DEFAULT 'published',
  `hits`        BIGINT      NULL     DEFAULT 0,
  `articleId`   BIGINT      NOT NULL,
  `userId`      BIGINT      NOT NULL,
  `username`    VARCHAR(64) NOT NULL,
  `createdTime` DATETIME    NOT NULL,
  PRIMARY KEY (`id`)
)
  COMMENT '帖子回复表';


