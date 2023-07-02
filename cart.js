let cart = [];

export function addToCart(product, quantity = 1) {
  const cartItem = cart.find((item) => item.product.id === product.id);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.product.id !== productId);
}

export function clearCart() {
  cart = [];
}

export function getCartItems() {
  return cart;
}
