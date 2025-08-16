import React from 'react';
import { useCart } from '../../context/CartContext';
import { HeartOff, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (item) => {
    addToCart({ ...item, size: item.size || 'M', quantity: item.quantity || 1 });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-10">
      <div className="max-w-full mx-auto">
        <h1 className="text-4xl font-bold text-text mb-10 text-center">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-600 text-center py-20">
            <HeartOff className="w-12 h-12 mb-4 text-red-400" />
            <p className="text-lg">Your wishlist is currently empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl border border-gray-200 shadow hover:shadow-md transition overflow-hidden flex flex-col"
              >
                {/* Trash icon for removing from wishlist */}
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-5 right-5 z-10 text-red-400 hover:text-red-600 duration-200 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-lg font-bold text-text mb-1 truncate">{item.name}</h2>
                  <p className="text-primary -700 font-medium mb-4">₹{item.price}</p>

                  <button
                    onClick={() =>
                      addToCart({
                        ...item,
                        size: item.size || 'M',
                        quantity: item.quantity || 1,
                      })
                    }
                    className="flex items-center justify-center gap-2 bg-secondary -500 hover:bg-accent -600 text-white font-medium py-2 rounded-md transition mb-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleBuyNow(item)}
                    className="bg-primary text-white py-2 rounded-md transition font-medium hover:bg-accent -700 cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
