import {
  getFormElements,
  getLocalStorageElement,
  submitOrder,
} from "./Utils/_services.js";
import { getProductById } from "./Utils/_services.js";

document.addEventListener("DOMContentLoaded", function (event) {
  let productsAddedToCart = getLocalStorageElement();
  console.log(productsAddedToCart);
  async function init() {
    let sectionpushitem = document.querySelector("#cart__items");
    let buttonOrder = document.querySelector("#order");

    // Inserting line for each items in the cart
    for (let i = 0; i < productsAddedToCart.length; i++) {
      let productAddedToCart = JSON.parse(
        productsAddedToCart.getItem(productsAddedToCart.key(i))
      );
      let productData = await getProductById(productAddedToCart.id);

      let cartClassItem = new Cartclass(
        productAddedToCart.id,
        productAddedToCart.name,
        productAddedToCart.colors,
        productAddedToCart.quantity,
        productData.price,
        productData.imageUrl,
        productData.altTxt
      );
      let cartItem = cartClassItem.createCartItemView();
      sectionpushitem.appendChild(cartItem);
    }

    deleteClick();
    changeQuantity();
    displayTotal();

    // Order button
    buttonOrder.addEventListener("click", (event) => {
      event.preventDefault();
      let contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
      };
      console.log(localStorage.length > 0);
      if (
        firstNameControl(contact.firstName) &&
        lastNameControl(contact.lastName) &&
        addressControl(contact.address) &&
        cityControl(contact.city) &&
        emailControl(contact.email)
      ) {
        if (localStorage.length > 0) {
          localStorage.setItem("form", JSON.stringify(contact));
          let form = getFormElements();
          submitOrder(form);
        } else {
          alert("Votre panier est vide");
        }
      } else {
        alert(
          "Un ou plusieurs champs du formulaire sont incomplets ou incorrecte"
        );
      }
    });
  }
  init();

  function firstNameControl(firstName) {
    const regExFirstName = (value) => {
      return /^\b[A-ZÀ-ÿ]+[-a-zA-ZÀ-ÿ. ']{1,29}$/.test(value);
    };
    let inputFirstName = document.querySelector("#firstName");
    inputFirstName.style.borderWidth = "4px";
    inputFirstName.style.borderStyle = "solid";
    if (regExFirstName(firstName)) {
      inputFirstName.style.borderColor = "green";

      document.querySelector("#firstNameErrorMsg").textContent = "";
      return true;
    } else {
      inputFirstName.style.borderColor = "#FFC300";

      document.querySelector("#firstNameErrorMsg").textContent =
        "Veuillez saisir une prénom valide (ex: Jean)";
      return false;
    }
  }

  function lastNameControl(lastName) {
    const regExlastName = (value) => {
      return /^\b[A-ZÀ-ÿ]+[-a-zA-ZÀ-ÿ. ']{1,29}$/.test(value);
    };
    let inputlastName = document.querySelector("#lastName");
    inputlastName.style.borderWidth = "4px";
    inputlastName.style.borderStyle = "solid";
    if (regExlastName(lastName)) {
      inputlastName.style.borderColor = "green";

      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    } else {
      inputlastName.style.borderColor = "#FFC300";

      document.querySelector("#lastNameErrorMsg").textContent =
        "Veuillez saisir une nom valide (ex: De La Fontaine)";
      return false;
    }
  }

  function addressControl(address) {
    const regExAddress = (value) => {
      return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
    };
    let inputAddress = document.querySelector("#address");
    inputAddress.style.borderWidth = "4px";
    inputAddress.style.borderStyle = "solid";
    if (regExAddress(address)) {
      inputAddress.style.borderColor = "green";

      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    } else {
      inputAddress.style.borderColor = "#FFC300";

      document.querySelector("#addressErrorMsg").textContent =
        "Veuillez saisir une adresse valable (ex: 1 rue de la Paix)";
      return false;
    }
  }

  function cityControl(city) {
    const regExCity = (value) => {
      return /^\b[A-ZÀ-ÿ]+[-a-zA-ZÀ-ÿ. ']{1,29}$/.test(value);
    };
    let inputCity = document.querySelector("#city");
    inputCity.style.borderWidth = "4px";
    inputCity.style.borderStyle = "solid";
    if (regExCity(city)) {
      inputCity.style.borderColor = "green";

      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    } else {
      inputCity.style.borderColor = "#FFC300";

      document.querySelector("#cityErrorMsg").textContent =
        "Veuillez saisir une adresse valable (ex: 1 rue de la Paix)";
      return false;
    }
  }

  function emailControl(email) {
    const regExEmail = (value) => {
      return /^\S+@\S+\.\S+$/.test(value);
    };
    let inputEmail = document.querySelector("#email");
    inputEmail.style.borderWidth = "4px";
    inputEmail.style.borderStyle = "solid";
    if (regExEmail(email)) {
      inputEmail.style.borderColor = "green";

      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    } else {
      inputEmail.style.borderColor = "#FFC300";

      document.querySelector("#emailErrorMsg").textContent =
        "Veuillez saisir une adresse email valable (ex: support@google.com)";
      return false;
    }
  }

  function deleteClick() {
    let deleteButtons = document.querySelectorAll(".deleteItem");
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        let deleteName = event.target.getAttribute("data-name");
        let deleteColor = event.target.getAttribute("data-color");
        let deleteItemReference = deleteName + " " + deleteColor;
        localStorage.removeItem(deleteItemReference);
        // location.reload();
        deleteButton.closest("article.cart__item").remove();
        displayTotal();
        alert("Article supprimé du panier.");
      });
    });
  }

  function changeQuantity() {
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

        // location.reload();
        let cartClass = new Cartclass(
          itemObject.id,
          itemObject.name,
          itemObject.color,
          itemObject.quantity,
          itemObject.price,
          itemObject.imageUrl,
          itemObject.altTxt
        );
        cartClass.createCartItemView();
        displayTotal();
        alert("Quantité modifiée.");
      });
    });
  }

  async function displayTotal() {
    const DOMtotalQuantity = document.getElementById("totalQuantity");
    const DOMtotalPrice = document.getElementById("totalPrice");
    let totalPrice = 0;
    let totalQuantity = 0;

    let productsAddedToCart = getLocalStorageElement();
    for (let i = 0; i < productsAddedToCart.length; i++) {
      let productAddedToCart = JSON.parse(
        productsAddedToCart.getItem(productsAddedToCart.key(i))
      );
      let productData = await getProductById(productAddedToCart.id);

      totalPrice += productAddedToCart.quantity * productData.price;
      totalQuantity += parseInt(productAddedToCart.quantity);
    }

    DOMtotalQuantity.innerText = totalQuantity;
    DOMtotalPrice.innerText = totalPrice;
  }
});
