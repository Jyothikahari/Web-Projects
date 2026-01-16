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
    document.getElementById('loginMessage').textContent = 'You are already logged in!';
    document.getElementById('loginForm').style.display = 'none';
  } else {
    loginLink.style.display = 'block';
    signupLink.style.display = 'block';
    userMenu.style.display = 'none';
  }

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.reload();
  });

  // Login form submission
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email }));
      window.location.href = 'index.html';
    } else {
      document.getElementById('loginMessage').textContent = 'Invalid email or password.';
    }
  });
});