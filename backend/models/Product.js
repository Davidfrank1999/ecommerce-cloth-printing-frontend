// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },         // Cloudinary URL
    imagePublicId: { type: String },                 // ✅ Needed to delete/replace
    category: { type: String, required: true },
    status: { type: String, default: "Active" },     // optional
    inventory: { type: Number, default: 0 },         // optional
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
