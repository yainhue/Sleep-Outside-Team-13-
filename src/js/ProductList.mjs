import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    // Vite strips away the '/public' part of the path automatically.
    // We clean the path to start directly from '/images/'
    const imageSrc = product.Image.replace('../', '/').replace('src/public/', '/');

    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img
                src="${imageSrc}"
                alt="Image of ${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.ListPrice}</p>
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
        const list = await this.dataSource.getData();
        this.listElement.innerHTML = "";
        renderListWithTemplate(productCardTemplate, this.listElement, list, "beforeend", true);
    }
}
