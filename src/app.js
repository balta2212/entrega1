import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js";

const app = express();
const PORT = 8080;

const productManager = new ProductManager("./src/data/products.json");

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Static
app.use(express.static("./src/public"));

// Router
app.use("/", viewsRouter);

// Server
const httpServer = app.listen(PORT, () =>
  console.log(`Servidor en puerto ${PORT}`),
);

// Socket.io
const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  socket.emit("products", await productManager.getProducts());

  socket.on("addProduct", async (product) => {
    await productManager.addProduct(product);
    io.emit("products", await productManager.getProducts());
  });

  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    io.emit("products", await productManager.getProducts());
  });
});
