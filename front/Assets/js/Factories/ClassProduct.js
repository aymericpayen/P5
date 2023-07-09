class Productclass {
  constructor(
    id,
    name,
    colors,
    quantity,
    price,
    imageUrl,
    description,
    altTxt
  ) {
    this.id = id;
    this.name = name;
    this.colors = colors;
    this.quantity = quantity;
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
  ButtonClick(product) {
    let colorChoosen = "";
    let quantityChoosen = "";
    let quantity = "";
    let BtnPanier = document.getElementById("addToCart");

    let colorSelection = document.getElementById("colors");
    colorSelection.addEventListener("change", function (e) {
      colorChoosen = e.target.value;
    });

    let quantitySelection = document.getElementById("quantity");
    quantitySelection.addEventListener("change", function (e) {
      quantity = e.target.value;
    });

    BtnPanier.addEventListener("click", function () {
      let ProductLocalStorage = [];
      let oldQuantity = 0;

      for (let i = 0; i < localStorage.length; i++) {
        ProductLocalStorage[i] = JSON.parse(
          localStorage.getItem(localStorage.key(i))
        );
        if (
          product._id === ProductLocalStorage[i].id &&
          colorChoosen === ProductLocalStorage[i].colors
        ) {
          oldQuantity = ProductLocalStorage[i].quantity;
        }
      }

      quantityChoosen = parseInt(oldQuantity) + parseInt(quantity);

      let productChoosen = new Productclass(
        product._id,
        product.name,
        colorChoosen,
        quantityChoosen
      );
      if (colorChoosen != "" && quantity >= 1 && quantityChoosen <= 100) {
        localStorage.setItem(
          product.name + " " + colorChoosen,
          JSON.stringify(productChoosen)
        );
        alert("Produit rajouté!");
      } else if (quantityChoosen > 100) {
        alert(
          "La quantité d'article rajouté au panier ne peut etre supérieur a 100"
        );
      } else if (quantity == 0) {
        alert(
          "La quantité d'article rajouté au panier doit être supérieur a 0"
        );
      } else {
        alert(
          "Veuillez renseigner une couleur et une quantité (>0 et <100) avant de rajouter un article au panier"
        );
      }
    });
  }
}
