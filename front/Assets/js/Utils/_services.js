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
export async function getPriceFromProductId(id) {}
