import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Heart } from "lucide-react";
import axios from "axios";

const Product = () => {
  const [activeTab, setActiveTab] = useState("");
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const navigate = useNavigate();

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

  // ✅ Wishlist
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
          <div key={i} className="animate-pulse bg-gray-200 h-72 rounded-lg"></div>
        ))}
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 bg-gray-50 min-h-screen relative">
      {/* Wishlist Toast */}
      {wishlistMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 
          bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {wishlistMessage}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 capitalize">
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
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50"
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
            <Link
              to={`/product/${activeTab.toLowerCase()}/${product._id}`}
              key={product._id}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm 
                hover:shadow-lg transition overflow-hidden relative"
            >
              {/* Wishlist Icon */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleWishlist(product);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 
                  z-10 cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 transition ${
                    isWishlisted(product)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>

              {/* Product Image */}
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-60 object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Product Details */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-indigo-700 font-medium text-sm">₹{product.price}</p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({ ...product, size: "M", quantity: 1 });
                  }}
                  className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white 
                    text-sm py-2 rounded transition cursor-pointer"
                >
                  Add to Cart
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/product/${activeTab.toLowerCase()}/${product._id}`);
                  }}
                  className="text-center text-white text-sm bg-gray-800 hover:bg-gray-900 
                    py-2 rounded transition cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No products available in this category.
        </p>
      )}
    </div>
  );
};

export default Product;
