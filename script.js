document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
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

  // Logout functionality
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.reload();
  });

  // Image modal functionality
  document.querySelectorAll('.product-image').forEach(image => {
    image.addEventListener('click', () => {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('enlargedImage');
      modal.style.display = 'block';
      modalImg.src = image.src;
    });
  });

  document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = document.getElementById('imageModal');
      modal.style.display = 'none';
    });
  });

  // Close modal when clicking outside the image
  document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // Scroll functionality for show more buttons
  document.querySelectorAll('.scroll-btn').forEach(button => {
    button.addEventListener('click', () => {
      const scrollContainer = button.previousElementSibling;
      scrollContainer.scrollBy({ left: 260, behavior: 'smooth' });
    });
  });

  // Add to cart functionality
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      const img = card.querySelector('.product-image');
      const item = {
        id: img.src,
        name: img.alt,
        price: parseInt(img.getAttribute('data-price')),
        image: img.src
      };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${item.name} added to cart!`);
    });
  });

  // Existing card hover and click effects
  document.querySelectorAll('.container div, .container1 div').forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Ensure beep is defined; if not, remove or replace with your audio logic
      // beep.currentTime = 0;
      // beep.play();
    });

    card.addEventListener('click', () => {
      card.classList.toggle('clicked');
    });
  });
});