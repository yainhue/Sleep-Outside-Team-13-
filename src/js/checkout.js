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







// const subtotalDisplay = document.querySelector("#subtotal");
// const taxDisplay = document.querySelector("#tax");
// const shippingDisplay = document.querySelector("#shipping");
// const totalDisplay = document.querySelector("#total");

// function fillOrderSummary() {
//     const cartItems = getLocalStorage("so-cart");

//     // add up the total price of the items in the cart and display it
//     let subtotal = 0;
//     cartItems.forEach(item => {

//         // multiply the price of each item by its quantity and add it to the total counter
//         subtotal += item.FinalPrice * item.qty;

//     });

//     const calculateShipping = function (subtotal) {
//         let shippingEstimate = 0

//         // for each item in the cart, if it's the first item add $10, for addtional items add $2
//         cartItems.forEach(item => {

//             if (cartItems.findIndex(searchItem => searchItem.Id === item.Id) === 0) {
//                 console.log(`${item.Id} is the first item in cart, adding $10 to shipping estimate`);
//                 shippingEstimate += 10;
//             } else {
//                 console.log(`${item.Id} is not the first item in cart, adding $2 to shipping estimate`);
//                 shippingEstimate += 2;
//             }
//         });

//         return shippingEstimate
//     };

//     let taxes = subtotal * 0.06;
//     let shippingEstimate = calculateShipping(subtotal);

//     subtotalDisplay.textContent = subtotal.toFixed(2);
//     taxDisplay.textContent = taxes.toFixed(2);
//     shippingDisplay.textContent = shippingEstimate.toFixed(2);
//     totalDisplay.textContent = (subtotal + taxes + shippingEstimate).toFixed(2);
// }

// fillOrderSummary();
