-- create database
CREATE DATABASE auth_php_mysql CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE auth_php_mysql;

-- users table
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
