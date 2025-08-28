import React from "react";
import { useCart } from "../../context/CartContext";
import { HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (item) => {
    addToCart({ ...item, size: item.size || "M", quantity: item.quantity || 1 });
    navigate("/cart");
  };

  const isWishlisted = (item) => wishlist.some((i) => i._id === item._id);

  return (
    <div className="min-h-screen bg-background py-12 px-4 md:px-10">
      <div className="max-w-full mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-text mb-10 text-center">
          My Wishlist
        </h1>

        {/* Empty Wishlist State */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-text/70 text-center py-20">
            <HeartOff className="w-12 h-12 mb-4 text-primary" />
            <p className="text-lg">Your wishlist is currently empty.</p>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                isWishlisted={isWishlisted}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
