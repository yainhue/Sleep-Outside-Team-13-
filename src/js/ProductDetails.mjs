import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    document.querySelector('h2').textContent = this.product.Brand.Name;
    document.querySelector('h3').textContent = this.product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    // Clean the image path to use the hosted root directory
    const cleanImageSrc = this.product.Image.replace('../', '/').replace('src/public/', '/');
    productImage.src = cleanImageSrc;
    productImage.alt = this.product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = `$${this.product.FinalPrice}`;
    
    // FIXED: Removed the extra syntax dot that was crashing the app
    document.getElementById('productColor').textContent = this.product.Colors?.[0]?.ColorName || "Default";
    document.getElementById('productDesc').innerHTML = this.product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = this.product.Id;
  }
}
