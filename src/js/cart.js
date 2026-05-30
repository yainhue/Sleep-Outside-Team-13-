import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cartTotalDisplay = document.querySelector(".cart-total");
const cartTotalAmount = document.querySelector("#cart-total-amount");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const quantities = getLocalStorage("qty-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item, quantities));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // add up the total price of the items in the cart and display it
  cartTotalDisplay.classList.add("cart-total-open");
  let cartTotalCounter = 0;
  cartItems.forEach((item) => {
    cartTotalCounter += item.FinalPrice;
  });
  cartTotalAmount.textContent = cartTotalCounter.toFixed(2);
}

function cartItemTemplate(item, quantities) {

  const cartItems = getLocalStorage("so-cart");
  const index = cartItems.findIndex(item => item.Id === this.product.Id);
  const qty = 1

  // The quantities array stores pairs of product ID and quantity, so we find the index of the product ID and then update the quantity at the next index.
  if (index !== -1) {
    qty = quantities[index * 2 + 1] += 1;

  }

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.qty}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

// <p class="cart-card__quantity">qty: ${quantities[item.Id * 2 + 1] || 1}</p>