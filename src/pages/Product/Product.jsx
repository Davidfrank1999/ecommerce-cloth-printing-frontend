import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard"; // ✅ reusable card

const Product = () => {
  const [activeTab, setActiveTab] = useState("");
  const { toggleWishlist, wishlist, addToCart } = useCart();

  const [wishlistMessage, setWishlistMessage] = useState("");
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const grouped = res.data.reduce((acc, product) => {
          if (!acc[product.category]) acc[product.category] = [];
          acc[product.category].push(product);
          return acc;
        }, {});
        setProducts(grouped);

        // Default tab = first category
        if (Object.keys(grouped).length > 0) {
          setActiveTab(Object.keys(grouped)[0]);
        }
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Wishlist check
  const isWishlisted = (item) => wishlist.some((p) => p._id === item._id);

  const handleToggleWishlist = (product) => {
    const alreadyInWishlist = isWishlisted(product);
    toggleWishlist(product);
    setWishlistMessage(alreadyInWishlist ? "Removed from Wishlist" : "Added to Wishlist");
    setTimeout(() => setWishlistMessage(""), 2000);
  };

  // ✅ Loading Skeleton
  if (loading) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-accent/30 h-72 rounded-lg"></div>
        ))}
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 bg-background min-h-screen relative">
      {/* Wishlist Toast */}
      {wishlistMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 
          bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {wishlistMessage}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-text mb-10 capitalize">
        {activeTab ? `${activeTab} Collection` : "Our Products"}
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center gap-3 flex-wrap mb-8">
        {Object.keys(products).map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-xl border font-medium transition duration-200 
              text-sm md:text-base cursor-pointer ${
                activeTab === category
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-primary border-primary hover:bg-accent/10"
              }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {products[activeTab]?.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products[activeTab].map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isWishlisted={isWishlisted}
              toggleWishlist={handleToggleWishlist}
              addToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-text/70 text-lg mt-10">
          No products available in this category.
        </p>
      )}
    </div>
  );
};

export default Product;
