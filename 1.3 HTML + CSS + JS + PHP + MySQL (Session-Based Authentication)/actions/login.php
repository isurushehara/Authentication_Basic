<?php
// actions/login.php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../public/index.php');
    exit;
}

$identifier = trim($_POST['identifier'] ?? '');
$password = $_POST['password'] ?? '';

if ($identifier === '' || $password === '') {
    $_SESSION['login_error'] = 'Please provide credentials.';
    header('Location: ../public/index.php#login');
    exit;
}

// Find user by email or username
$stmt = $pdo->prepare('SELECT id, username, password_hash FROM users WHERE email = :id OR username = :id LIMIT 1');
$stmt->execute(['id' => $identifier]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    $_SESSION['login_error'] = 'Invalid credentials.';
    header('Location: ../public/index.php#login');
    exit;
}

// Successful login
$_SESSION['user_id'] = $user['id'];
$_SESSION['username'] = $user['username'];

// Regenerate session id to avoid fixation
session_regenerate_id(true);

header('Location: ../public/welcome.php');
exit;
