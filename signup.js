document.addEventListener('DOMContentLoaded', () => {
  // User session handling
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const loginLink = document.getElementById('login-link');
  const signupLink = document.getElementById('signup-link');
  const userMenu = document.getElementById('user-menu');
  const usernameSpan = document.getElementById('username');

  if (currentUser) {
    loginLink.style.display = 'none';
    signupLink.style.display = 'none';
    userMenu.style.display = 'block';
    usernameSpan.textContent = `Hi, ${currentUser.username}`;
    document.getElementById('signupMessage').textContent = 'You are already logged in!';
    document.getElementById('signupForm').style.display = 'none';
  } else {
    loginLink.style.display = 'block';
    signupLink.style.display = 'block';
    userMenu.style.display = 'none';
  }

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.reload();
  });

  // Signup form submission
  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.email === email)) {
      document.getElementById('signupMessage').textContent = 'Email already registered.';
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('signupMessage').textContent = 'Signup successful! Please login.';
    document.getElementById('signupForm').reset();
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1000);
  });
});