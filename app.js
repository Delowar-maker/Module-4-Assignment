import products from "./product.js";
import { addToCart, removeFromCart, clearCart, getCartItems } from "./cart.js";

const productsList = document.getElementById("products");
const cartList = document.getElementById("cart");
const totalAmount = document.getElementById("total");
const clearCartBtn = document.getElementById("clear-cart");

function displayProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${product.name}</span>
      <span>$${product.price}</span>
      <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    `;
    productsList.appendChild(li);
  });
}

function displayCartItems() {
  cartList.innerHTML = "";
  let totalPrice = 0;

  const cartItems = getCartItems();
  cartItems.forEach((cartItem) => {
    const { product, quantity } = cartItem;
    const li = document.createElement("li");
    const itemPrice = product.price * quantity;
    totalPrice += itemPrice;
    li.innerHTML = `
      <span>${product.name} x ${quantity}</span>
      <span>$${itemPrice}</span>
      <button class="remove-from-cart" data-product-id="${product.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  totalAmount.textContent = `Total: $${totalPrice}`;
}

productsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const productId = parseInt(event.target.dataset.productId);
    const product = products.find((p) => p.id === productId);
    addToCart(product);
    displayCartItems();
  }
});

cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart")) {
    const productId = parseInt(event.target.dataset.productId);
    removeFromCart(productId);
    displayCartItems();
  }
});

clearCartBtn.addEventListener("click", () => {
  clearCart();
  displayCartItems();
});

displayProducts();
displayCartItems();
