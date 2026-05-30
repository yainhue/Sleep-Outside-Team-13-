import { renderListWithTemplate, getProductListImage } from "./utils.mjs";

function productCardTemplate(product) {
  const Discounted =  product.SuggestedRetailPrice && product.FinalPrice < product.SuggestedRetailPrice;
  const image = getProductListImage(product);
  return `
    <li class="product-card">
      ${Discounted ? `<span class="discount-badge">SALE</span>` : ""}
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${image}" alt="Image of ${product.NameWithoutBrand}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        <p class="new-price">
          ${
            Discounted
              ? `<span class="old-price">$${product.SuggestedRetailPrice}</span>`
              : ""
          }
          $${product.FinalPrice}
        </p>
      </a>
    </li>
  `;
}
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

    renderList(list) {
      renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }
}