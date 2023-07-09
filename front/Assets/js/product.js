import { getProductById } from "./Utils/_services.js";

document.addEventListener("DOMContentLoaded", function (event) {
  let url = new URL(location.href);
  let idProduct = url.searchParams.get("id");
  async function init() {
    let sectionpushitem = document.querySelector(".item");

    let product = await getProductById(idProduct);
    console.log(product);

    //Building instance of product to display
    let productclass = new Productclass(
      product._id,
      product.name,
      product.colors,
      product.quantity,
      product.price,
      product.imageUrl,
      product.description,
      product.altTxt
    );

    //Building the html data to display
    let article = productclass.createViewOneProduct();
    sectionpushitem.appendChild(article);

    productclass.ButtonClick(product);
  }

  init();
});
