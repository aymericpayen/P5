class Productclass {
  constructor(data) {
    const { _id, colors, name, price, imageUrl, description, altTxt } = data;
    this.id = _id;
    this.colors = colors;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
  }

  createViewOneProduct() {
    const article = document.createElement("article");
    article.insertAdjacentHTML(
      "beforeend",
      `
            <div class="item__img" id="productImage">
              <img src="${this.imageUrl}" alt="${this.altTxt}">
            </div>
            <div class="item__content">
              <div class="item__content__titlePrice">
                <h1 id="title">${this.name}</h1>
                <p>
                  Prix : <span id="price">${this.price}€</span>
                </p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">
                  ${this.description}
                </p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                    <option value="">--SVP, choisissez une couleur --</option>
                    ${displayColorsDropdown(this.colors)}
                    }
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity"
                    >Nombre d'article(s) (1-100) :</label
                  >
                  <input
                    type="number"
                    name="itemQuantity"
                    min="1"
                    max="100"
                    value="0"
                    id="quantity"
                  />
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>
            </div>
      `
    );

    function displayColorsDropdown(colors) {
      let listcolors = "";
      for (const color of colors) {
        listcolors += `<option value=${color}>${color}</option>`;
      }
      return listcolors;
    }

    return article;
  }

  addProductToLocalStorage(basketValues) {
    let productAlreadyInBasket = false;
    let productsInStorage = JSON.parse(localStorage.getItem("products")) || [];
    console.log(productsInStorage);
    if (productsInStorage.length > 0) {
      for (let i = 0; i < productsInStorage.length; i++) {
        if (
          productsInStorage[i].id === basketValues.id &&
          productsInStorage[i].colorSelectedProduct ===
            basketValues.colorSelectedProduct
        ) {
          productsInStorage[i].quantity =
            parseInt(productsInStorage[i].quantity) +
            parseInt(basketValues.quantity);
          console.log(productsInStorage);
          productAlreadyInBasket = true;
        }
      }
    } else {
      productsInStorage.push(basketValues);
    }
    console.log(productsInStorage);
    if (!productAlreadyInBasket) {
      productsInStorage.push(basketValues);
    }
    localStorage.setItem("products", JSON.stringify(productsInStorage));
    console.log(localStorage);
  }
}
