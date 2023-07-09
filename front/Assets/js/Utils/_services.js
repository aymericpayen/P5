export async function getAllProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id) {
  let urlProductId = `http://localhost:3000/api/products/${id}`;
  try {
    const response = await fetch(urlProductId);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export function getLocalStorageElement() {
  return localStorage;
}

export function getBasketElements() {
  let basket = [];

  for (let i = 0; i < localStorage.length - 1; i++) {
    if (localStorage.getItem(localStorage.key(i)) !== "form") {
      basket.push({
        id: JSON.parse(localStorage.getItem(localStorage.key(i))).id,
        color: JSON.parse(localStorage.getItem(localStorage.key(i))).colors,
        quantity: JSON.parse(localStorage.getItem(localStorage.key(i)))
          .quantity,
      });
    }
  }
  return basket;
}

export function getFormElements(form) {
  return JSON.parse(localStorage.getItem("form"));
}

export function submitOrder(contact) {
  let basket = getBasketElements();
  let products = [];
  for (let product of basket) {
    products.push(product.id);
  }

  let orderData = { contact, products };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      document.location.href = `confirmation.html?id=${data.orderId}`;
      localStorage.clear();
    });
  console.log("ok");
}
