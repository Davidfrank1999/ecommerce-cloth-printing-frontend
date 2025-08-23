import { useEffect, useState } from "react";
import axios from "axios";
import ProductHeader from "../../components/admin/ProductHeader";
import ProductTable from "../../components/admin/ProductTable";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  // ✅ Edit product (basic redirect to edit form)
  const editProduct = (id) => {
    // if you have /admin/upload also handle edit, redirect there
    window.location.href = `/admin/upload?id=${id}`;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="admin-products p-6">
      <ProductHeader fetchProducts={fetchProducts} />
      <ProductTable 
        products={products} 
        onDelete={deleteProduct} 
        onEdit={editProduct} 
      />
    </div>
  );
}
