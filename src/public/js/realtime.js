const socket = io();

const productList = document.getElementById("productList");

socket.on("products", (data) => {
  productList.innerHTML = "";

  data.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.title} - $${product.price}`;
    productList.appendChild(li);
  });
});
