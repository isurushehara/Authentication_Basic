const form = document.getElementById('loginForm');
const error = document.getElementById('error');

// Fake user data (like a database)
const USER = {
  username: "isuru",
  password: "1234"
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === USER.username && password === USER.password) {
    localStorage.setItem('loggedInUser', username);
    window.location.href = 'welcome.html';
  } else {
    error.textContent = 'Invalid username or password!';
  }
});
