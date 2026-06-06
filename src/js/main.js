// import ExternalServices from "./ExternalServices.mjs";
// import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

console.log("main.js loaded");

function initSearch() {
    const searchForm = document.getElementById("search-form");
    if (!searchForm) return;

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = document.getElementById("search-input").value.toLowerCase().trim();
        const productCards = document.querySelectorAll(".product-card");

        // If user searches from home/cart page where no cards exist, jump to tents to search
        if (productCards.length === 0) {
            window.location.href = `/product-listing/index.html?category=tents&search=${encodeURIComponent(query)}`;
            return;
        }

        // Filter cards if they are on screen
        productCards.forEach((card) => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? "block" : "none";
        });
    });
}

// const listElement = document.querySelector(".product-list");
// const productList = new ProductList(
//   "tents",
//   new ExternalServices("tents"),
//   listElement,
// );

// productList.init();
// console.log("productList initialized");
