class Cartclass {
  constructor(id, name, color, quantity, price, imageUrl, altTxt) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.quantity = quantity;
    this.price = price;
    this.imageUrl = imageUrl;
    this.altTxt = altTxt;
  }
  createCartItemView() {
    const article = document.createElement("article");
    article.insertAdjacentHTML(
      "beforeend",
      `<article
                class="cart__item"
                data-name="${this.name}"
                data-color="${this.color}"
              >
                <div class="cart__item__img">
                  <img
                    src="${this.imageUrl}"
                    alt="${this.altTxt}"
                  />
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${this.name}</h2>
                    <p>${this.color}</p>
                    <p>${this.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <input
                        data-name="${this.name}"
                        data-color="${this.color}"
                        type="number"
                        class="itemQuantity"
                        name="itemQuantity"
                        min="1"
                        max="100"
                        value="${this.quantity}"
                      />
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p  data-name="${this.name}" data-color="${this.color}" class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
    );
    return article;
  }
  deleteClick() {
    let deleteButtons = document.querySelectorAll(".deleteItem");
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        let deleteName = event.target.getAttribute("data-name");
        let deleteColor = event.target.getAttribute("data-color");
        let deleteItemReference = deleteName + " " + deleteColor;
        localStorage.removeItem(deleteItemReference);
        location.reload();
        alert("Article supprimé du panier.");
      });
    });
  }

  changeQuantity() {
    let quantityInputs = document.querySelectorAll(".itemQuantity");
    quantityInputs.forEach((quantityInput) => {
      quantityInput.addEventListener("change", (event) => {
        event.preventDefault();
        let quantityName = event.target.getAttribute("data-name");
        let quantityColor = event.target.getAttribute("data-color");
        let quantityItemReference = quantityName + " " + quantityColor;
        let localStorageItem = localStorage.getItem(quantityItemReference);
        let itemObject = JSON.parse(localStorageItem);
        itemObject.quantity = quantityInput.value;
        const updatedItemString = JSON.stringify(itemObject);
        localStorage.setItem(quantityItemReference, updatedItemString);
        location.reload();
        alert("Quantité modifiée.");
      });
    });
  }
}
