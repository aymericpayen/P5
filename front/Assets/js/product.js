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

    // ChangeTitleSite(product); TO DO
    // const productseed = [
    //   {
    //     idSelectedProduct: "107fb5b75607497b96722bda5b504926",
    //     selectedProductName: "Kanap Sinopé",
    //     colorSelectedProduct: "Blue",
    //     quantity: 1,
    //   },
    // ];
    // localStorage.setItem("products", JSON.stringify(productseed));
    productclass.ButtonClick(product);
  }

  init();

  function ChangeTitleSite(product) {}
});
