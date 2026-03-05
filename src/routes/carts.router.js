import { Router } from "express";
import Cart from "../models/cart.model.js";

const router = Router();

router.post("/", async (req, res) => {
  const newCart = await Cart.create({ products: [] });
  res.status(201).json(newCart);
});

router.get("/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid)
    .populate("products.product")
    .lean();

  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

  res.json(cart);
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid);

  const existingProduct = cart.products.find(
    (p) => p.product.toString() === req.params.pid,
  );

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.products.push({ product: req.params.pid });
  }

  await cart.save();
  res.json(cart);
});

export default router;
