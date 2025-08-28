import { useCart } from "../../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const shippingCharge = 50;
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const grandTotal = totalPrice + (cartItems.length > 0 ? shippingCharge : 0);

  // 🚀 Redirect to Payment page
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8 text-text text-center">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-text/70 mt-20 text-lg">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.name}-${item.size}-${index}`}
                className="flex flex-col sm:flex-row gap-4 border border-accent/30 rounded-lg p-4 shadow-sm bg-white"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-40 h-40 object-cover rounded"
                />

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-text">{item.name}</h2>
                    <p className="text-sm text-text/70">Size: {item.size}</p>
                    <p className="text-sm text-text/70 mt-1">₹{item.price} each</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.name, item.size, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 border rounded flex items-center justify-center text-text/70 hover:bg-accent/10 disabled:opacity-50 cursor-pointer"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium w-6 text-center text-text">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.name, item.size, item.quantity + 1)
                        }
                        className="w-8 h-8 border rounded flex items-center justify-center text-text/70 hover:bg-accent/10 cursor-pointer"
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
                <div className="text-right text-lg font-semibold text-primary">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border border-accent/30 rounded-lg p-6 shadow-sm h-fit sticky top-10 bg-white">
            <h2 className="text-xl mb-4 text-text font-bold">Order Summary</h2>
            <hr className="mb-4 border-accent/30" />
            <div className="flex justify-between text-text/80 mb-3">
              <span className="text-lg font-medium">Subtotal</span>
              <span className="text-lg font-medium text-text">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-text/80 mb-3">
              <span className="text-lg font-medium">Shipping</span>
              <span className="text-lg font-medium text-text">
                {cartItems.length > 0 ? `₹${shippingCharge}` : "₹0"}
              </span>
            </div>
            <div className="flex justify-between text-text border-t pt-4 mt-4">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-secondary">
                ₹{grandTotal}
              </span>
            </div>

            {/* Proceed to Payment */}
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-primary hover:bg-accent text-white font-semibold py-3 rounded-lg transition text-lg cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
