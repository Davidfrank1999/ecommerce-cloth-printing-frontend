import React from "react";

const CheckoutButton = ({ amount }) => {
  const handlePayment = async () => {
    const options = {
      key: "rzp_test_xxxxxxxx", // replace with your Razorpay Test Key
      amount: amount * 100, // amount in paise
      currency: "INR",
      name: "T-Shirt Store",
      description: "Order Payment",
      image: "/logo.png",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#4F46E5",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition text-lg cursor-pointer"
    >
      Pay ₹{amount}
    </button>
  );
};

export default CheckoutButton;
