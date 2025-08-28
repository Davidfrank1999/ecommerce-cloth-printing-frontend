import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams(); // order ID from URL
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch order:", err.response?.data || err);
        alert("Order not found or you are not authorized.");
        navigate("/orders"); // redirect back if error
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <p className="text-gray-600">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return null; // already redirected if not found
  }

  return (
    <div className="min-h-screen bg-background py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-text mb-4">
          Order Details #{order._id.slice(-6).toUpperCase()}
        </h1>

        <p className="text-sm text-gray-600 mb-2">
          Status: <span className="font-medium">{order.status}</span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Total Amount: ₹{order.totalAmount}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Ordered on: {new Date(order.createdAt).toLocaleDateString()}
        </p>

        <h2 className="text-xl font-semibold text-text mb-3">Shipping Address</h2>
        <p className="text-gray-700 mb-4">
          {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
          {order.shippingAddress.state} - {order.shippingAddress.pincode}
        </p>

        <h2 className="text-xl font-semibold text-text mb-3">Items</h2>
        <div className="divide-y divide-gray-200">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.product?.image || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <p className="font-medium text-text">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                  {item.size && (
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                  )}
                </div>
              </div>
              <p className="font-semibold text-text">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="mt-6 bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-accent transition"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
