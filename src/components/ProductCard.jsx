import { Link, useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useCart();

  // ✅ Check if already in wishlist
  const wishlisted = wishlist?.some((w) => w._id === product._id);

  // ✅ Buy Now → adds to cart + redirects
  const handleBuyNow = () => {
    addToCart({ ...product, size: product.size || "M", quantity: product.quantity || 1 });
    navigate("/cart");
  };

  // ✅ Stars Component
  const renderStars = (rating = 4) => (
    <div className="flex items-center gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="group bg-white rounded-2xl shadow-md border border-accent/30 relative hover:shadow-lg transition flex flex-col">
      {/* ❤️ Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="cursor-pointer absolute top-3 right-3 z-10"
      >
        <Heart
          className={`w-6 h-6 transition ${
            wishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
        />
      </button>

      {/* 🖼️ Product Image */}
      <Link
        to={`/product/${product.category?.toLowerCase()}/${product._id}`}
        className="flex-1"
      >
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-52 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* 📄 Product Info */}
      <div className="p-4 flex flex-col">
        <h4 className="text-lg font-semibold text-text mb-1 truncate">
          {product.name}
        </h4>
        <p className="text-primary font-semibold mb-2">₹{product.price}</p>

        {/* ⭐ Rating */}
        {renderStars(product.rating || 4)}

        {/* 🛒 Add to Cart */}
        <button
          onClick={() =>
            addToCart({
              ...product,
              size: product.size || "M",
              quantity: product.quantity || 1,
            })
          }
          className="cursor-pointer w-full bg-primary hover:bg-secondary text-white font-medium py-2 rounded-lg transition mb-2"
        >
          Add to Cart
        </button>

        {/* ⚡ Buy Now */}
        <button
          onClick={handleBuyNow}
          className="cursor-pointer w-full bg-text hover:bg-text/80 text-white font-medium py-2 rounded-lg transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
