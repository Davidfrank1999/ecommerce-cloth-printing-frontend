import React from "react";
import Hero from "../../components/Hero/Hero";

export const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* ✅ Hero Section */}
      <Hero />

      {/* ✅ Features Section */}
      <section className="py-16 px-6 md:px-20 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Why Choose Print Shop?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition">
            <img
              src="https://img.icons8.com/ios-filled/100/4a90e2/print.png"
              alt="High Quality"
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-xl font-semibold mb-2">Premium Printing</h3>
            <p className="text-gray-600">
              High-quality printing on premium fabrics that last wash after wash.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition">
            <img
              src="https://img.icons8.com/ios-filled/100/4a90e2/delivery.png"
              alt="Fast Delivery"
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your custom T-shirts delivered quickly and hassle-free.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition">
            <img
              src="https://img.icons8.com/ios-filled/100/4a90e2/design.png"
              alt="Custom Design"
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-xl font-semibold mb-2">Custom Designs</h3>
            <p className="text-gray-600">
              Upload your own designs or create unique styles with ease.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ CTA Section */}
      <section className="py-20 px-6 md:px-20 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Designing Your Custom T-Shirt Today!
        </h2>
        <p className="mb-8 text-lg">
          Create a shirt that’s as unique as you are. Choose, customize, and print in minutes.
        </p>
        <a
          href="/product"
          className="inline-block bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer"
        >
          Make Your Own Shirt
        </a>
      </section>
    </div>
  );
};
