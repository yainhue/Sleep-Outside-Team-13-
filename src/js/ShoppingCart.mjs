import { getLocalStorage, renderListWithTemplate, getProductListImage, updateCartCount } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">

      <a href="../product_pages/?product=${item.Id}" class="cart-card__image">
        <img src="${getProductListImage(item)}" alt="${item.Name}" />
      </a>

      <a href="../product_pages/?product=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <div class="cart-card__details">
        <p class="cart-card__quantity">Qty: ${item.Qty}</p>
      </div>

      <div class="cart-card__buttons">
        <button class="remove-item" data-id="${item.Id}">✖</button>
      </div>
    </li>
  `;
} 

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.items = [];
  }

  getItems() {
    const storedItems = getLocalStorage("so-cart");
    this.items = storedItems || [];
  }

  removeItem(id) {
    const item = this.items.find((product) => product.Id === id);

    if (item.Qty > 1) {
      item.Qty -= 1;
    } else {
      this.items = this.items.filter((product) => product.Id !== id);
    }

    localStorage.setItem("so-cart", JSON.stringify(this.items));

    this.renderItems();
    this.renderTotal();
    updateCartCount();
  } 

  addRemoveListeners() {
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach(button => {
    button.addEventListener("click", () => {
    const id = button.dataset.id;
    this.removeItem(id);
    });
    });
  }

  renderItems() {
    if (this.items.length === 0) {
      this.listElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      this.items,
      "afterbegin",
      true
    );

    this.addRemoveListeners();
  }

  renderTotal() {
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotal = document.querySelector(".cart-total");

    if (this.items.length === 0) {
      cartFooter.classList.add("hide");
      return;
    }

    cartFooter.classList.remove("hide");

    const total = this.items.reduce(
      (sum, item) => sum + item.FinalPrice * item.Qty,
      0
    );

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  init() {
    this.getItems();
    this.renderItems();
    this.renderTotal();
  }
}