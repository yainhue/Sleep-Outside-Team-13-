import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./alert.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const alerts = new Alert();
alerts.renderAlerts();
const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);

productList.init();