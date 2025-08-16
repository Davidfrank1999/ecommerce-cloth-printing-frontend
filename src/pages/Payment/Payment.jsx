import React, { useState } from "react";
import CheckoutButton from "../../components/CheckoutButton";
import { useCart } from "../../context/CartContext";

const Payment = () => {
  const { cartItems } = useCart();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shippingCharge = 50;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const grandTotal = subtotal + shippingCharge;

  // Handle address change
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-700">
            Your cart is empty 🛒
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE → Address + Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Delivery Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={address.name}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={address.street}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full md:col-span-2"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              />
            </div>
          </div>

          {/* Cart Items Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Your Items
            </h2>
            <div className="divide-y">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between py-4"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-medium text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE → Order Summary */}
        <div className="bg-white shadow-md rounded-xl p-6 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shippingCharge}</span>
            </div>
            <div className="flex justify-between border-t pt-3 font-semibold text-lg">
              <span>Total</span>
              <span className="text-indigo-600">₹{grandTotal}</span>
            </div>
          </div>

          {/* Razorpay Payment Button */}
          <div className="mt-6">
            <CheckoutButton amount={grandTotal} />
          </div>

          {/* Security Badge */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            🔒 Secure checkout powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
