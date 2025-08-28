import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

const Payment = () => {
  const { cartItems, clearCart } = useCart();
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

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // 🔑 Razorpay checkout
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("authToken");

      // 1️⃣ Create order in backend
      const orderRes = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          shippingAddress: address,
          totalAmount: grandTotal,
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");

      const orderData = await orderRes.json();
      const newOrder = orderData.order;

      // 2️⃣ Create Razorpay order
      const paymentRes = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: grandTotal, // backend expects amount
          }),
        }
      );

      if (!paymentRes.ok) throw new Error("Failed to create payment order");

      const paymentData = await paymentRes.json();
      console.log("paymentData:", paymentData);

      const { key, orderId, amount, currency } = paymentData;

      if (!key || !orderId || !amount)
        throw new Error("Invalid response from payment server");

      // 3️⃣ Open Razorpay checkout
      const options = {
        key,
        amount, // already in paise from backend
        currency,
        name: "Print Shop",
        description: "Order Payment",
        order_id: orderId,
        handler: function (response) {
          alert("✅ Payment successful!");
          clearCart();
          window.location.href = "/orders";
        },
        prefill: {
          name: address.name,
          email: "test@example.com",
          contact: address.phone,
        },
        theme: { color: "#6b46c1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Payment failed:", err);
      alert(err.message || "Payment failed. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-text">
            Your cart is empty 🛒
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE → Address + Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-text mb-4">
              Delivery Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={address.name}
                onChange={handleChange}
                className="border border-accent/30 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleChange}
                className="border border-accent/30 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={address.street}
                onChange={handleChange}
                className="border border-accent/30 p-3 rounded-lg w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="border border-accent/30 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
                className="border border-accent/30 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleChange}
                className="border border-accent/30 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Cart Items Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-text mb-4">Your Items</h2>
            <div className="divide-y divide-accent/30">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex justify-between py-4">
                  <div>
                    <h3 className="font-semibold text-text">{item.name}</h3>
                    <p className="text-sm text-text/70">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-medium text-text">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE → Order Summary */}
        <div className="bg-white shadow-md rounded-xl p-6 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-text mb-4">Order Summary</h2>
          <div className="space-y-3 text-text/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-text">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-text">₹{shippingCharge}</span>
            </div>
            <div className="flex justify-between border-t border-accent/30 pt-3 font-semibold text-lg">
              <span>Total</span>
              <span className="text-secondary">₹{grandTotal}</span>
            </div>
          </div>

          {/* Razorpay Payment Button */}
          <div className="mt-6">
            <button
              onClick={handlePayment}
              className="w-full bg-primary hover:bg-accent text-white font-semibold py-3 rounded-lg transition text-lg cursor-pointer"
            >
              Pay Now
            </button>
          </div>

          <p className="text-xs text-text/60 mt-4 text-center">
            🔒 Secure checkout powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
