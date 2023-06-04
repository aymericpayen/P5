import { getLocalStorageElement } from "./Utils/_services.js";
import { getProductById } from "./Utils/_services.js";

document.addEventListener("DOMContentLoaded", function (event) {
  let productsAddedToCart = getLocalStorageElement();
  console.log(productsAddedToCart);
  async function init() {
    let totalPrice = 0;
    let totalQuantity = 0;
    let sectionpushitem = document.querySelector("#cart__items");
    let sectionpushtotal = document.querySelector(".cart__price");
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
      totalPrice += productAddedToCart.quantity * productData.price;
      totalQuantity += parseInt(productAddedToCart.quantity);
      sectionpushitem.appendChild(cartItem);
    }

    // Inserting total price + quantity
    sectionpushtotal.insertAdjacentHTML(
      "beforeend",
      `<p>
      Total (<span id="totalQuantity">${totalQuantity}</span> articles) :
      <span id="totalPrice">${totalPrice}</span> €
    </p>`
    );

    let cartClass = new Cartclass();
    cartClass.deleteClick();
    cartClass.changeQuantity();

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
      console.log(contact);
      firstNameControl(contact.firstName);
      if (
        firstNameControl(contact.firstName) &&
        lastNameControl(contact.lastName) &&
        addressControl(contact.address) &&
        emailControl(contact.email) &&
        cityControl(contact.city)
      ) {
        console.log("ok");
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
        "Veuillez saisir une adresse valable (ex: 1 rue de la Paix)";
      return false;
    }
  }
});
