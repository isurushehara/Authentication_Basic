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
    const dash = await fetch("/dashboard");
    const info = await dash.json();
    msg.textContent = info.message;
  }
});
