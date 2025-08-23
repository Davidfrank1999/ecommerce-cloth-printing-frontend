import express from "express";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

router.get("/signature", async (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Generate signature with your secret
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "products" },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
});

export default router;
