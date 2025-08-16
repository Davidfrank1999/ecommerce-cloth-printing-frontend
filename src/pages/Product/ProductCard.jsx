import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import products from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Heart } from 'lucide-react';

const ProductCard = () => {
  const { category, index } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useCart();


  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const productList = products[formattedCategory] || [];
  const product = productList[parseInt(index)];

  const [message, setMessage] = useState('');
  const [wishlistMessage, setWishlistMessage] = useState('');
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = (item) =>
    wishlist.some((i) => i.id === item.id && i.name === item.name);

  const handleAddToCart = (item) => {
    addToCart({ ...item, size, quantity });
    setMessage(`Added to cart! Size: ${size}, Qty: ${quantity}`);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleToggleWishlist = (item) => {
    const alreadyInWishlist = isWishlisted(item);
    toggleWishlist(item);
    setWishlistMessage(alreadyInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist');
    setTimeout(() => setWishlistMessage(''), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, size, quantity });
    navigate('/cart');
  };

  const handleEditDesign = () => {
    navigate('/canvas?product='+ encodeURIComponent(product.image));
  };

  

  if (!product) {
    return <div className="p-10 text-center text-red-500 text-xl">Product not found.</div>;
  }

  const allSuggestions = Object.values(products)
    .flat()
    .filter((p) => p.name !== product.name);
  const suggestions = allSuggestions.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 relative">
      {wishlistMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-100 text-green-700 border border-green-300 px-4 py-2 rounded shadow">
          {wishlistMessage}
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row mb-12 relative">
        <button
          onClick={() => handleToggleWishlist(product)}
          className="cursor-pointer absolute top-4 right-4 z-10 text-gray-400 hover:text-red-500"
        >
          <Heart
            className={`w-6 h-6 ${
              isWishlisted(product) ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>

        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-[500px]"
          />
        </div>

        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-text mb-3">{product.name}</h2>
            <p className="text-primary text-2xl font-semibold mb-6">₹{product.price}</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Size</label>
              <div className="flex gap-2 flex-wrap">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`cursor-pointer px-3 py-1 border rounded ${
                      size === s
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-24 border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleAddToCart(product)}
                className="cursor-pointer w-full bg-secondary hover:bg-accent -500 text-white py-3 rounded-lg text-lg transition"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="cursor-pointer w-full bg-primary hover:bg-accent -700 text-white py-3 rounded-lg text-lg transition"
              >
                Buy Now
              </button>

              <button
                onClick={handleEditDesign}
                className="cursor-pointer w-full bg-text text-white py-3 rounded-lg text-lg hover:bg-accent hover:text-text transition"
              >
                Edit Design
              </button>
            </div>

            {message && (
              <p className="mt-5 text-green-600 font-medium text-center">{message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-text mb-6">Suggested for You</h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 relative"
            >
              <button
                onClick={() => handleToggleWishlist(item)}
                className="cursor-pointer absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted(item) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </button>

              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-primary mb-1 truncate">{item.name}</h4>
                <p className="text-gray-600 font-medium mb-2">₹{item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="cursor-pointer w-full bg-secondary hover:bg-blue-600 text-white py-2 rounded transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
