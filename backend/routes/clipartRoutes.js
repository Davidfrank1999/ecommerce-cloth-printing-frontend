import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 Get all cliparts from Cloudinary
router.get("/", async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "cliparts/",   // 👈 must match your folder name in Cloudinary
      max_results: 50,
    });

    res.json(
      result.resources.map((r) => ({
        id: r.public_id,
        url: r.secure_url,
        format: r.format,
      }))
    );
  } catch (err) {
    console.error("❌ Error fetching cliparts:", err);
    res.status(500).json({ error: "Failed to fetch cliparts" });
  }
});

// 📌 Upload new clipart
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "cliparts",
    });

    res.json({
      id: result.public_id,
      url: result.secure_url,
      format: result.format,
    });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
