import React from 'react';
import { Package, Truck, Clock, XCircle } from 'lucide-react';

const orders = [
  {
    id: 'ORD1234567890',
    product: {
      name: 'Men Printed T-shirt',
      image: 'https://via.placeholder.com/100x100.png?text=T-shirt',
      size: 'M',
      price: 599,
    },
    status: 'Delivered',
    date: '2024-07-15',
  },
  {
    id: 'ORD0987654321',
    product: {
      name: 'Women Hoodie',
      image: 'https://via.placeholder.com/100x100.png?text=Hoodie',
      size: 'L',
      price: 1199,
    },
    status: 'Shipped',
    date: '2024-07-18',
  },
  {
    id: 'ORD4567891230',
    product: {
      name: 'Kids Sweatshirt',
      image: 'https://via.placeholder.com/100x100.png?text=Kids',
      size: 'XS',
      price: 799,
    },
    status: 'Cancelled',
    date: '2024-07-10',
  },
];

const statusIcon = {
  Delivered: <Package className="text-green-600 w-5 h-5" />,
  Shipped: <Truck className="text-blue-500 w-5 h-5" />,
  Pending: <Clock className="text-yellow-500 w-5 h-5" />,
  Cancelled: <XCircle className="text-red-500 w-5 h-5" />,
};

const OrderHistory = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-text mb-6">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-lg">
            You haven’t placed any orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow transition p-4 flex items-center gap-6"
              >
                <img
                  src={order.product.image}
                  alt={order.product.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-text mb-1">
                    {order.product.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    Order ID: <span className="text-gray-800">{order.id}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Size: <span className="text-gray-800">{order.product.size}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    ₹{order.product.price} • Ordered on {order.date}
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    {statusIcon[order.status]}
                    <span>{order.status}</span>
                  </div>
                  <button className="mt-3 text-primary font-medium text-sm hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;