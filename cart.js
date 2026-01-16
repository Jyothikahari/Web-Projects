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

  // Cart display
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutSection = document.getElementById('checkoutSection');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const purchaseMessage = document.getElementById('purchaseMessage');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    cartTotal.textContent = 'Total: ₹0';
    checkoutSection.style.display = 'none';
  } else {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name} - ₹${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
      total += item.price;
    });

    cartTotal.textContent = `Total: ₹${total}`;
    checkoutTotal.textContent = `₹${total}`;
    checkoutSection.style.display = 'block';
  }

  // Confirm purchase
  document.getElementById('confirmPurchase').addEventListener('click', () => {
    const paymentMode = document.getElementById('paymentMode').value;
    if (!paymentMode) {
      purchaseMessage.textContent = 'Please select a payment method.';
      return;
    }

    // Simulate purchase
    localStorage.removeItem('cart');
    cartItemsContainer.innerHTML = '<p class="empty-cart">Purchase successful! Your cart is now empty.</p>';
    cartTotal.textContent = 'Total: ₹0';
    checkoutSection.style.display = 'none';
    purchaseMessage.textContent = `Purchase confirmed using ${paymentMode.replace('_', ' ')}. Thank you for shopping!`;
  });
});

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}