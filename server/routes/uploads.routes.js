import express from "express";
import cloudinary from "../lib/cloudinary.js";

const router = express.Router();

/**
 * POST /api/uploads
 * Body: { file: "data:image/png;base64,...." } OR remote image URL
 */
router.post("/", async (req, res) => {
  try {
    const { file, folder = "products" } = req.body;
    if (!file) return res.status(400).json({ error: "file required" });

    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "image",
    });

    return res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (e) {
    console.error("Upload error:", e);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
