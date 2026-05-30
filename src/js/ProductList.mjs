import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Your week 2 discount calculation logic
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const savings = isDiscounted ? (product.SuggestedRetailPrice - product.FinalPrice).toFixed(0) : 0;

  // Uses team's pathing (/product_pages/?product=) and fallback to product.Images.PrimaryMedium or product.Image
  const imageSrc = product.Images?.PrimaryMedium || product.Image;

  return `<li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
              <img
                src="${imageSrc}"
                alt="Image of ${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p>
              
              <!-- Dynamic Discount Indicator -->
              ${isDiscounted ? `
                <span class="discount-badge" style="background-color: #8a470c; color: white; display: inline-block; padding: 2px 6px; font-size: 0.75em; font-weight: bold; border-radius: 3px; margin-top: 5px;">
                  Save $${savings}!
                </span>
              ` : ""}
            </a>
          </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // 1. Fetch the data list using the team's streamlined parameter approach
    const list = await this.dataSource.getData(this.category);

    // 2. Clear out the list element before we add to it
    this.listElement.innerHTML = "";

    // 3. Render the list using the team's reusable utility template function
    renderListWithTemplate(productCardTemplate, this.listElement, list, "beforeend", true);
  }
}
