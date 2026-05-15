import { getLocalStorage } from "./utils.mjs";
const cartTotalDisplay = document.querySelector(".cart-total");
const cartTotalAmount = document.querySelector("#cart-total-amount");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // add up the total price of the items in the cart and display it
  cartTotalDisplay.classList.add("cart-total-open");
  let cartTotalCounter = 0;
  cartItems.forEach((item) => {
    cartTotalCounter += item.FinalPrice;
  });
  cartTotalAmount.textContent = cartTotalCounter.toFixed(2);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
