import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, index: true },
    images: [{ type: String }], // cloudinary URLs
    sizes: [{ type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"] }],
    colors: [{ type: String }],
    stock: { type: Number, default: 100 },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
