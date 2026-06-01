// import necessary modules
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();


function formDataToJSON(formElement) {
    // convert the form data to a JSON object
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

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
        this.taxes = 0;
        this.shipping = 0;
        this.orderTotal = 0;
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

        this.taxes = this.subtotal * 0.06;
        this.shipping = calculateShipping(this.subtotal);
        this.orderTotal = this.subtotal + this.taxes + this.shipping;

        this.taxDisplay.textContent = this.taxes.toFixed(2);
        this.shippingDisplay.textContent = this.shipping.toFixed(2);
        this.totalDisplay.textContent = this.orderTotal.toFixed(2);
    }
    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.taxes;
        order.shipping = this.shipping;
        order.items = packageItems(this.cartItems);
        console.log(order);

        try {
            const response = await services.checkout(order);
            // if the response is successful, clear the cart and redirect to the confirmation page
            localStorage.removeItem("so-cart");
            window.location.href = "success.html";
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
}