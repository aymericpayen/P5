import { getAllProducts } from "./Utils/_services.js";

document.addEventListener("DOMContentLoaded", function (event) {
  async function init() {
    let allProducts = await getAllProducts();

    DisplayProducts(allProducts);
  }

  init();

  const DisplayProducts = (allProducts) => {
    const sectionitems = document.querySelector(".items");

    for (const product of allProducts) {
      sectionitems.innerHTML += `
      <a href="./html/product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
      `;
    }
  };
});
