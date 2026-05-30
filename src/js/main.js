import { loadHeaderFooter } from "./utils.mjs";

// Initialize the dynamic header and footer components on page load
loadHeaderFooter();

// =========================================================================
// CUSTOM TRELLO TASK: NEWSLETTER SIGNUP INTERACTIVITY
// =========================================================================
document.getElementById("newsletter-form")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop the page from reloading on form submit

    const emailInput = document.getElementById("newsletter-email");
    const messageBox = document.getElementById("newsletter-message");

    if (emailInput && messageBox) {
        const userEmail = emailInput.value;

        // Display a customized confirmation notice to the customer
        messageBox.textContent = `Thank you for subscribing with ${userEmail}! Check your inbox soon for your welcome offer.`;
        messageBox.style.color = "#305736";
        messageBox.style.display = "block";

        // Clear out the input field area
        emailInput.value = "";
    }
});
// =========================================================================
