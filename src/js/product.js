import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productID = getParam("product");
console.log("productID:", productID);

const product = new ProductDetails(productID, dataSource);

product.init();
