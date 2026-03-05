import { Router } from "express";
import Product from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const products = await Product.paginate(
    {},
    { limit: parseInt(limit), page: parseInt(page), lean: true },
  );

  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const product = await Product.findById(req.params.pid).lean();

  if (!product) return res.status(404).json({ error: "No encontrado" });

  res.json(product);
});

router.post("/", async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
});

router.delete("/:pid", async (req, res) => {
  await Product.findByIdAndDelete(req.params.pid);
  res.json({ message: "Producto eliminado" });
});

export default router;
