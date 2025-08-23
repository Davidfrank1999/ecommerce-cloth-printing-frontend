import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Create product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
});

// List
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get one
router.get("/:id", async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (e) {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;
