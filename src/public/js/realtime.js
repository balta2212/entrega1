const socket = io();

const list = document.getElementById("list");
const form = document.getElementById("form");

socket.on("products", (products) => {
  list.innerHTML = "";

  products.forEach((p) => {
    list.innerHTML += `
      <li>
        ${p.title} - $${p.price}
        <button onclick="deleteProduct(${p.id})">X</button>
      </li>
    `;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
  };

  socket.emit("addProduct", product);
  form.reset();
});

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}
