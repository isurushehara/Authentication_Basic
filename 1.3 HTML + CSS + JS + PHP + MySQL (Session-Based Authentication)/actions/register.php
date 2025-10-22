<?php
// actions/register.php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../public/index.php');
    exit;
}

$username = trim($_POST['username'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm  = $_POST['confirm_password'] ?? '';

$errors = [];

// Basic validation
if (strlen($username) < 3) $errors[] = 'Username must be at least 3 characters.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email.';
if (strlen($password) < 6) $errors[] = 'Password must be at least 6 characters.';
if ($password !== $confirm) $errors[] = 'Passwords do not match.';

if ($errors) {
    $_SESSION['register_errors'] = $errors;
    $_SESSION['old'] = ['username' => $username, 'email' => $email];
    header('Location: ../public/index.php#signup');
    exit;
}

// Check for existing user
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email OR username = :username LIMIT 1');
$stmt->execute(['email' => $email, 'username' => $username]);
if ($stmt->fetch()) {
    $_SESSION['register_errors'] = ['Username or email already taken.'];
    $_SESSION['old'] = ['username' => $username, 'email' => $email];
    header('Location: ../public/index.php#signup');
    exit;
}

// Hash password and insert
$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :hash)');
$stmt->execute(['username' => $username, 'email' => $email, 'hash' => $hash]);

// Log the user in (store minimal session)
$userId = $pdo->lastInsertId();
$_SESSION['user_id'] = $userId;
$_SESSION['username'] = $username;

// Redirect to protected area
header('Location: ../public/welcome.php');
exit;
