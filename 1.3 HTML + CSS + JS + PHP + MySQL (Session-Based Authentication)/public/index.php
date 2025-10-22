<?php
// public/index.php
require_once __DIR__ . '/../actions/config.php';

// Read flash messages
$register_errors = $_SESSION['register_errors'] ?? null;
$login_error = $_SESSION['login_error'] ?? null;
$old = $_SESSION['old'] ?? [];
unset($_SESSION['register_errors'], $_SESSION['login_error'], $_SESSION['old']);

// If already logged in, redirect to welcome
if (is_logged_in()) {
    header('Location: welcome.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Auth Demo — Sign Up / Login</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Auth Demo</h1>

    <div class="forms">
      <!-- LOGIN -->
      <section id="login">
        <h2>Login</h2>
        <?php if ($login_error): ?>
          <div class="error"><?= htmlspecialchars($login_error) ?></div>
        <?php endif; ?>
        <form action="../actions/login.php" method="POST" novalidate>
          <input name="identifier" placeholder="Email or username" required>
          <input name="password" type="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
      </section>

      <!-- SIGNUP -->
      <section id="signup">
        <h2>Sign Up</h2>
        <?php if ($register_errors): ?>
          <div class="error">
            <?php foreach ($register_errors as $e): ?>
              <div><?= htmlspecialchars($e) ?></div>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

        <form action="../actions/register.php" method="POST" novalidate>
          <input name="username" placeholder="Username" required value="<?= htmlspecialchars($old['username'] ?? '') ?>">
          <input name="email" type="email" placeholder="Email" required value="<?= htmlspecialchars($old['email'] ?? '') ?>">
          <input name="password" type="password" placeholder="Password" required>
          <input name="confirm_password" type="password" placeholder="Confirm password" required>
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </div>

  </div>
</body>
</html>
