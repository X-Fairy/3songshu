SET NAMES UTF8;
DROP DATABASE IF EXISTS 3songsu;
CREATE DATABASE 3songsu CHARSET=UTF8;
USE 3songsu;
CREATE TABLE 3songsu_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  phone VARCHAR(16),
  avatar VARCHAR(128),
  user_name VARCHAR(32),
  gender INT
);
INSERT INTO 3songsu_user VALUES
(1,'dangdang','123456','13501234560','http://127.0.0.1:3000/auto/1.jpg','当当','1');
INSERT INTO 3songsu_user VALUES
(2,'dingding','123456','13501234561','http://127.0.0.1:3000/auto/2.jpg','丁然','1');
INSERT INTO 3songsu_user VALUES
(3,'doudou','123456','13501234562','http://127.0.0.1:3000/auto/2.jpg','窦涛','1');
INSERT INTO 3songsu_user VALUES
(4,'yaya','123456','13501234563','http://127.0.0.1:3000/auto/1.jpg','王丫','0');
CREATE TABLE 3songsu_laptop(
	lid INT PRIMARY KEY AUTO_INCREMENT,
	pic VARCHAR(64),
	title VARCHAR(32),
	subtitle VARCHAR(32),
	price DECIMAL(4,2),
  count INT
);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/laptop/1.jpg','夏威夷果','纯正口感，奶香浓郁',23.99,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/2-1.jpg','碧根果','松鼠原产的才好吃',21.90,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/3-1.jpg','开口松子原味','五年等一会的纯粹美味',36.39,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/4-1.jpg','开心果','自然香酥的开心动力',36.9,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/5-1.jpg','手剥巴旦木','手剥有乐趣，香滑有口感',23.99,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/6-1.jpg','炭烧腰果','热带雨林的炭烧风情',23.99,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/7-1.jpg','芒果干','热带果王 当然紫花芒',9.9,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/8-1.jpg','约辣','无辣不欢',9.99,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/9-1.jpg','黄桃','新鲜黄桃罐头 午后水果',6.9,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/10-1.png','什锦水果罐头','水果罐头',16.9,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/11-1.jpg','粗粮八点半','果干粗粮片',13.9,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/12-1.jpg','坚果炒货组合','坚果炒货组合12.2g',66.99,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/13-1.jpg','坚果组合','坚果分享组合710g',66.99,15464);
INSERT INTO 3songsu_laptop VALUES(null,'http://127.0.0.1:3000/product/14-1.jpg','夫妻肺片','正宗地道 四川名菜',32.9,15464);
CREATE TABLE 3songsu_shopcar(
  id INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(128),
  title VARCHAR(32),
  price DECIMAL(4,2),
  count INT,
  uid INT,
  lid INT
);
INSERT INTO 3songsu_shopcar VALUES(null,'http://127.0.0.1:3000/laptop/1.jpg','夏威夷果',23.99,1,1,1);
INSERT INTO 3songsu_shopcar VALUES(null,'http://127.0.0.1:3000/product/2-1.jpg','碧根果',21.90,1,1,2);
INSERT INTO 3songsu_shopcar VALUES(null,'http://127.0.0.1:3000/product/3-1.jpg','开口松子原味',36.39,1,1,3);
INSERT INTO 3songsu_shopcar VALUES(null,'http://127.0.0.1:3000/product/4-1.jpg','开心果',36.9,1,1,2);
INSERT INTO 3songsu_shopcar VALUES(null,'http://127.0.0.1:3000/laptop/1.jpg','夏威夷果',23.99,1,1,5);
INSERT INTO 3songsu_shopcar VALUES(null,'http://127.0.0.1:3000/product/2-1.jpg','碧根果',21.90,1,1,1);
INSERT INTO 3songsu_shopcar VALUES(null,'http://127.0.0.1:3000/product/3-1.jpg','开口松子原味',1,36.39,1,4);
INSERT INTO 3songsu_shopcar VALUES(null,'http://127.0.0.1:3000/product/4-1.jpg','开心果',36.9,1,1,3);