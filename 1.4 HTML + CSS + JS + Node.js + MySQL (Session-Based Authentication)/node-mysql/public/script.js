const msg = document.getElementById("message");

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch("http://localhost:5000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    }),
  });
  const data = await res.json();
  msg.textContent = data.message || data.error;

  if (res.ok) {
    // Store minimal user info and redirect to welcome page
    localStorage.setItem(
      "user",
      JSON.stringify({ username: form.username.value, email: form.email.value })
    );
    window.location.href = "/welcome.html";
  }
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: form.identifier.value,
      password: form.password.value,
    }),
  });
  const data = await res.json();
  msg.textContent = data.message || data.error;

  if (res.ok) {
    // Save username (server returns it) and redirect to welcome page
    const username = data.username || form.identifier.value;
    localStorage.setItem("user", JSON.stringify({ username }));
    window.location.href = "/welcome.html";
  }
});
