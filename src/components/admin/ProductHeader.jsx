import { useNavigate } from "react-router-dom";

export default function ProductHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl text-gray-600 font-semibold">Products</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/admin/upload")} // ✅ redirect to upload page
          className="cursor-pointer bg-[#33302c] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#55514c] transition"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
  