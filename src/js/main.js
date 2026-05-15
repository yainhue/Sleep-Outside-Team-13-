import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

console.log("main.js loaded");

const listElement = document.querySelector(".product-list");
const productList = new ProductList(
  "tents",
  new ProductData("tents"),
  listElement,
);

productList.init();
console.log("productList initialized");
