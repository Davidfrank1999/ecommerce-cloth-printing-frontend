import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Package, Truck, Clock, XCircle } from "lucide-react";

const statusIcon = {
  Delivered: <Package className="text-green-600 w-5 h-5" />,
  Shipped: <Truck className="text-blue-500 w-5 h-5" />,
  Pending: <Clock className="text-yellow-500 w-5 h-5" />,
  Cancelled: <XCircle className="text-red-500 w-5 h-5" />,
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-text mb-6 text-center">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-lg">
            You have no orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow transition p-4 flex items-center gap-6"
              >
                <img
                  src={order.items[0]?.product?.image || "https://via.placeholder.com/100"}
                  alt={order.items[0]?.name || "Product"}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-text mb-1">
                    {order.items[0]?.name}{" "}
                    {order.items.length > 1 && (
                      <span className="text-sm text-gray-500">
                        + {order.items.length - 1} more
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    Order ID: <span className="text-gray-800">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    ₹{order.totalAmount} • Ordered on{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    {statusIcon[order.status] || statusIcon.Pending}
                    <span>{order.status}</span>
                  </div>
                  <Link
                    to={`/orders/${order._id}`}
                    className="mt-3 text-primary font-medium text-sm hover:underline inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
