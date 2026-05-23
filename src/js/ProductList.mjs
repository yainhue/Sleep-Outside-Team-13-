export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // 1. Fetch the data list
    const list = await this.dataSource.getData();

    // 2. Filter data by category (like 'tents')
    const filteredList = this.filterProducts(list);

    // 3. Render cards into the page list element
    this.renderList(filteredList);
  }

  filterProducts(list) {
    return list.filter(product => product.Category === this.category);
  }

  renderList(list) {
    const htmlStrings = list.map(product => this.productCardTemplate(product));
    this.listElement.innerHTML = htmlStrings.join("");
  }

  productCardTemplate(product) {
    // Calculate if the product is discounted per Trello card requirements
    const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
    const savings = isDiscounted ? (product.SuggestedRetailPrice - product.FinalPrice).toFixed(0) : 0;

    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
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
}
