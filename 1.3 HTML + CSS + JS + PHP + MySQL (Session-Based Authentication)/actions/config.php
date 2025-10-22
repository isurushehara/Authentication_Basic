<?php
// actions/config.php
session_start();

// Display errors for development only (disable in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Update with your DB credentials
$dbHost = '127.0.0.1';
$dbName = 'auth_php_mysql';
$dbUser = 'root';
$dbPass = ''; 

$dsn = "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $dbUser, $dbPass, $options);
} catch (PDOException $e) {
    // For production: log this instead of echo
    exit('Database connection failed: ' . $e->getMessage());
}

// Simple helper to check login status
function is_logged_in() {
    return !empty($_SESSION['user_id']);
}
