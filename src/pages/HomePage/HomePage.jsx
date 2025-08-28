import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import ProductCard from "../../components/ProductCard"; // ✅ reuse product card

export const HomePage = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        // ✅ For now just pick first 4, later add bestSeller field in backend
        setBestSellers(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="bg-background">
      {/* ✅ Hero Section */}
      <Hero />

      {/* ✅ Best Sellers Section */}
      <section className="py-16 px-6 md:px-20 bg-background">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-10 text-center">
          Best Sellers
        </h2>

        {bestSellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text/70">Loading best sellers...</p>
        )}
      </section>

      {/* ✅ Features Section */}
      <section className="py-16 px-6 md:px-20 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-10">
          Why Choose Print Shop?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition bg-background">
            <img
              src="https://img.icons8.com/ios-filled/100/4628FC/print.png"
              alt="High Quality"
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-xl font-semibold mb-2 text-text">Premium Printing</h3>
            <p className="text-text/70">
              High-quality printing on premium fabrics that last wash after wash.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition bg-background">
            <img
              src="https://img.icons8.com/ios-filled/100/4628FC/delivery.png"
              alt="Fast Delivery"
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-xl font-semibold mb-2 text-text">Fast Delivery</h3>
            <p className="text-text/70">
              Get your custom T-shirts delivered quickly and hassle-free.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition bg-background">
            <img
              src="https://img.icons8.com/ios-filled/100/4628FC/design.png"
              alt="Custom Design"
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-xl font-semibold mb-2 text-text">Custom Designs</h3>
            <p className="text-text/70">
              Upload your own designs or create unique styles with ease.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ CTA Section */}
      <section className="py-20 px-6 md:px-20 bg-secondary text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Designing Your Custom T-Shirt Today!
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Create a shirt that’s as unique as you are. Choose, customize, and print in minutes.
        </p>
        <a
          href="/product"
          className="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer"
        >
          Make Your Own Shirt
        </a>
      </section>
    </div>
  );
};
