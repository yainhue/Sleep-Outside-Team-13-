import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // 1. Fetch data asynchronously using the product ID
    this.product = await this.dataSource.findProductById(this.productId);
    
    // 2. Inject product info into existing HTML placeholders
    this.renderProductDetails();
    
    // 3. Attach standard click handler with correct binding context
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    // Select targets based on the specific IDs and tags in your index.html
    document.querySelector("h2").textContent = this.product.Brand.Name;
    document.querySelector("h3").textContent = this.product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    // Build path to images directory using standard property structures
    productImage.src = this.product.Images?.PrimaryLarge || this.product.Image;
    productImage.alt = this.product.NameWithoutBrand;

    document.getElementById("productPrice").textContent = `$${this.product.FinalPrice}`;
    document.getElementById("productColor").textContent = `Color: ${this.product.Colors?.[0]?.ColorName || "Default"}`;
    document.getElementById("productDesc").innerHTML = this.product.DescriptionHtmlSimple;

    // Synchronize the action button target ID attribute
    document.getElementById("addToCart").dataset.id = this.product.Id;
  }
}
