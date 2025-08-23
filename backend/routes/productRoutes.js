// backend/routes/productRoutes.js
import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/Product.js";

const router = express.Router();

// Multer config (store file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: upload a buffer to Cloudinary
function uploadBufferToCloudinary(buffer, folder = "products") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });
}

/**
 * ✅ CREATE Product
 * @route POST /api/products
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const cloud = await uploadBufferToCloudinary(req.file.buffer, "products");

    const product = await Product.create({
      name,
      price,
      category,
      image: cloud.secure_url,
      imagePublicId: cloud.public_id,
    });

    res.json({ success: true, product });
  } catch (e) {
    console.error("❌ Create product error:", e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * ✅ READ all products
 * @route GET /api/products
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    console.error("❌ Fetch products error:", e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * ✅ READ single product
 * @route GET /api/products/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (e) {
    console.error("❌ Fetch product error:", e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * ✅ UPDATE product (with optional new image)
 * @route PUT /api/products/:id
 */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, status, inventory } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    // If new image uploaded, upload & replace
    if (req.file) {
      const cloud = await uploadBufferToCloudinary(req.file.buffer, "products");

      // Delete old image from Cloudinary if exists
      if (product.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(product.imagePublicId);
        } catch (e) {
          console.warn("⚠️ Cloudinary delete failed:", e.message);
        }
      }

      product.image = cloud.secure_url;
      product.imagePublicId = cloud.public_id;
    }

    // Update other fields
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (status !== undefined) product.status = status;
    if (inventory !== undefined) product.inventory = inventory;

    await product.save();
    res.json({ success: true, product });
  } catch (e) {
    console.error("❌ Update product error:", e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * ✅ DELETE product
 * @route DELETE /api/products/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete image from Cloudinary if exists
    if (product.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(product.imagePublicId);
      } catch (e) {
        console.warn("⚠️ Cloudinary delete failed:", e.message);
      }
    }

    await product.deleteOne();
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("❌ Delete product error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
