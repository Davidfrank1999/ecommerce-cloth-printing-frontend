import { useCart } from '../../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const shippingCharge = 50;
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const grandTotal = totalPrice + shippingCharge;

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.name}-${item.size}-${index}`}
                className="flex flex-col sm:flex-row gap-4 border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-40 h-40 object-cover rounded"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600 mt-1">₹{item.price} each</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.name, item.size, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 border rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.name, item.size, item.quantity + 1)
                        }
                        className="w-8 h-8 border rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id, item.name, item.size)}
                      className="text-sm text-red-500 font-medium hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right text-lg font-semibold text-indigo-600">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm h-fit sticky top-10 bg-white">
            <h2 className="text-xl mb-4 text-gray-800 font-bold">Order Summary</h2>
            <hr className="mb-4" />
            <div className="flex justify-between text-gray-700 mb-3">
              <span className="text-lg font-medium">Subtotal</span>
              <span className="text-lg font-medium text-gray-900">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-3">
              <span className="text-lg font-medium">Shipping</span>
              <span className="text-lg font-medium text-gray-900">₹{shippingCharge}</span>
            </div>
            <div className="flex justify-between text-gray-800 border-t pt-4 mt-4">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-indigo-700">₹{grandTotal}</span>
            </div>
            <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition text-lg cursor-pointer">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
