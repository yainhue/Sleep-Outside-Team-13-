// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

  export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement, null, updateCartCount);
  renderWithTemplate(footerTemplate, footerElement);
}

export function getProductListImage(product) {
  if (product.Images?.PrimaryMedium) {
    return product.Images.PrimaryMedium;
  }

  if (product.Images?.PrimaryLarge) {
    return product.Images.PrimaryLarge;
  }

  return product.Image.replace("..", "");
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.Qty,
    0
  );

  const cartCount = document.querySelector(".cart-count");

  if (cartCount) {
    if (totalItems > 0) {
      cartCount.classList.remove("hide");
      cartCount.textContent = totalItems;
    } else {
      cartCount.classList.add("hide");
    }
  }
}