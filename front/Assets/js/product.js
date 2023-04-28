import { getProductById } from "./Utils/_services.js";

document.addEventListener("DOMContentLoaded", function (event) {
  let url = new URL(location.href);
  let idProduct = url.searchParams.get("id");
  async function init() {
    let sectionpushitem = document.querySelector(".item");

    let product = await getProductById(idProduct);

    let productclass = new Productclass(product);
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
    ClickBtn(product);
  }

  init();

  function ChangeTitleSite(product) {}

  function ClickBtn(product) {
    let BtnPanier = document.getElementById("addToCart");
    let productclass = new Productclass(product);
    BtnPanier.addEventListener("click", (e) => {
      e.preventDefault();

      const selectedColor = document.getElementById("colors").value;
      const selectedQuantity = document.getElementById("quantity").value;
      const selectedProductName = document
        .getElementById("title")
        .innerText.trim();
      if (
        selectedColor !== "" &&
        selectedQuantity > 0 &&
        selectedQuantity <= 100
      ) {
        const basketValues = {
          idSelectedProduct: idProduct,
          selectedProductName: selectedProductName,
          colorSelectedProduct: selectedColor,
          quantity: selectedQuantity,
        };
        productclass.addProductToLocalStorage(basketValues);
      }
    });
  }
});
