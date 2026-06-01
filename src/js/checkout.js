// imports as needed
import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
loadHeaderFooter();

const zipInput = document.querySelector("#zip");
const checkout = new CheckoutProcess();

checkout.displaySubtotal();

// listen to changes in the zip code input, and if it's valid, display the tax, shipping, and total amounts
zipInput.addEventListener("input", () => {
  if (zipInput.checkValidity()) {
    console.log("displaying tax, shipping, and total");
    checkout.displayTaxShippingTotal();
  }
});

// listen for the submit button to be clicked, and when it is, send the order data to the server
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  checkout.checkout();
});
