const form = document.getElementById('loginForm');
const error = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    // Fetch users from fake database
    const response = await fetch('users.json');
    const users = await response.json();

    // Check if user exists
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', username);
      window.location.href = 'welcome.html';
    } else {
      error.textContent = 'Invalid username or password!';
    }
  } catch (err) {
    console.error('Error reading users.json', err);
    error.textContent = 'Something went wrong. Try again!';
  }
});
