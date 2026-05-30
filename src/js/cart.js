import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cartItems = document.querySelector(".product-list");

const shoppingCart = new ShoppingCart(cartItems);

shoppingCart.init();