// frontend/src/components/admin/ProductTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableRow from "./ProductTableRow";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null); // product being edited
  const [form, setForm] = useState({ name: "", price: "", category: "", status: "Active", inventory: "" });

  // Fetch products
  useEffect(() => {
    (async function fetchProducts() {
      try {
        const res = await axios.get(`${API}/api/products`);
        setProducts(res.data);
      } catch (e) {
        console.error("Error fetching products:", e);
      }
    })();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API}/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      console.error("Delete failed:", e);
      alert("Failed to delete product");
    }
  };

  // Open edit modal
  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "",
      status: product.status || "Active",
      inventory: product.inventory ?? "",
    });
  };

  const closeEdit = () => {
    setEditing(null);
  };

  // Submit update (fields only; no image here)
  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API}/api/products/${editing._id}`, {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        status: form.status,
        inventory: Number(form.inventory) || 0,
      });

      // update UI
      setProducts((prev) =>
        prev.map((p) => (p._id === editing._id ? res.data.product : p))
      );
      closeEdit();
    } catch (e) {
      console.error("Update failed:", e);
      alert("Failed to update product");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <ProductTableHeader />

      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left text-gray-600">
          <tr>
            <th className="p-3">Product</th>
            <th className="p-3">Status</th>
            <th className="p-3">Inventory</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((product) => (
              <ProductTableRow
                key={product._id}
                id={product._id}
                imageUrl={product.image}
                name={product.name}
                status={product.status}
                inventory={product.inventory}
                category={product.category}
                price={product.price}
                onDelete={() => handleDelete(product._id)}
                onEdit={() => openEdit(product)}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-8 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
            <form onSubmit={submitEdit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Price (₹)</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Status</label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Inventory</label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    value={form.inventory}
                    onChange={(e) => setForm((f) => ({ ...f, inventory: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              * Image editing will be added later (upload & replace).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
