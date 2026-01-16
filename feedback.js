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
  } else {
    loginLink.style.display = 'block';
    signupLink.style.display = 'block';
    userMenu.style.display = 'none';
  }

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.reload();
  });

  // Feedback form submission
  document.getElementById('feedbackForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    let feedback = JSON.parse(localStorage.getItem('feedback')) || [];
    feedback.push({ name, email, message });
    localStorage.setItem('feedback', JSON.stringify(feedback));
    document.getElementById('feedbackMessage').textContent = 'Thank you for your feedback!';
    document.getElementById('feedbackForm').reset();
  });
});