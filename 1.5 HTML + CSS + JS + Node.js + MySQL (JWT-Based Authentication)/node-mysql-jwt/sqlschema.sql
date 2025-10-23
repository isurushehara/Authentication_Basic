CREATE DATABASE auth_node_mysql_jwt;
USE auth_node_mysql_jwt;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
