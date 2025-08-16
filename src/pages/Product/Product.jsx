import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import products from '../../data/products';
import { Heart } from 'lucide-react';

const Product = () => {
  const [activeTab, setActiveTab] = useState('Men');
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const navigate = useNavigate();
  const [wishlistMessage, setWishlistMessage] = useState('');

  const isWishlisted = (item) =>
    wishlist.some((p) => p.id === item.id && p.name === item.name);

  const handleToggleWishlist = (product) => {
    const alreadyInWishlist = isWishlisted(product);
    toggleWishlist(product);
    setWishlistMessage(alreadyInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist');
    setTimeout(() => setWishlistMessage(''), 2000);
  };

  return (
    <div className="p-6 sm:p-10 bg-gray-50 min-h-screen relative">
      {wishlistMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-100 text-green-700 border border-green-300 px-4 py-2 rounded shadow">
          {wishlistMessage}
        </div>
      )}

      <h1 className="text-4xl font-extrabold text-center text-text-700 mb-10">
        T-Shirt Collection
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center gap-3 flex-wrap mb-8">
        {Object.keys(products).map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-xl border font-medium transition duration-200 text-sm md:text-base cursor-pointer ${
              activeTab === category
                ? 'bg-text -600 text-white border-text -600'
                : 'bg-white text-primary -600 border-primary -600 hover:bg-primary -50 hover:text-white'
              
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {products[activeTab]?.map((product, index) => (
          <Link
            to={`/product/${activeTab.toLowerCase()}/${index}`}
            key={index}

            className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden relative"
          >

            {/* Wishlist heart icon */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleToggleWishlist(product);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-10 cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 transition ${
                  isWishlisted(product) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            </button>

            <img
              src={product.image}
              alt={product.name}

              className="w-full h-60 object-cover transition duration-300 group-hover:scale-105"
            />

            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-text-700">{product.name}</h3>
              <p className="text-primary -800 font-medium text-sm">₹{product.price}</p>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({ ...product, size: 'M', quantity: 1 });
                }}
                className="mt-2 bg-primary -500 hover:bg-accent -600 text-white text-sm py-2 rounded transition cursor-pointer"
              >
                Add to Cart
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({ ...product, size: 'M', quantity: 1 });
                  navigate('/cart');
                }}
                className="text-center text-white text-sm bg-text -600 hover:bg-accent -700 py-2 rounded transition cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </Link>

        ))}
      </div>
    </div>
  );
};

export default Product;
