// frontend/src/components/admin/ProductTableRow.jsx
export default function ProductTableRow({
  imageUrl,
  name,
  status,
  inventory,
  category,
  price,
  onDelete,
  onEdit,
}) {
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 text-sm">
      {/* Product */}
      <td className="p-3 flex items-center gap-3">
        <img src={imageUrl} alt={name} className="w-10 h-10 rounded object-cover border" />
        <span className="font-medium text-gray-800">{name}</span>
      </td>

      {/* Status */}
      <td className="p-3">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
          }`}
        >
          {status || "Active"}
        </span>
      </td>

      {/* Inventory */}
      <td className="p-3 text-gray-600">{inventory ?? "—"}</td>

      {/* Category */}
      <td className="p-3 text-gray-700">{category}</td>

      {/* Price */}
      <td className="p-3 font-semibold text-gray-900">₹{price}</td>

      {/* Actions */}
      <td className="p-3">
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
