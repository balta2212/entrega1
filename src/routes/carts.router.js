import { Router } from "express";
import Cart from "../models/cart.model.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const cart = await Cart.create({ products: [] });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate(
      "products.product",
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);

    const product = cart.products.find(
      (p) => p.product.toString() === req.params.pid,
    );

    if (product) {
      product.quantity++;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== req.params.pid,
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const updated = await Cart.findByIdAndUpdate(
      req.params.cid,
      { products: req.body.products },
      { new: true },
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findById(req.params.cid);

    const product = cart.products.find(
      (p) => p.product.toString() === req.params.pid,
    );

    if (product) product.quantity = quantity;

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    cart.products = [];
    await cart.save();

    res.json({ message: "Carrito vaciado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
