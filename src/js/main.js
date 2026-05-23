import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// 1. Initialize data manager targeting our tents JSON data
const dataSource = new ProductData("tents");

// 2. Target the HTML list element from your home page template layout
const listElement = document.querySelector(".product-list");

// 3. Create our dynamic list manager instance and launch it
const productList = new ProductList("tents", dataSource, listElement);
productList.init();
