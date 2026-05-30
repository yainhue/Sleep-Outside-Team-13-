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
  cartItems.forEach(item => {

    // multiply the price of each item by its quantity and add it to the total counter
    cartTotalCounter += item.FinalPrice * item.qty;

  });
  cartTotalAmount.textContent = cartTotalCounter.toFixed(2);
}

function cartItemTemplate(item) {
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