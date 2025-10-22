<?php
// public/welcome.php
require_once __DIR__ . '/../actions/config.php';

if (!is_logged_in()) {
    header('Location: index.php');
    exit;
}
$username = $_SESSION['username'] ?? 'User';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Welcome, <?= htmlspecialchars($username) ?> 👋</h1>
    <p>You are logged in using session-based auth.</p>
    <p><a href="logout.php">Logout</a></p>
  </div>
</body>
</html>
