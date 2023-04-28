class ClassCart {
  constructor(id, color, name, quantity) {
    this.id = id;
  }

  addProductToLocalStorage(basketValues) {
    const productExistingInLocalStorage = false;
    const product = [
      {
        idSelectedProduct: "107fb5b75607497b96722bda5b504926",
        selectedProductName: "Kanap Sinopé",
        colorSelectedProduct: "Blue",
        quantity: "1",
      },
    ];
    localStorage.setItem("products", JSON.stringify(product));

    let productsInStorage = JSON.parse(localStorage.getItem("products")) || [];
    if (productsInStorage.length > 0) {
      productsInStorage.forEach((product) => {
        if (product.id === basketValues.id) {
          if (
            product.colorSelectedProduct === basketValues.colorSelectedProduct
          ) {
          }
        }
      });
    } else {
      productsInStorage.push(basketValues);
      console.log(productsInStorage);
    }
  }
}
