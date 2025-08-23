import React, { useState } from "react";
import axios from "axios";

const UploadProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("⚠️ Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      setLoading(true);

      // ✅ Correct endpoint: /api/products
      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product uploaded successfully!");
      console.log("Uploaded:", res.data);

      // reset form
      setName("");
      setPrice("");
      setCategory("Men");
      setImage(null);
      e.target.reset();
    } catch (err) {
      console.error("❌ Upload failed:", err.response?.data || err.message);
      alert("❌ Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800">Upload Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-3 rounded"
          accept="image/*"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer w-full text-white py-3 rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;
