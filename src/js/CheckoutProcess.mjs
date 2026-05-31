// import necessary modules
import { getLocalStorage } from "./utils.mjs";


export default class CheckoutProcess {
    constructor() {
        // define the elements
        this.subtotalDisplay = document.querySelector("#subtotal");
        this.taxDisplay = document.querySelector("#tax");
        this.shippingDisplay = document.querySelector("#shipping");
        this.totalDisplay = document.querySelector("#total");
        this.cartItems = getLocalStorage("so-cart");

        // initialize the variables
        this.subtotal = 0;
    }

    displaySubtotal() {
        // calculate the subtotal
        this.cartItems.forEach(item => {

            // multiply the price of each item by its quantity and add it to the total counter
            this.subtotal += item.FinalPrice * item.qty;

        });

        // display subtotal
        this.subtotalDisplay.textContent = this.subtotal.toFixed(2);
    }

    displayTaxShippingTotal() {

        const calculateShipping = (subtotal) => {
            let shippingEstimate = 0

            // for each item in the cart, if it's the first item add $10, for addtional items add $2
            this.cartItems.forEach(item => {

                if (this.cartItems.findIndex(searchItem => searchItem.Id === item.Id) === 0) {
                    console.log(`${item.Id} is the first item in cart, adding $10 to shipping estimate`);
                    shippingEstimate += 10;
                } else {
                    console.log(`${item.Id} is not the first item in cart, adding $2 to shipping estimate`);
                    shippingEstimate += 2;
                }
            });

            return shippingEstimate
        };

        let taxes = this.subtotal * 0.06;
        let shippingEstimate = calculateShipping(this.subtotal);

        this.taxDisplay.textContent = taxes.toFixed(2);
        this.shippingDisplay.textContent = shippingEstimate.toFixed(2);
        this.totalDisplay.textContent = (this.subtotal + taxes + shippingEstimate).toFixed(2);
    }
}