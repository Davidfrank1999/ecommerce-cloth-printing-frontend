import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Heart } from "lucide-react";
import axios from "axios";

const ProductCard = () => {
  const { id } = useParams(); // product _id
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // ✅ Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        // also fetch some suggestions
        const all = await axios.get("http://localhost:5000/api/products");
        const filtered = all.data.filter((p) => p._id !== res.data._id);
        setSuggestions(filtered.sort(() => 0.5 - Math.random()).slice(0, 3));
      } catch (error) {
        console.error("❌ Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const isWishlisted = (item) =>
    wishlist.some((i) => i._id === item._id);

  const handleAddToCart = (item) => {
    addToCart({ ...item, size, quantity });
    setMessage(`Added to cart! Size: ${size}, Qty: ${quantity}`);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleToggleWishlist = (item) => {
    const alreadyInWishlist = isWishlisted(item);
    toggleWishlist(item);
    setWishlistMessage(alreadyInWishlist ? "Removed from Wishlist" : "Added to Wishlist");
    setTimeout(() => setWishlistMessage(""), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, size, quantity });
    navigate("/cart");
  };

  // ✅ Redirect to Design Page
  const handleCreateDesign = () => {
    navigate(`/design/${id}`);
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-500 text-xl">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center text-red-500 text-xl">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 relative">
      {/* Wishlist Toast */}
      {wishlistMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 
          bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {wishlistMessage}
        </div>
      )}

      {/* Main Product Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row mb-12 relative">
        {/* Wishlist Heart */}
        <button
          onClick={() => handleToggleWishlist(product)}
          className="cursor-pointer absolute top-4 right-4 z-10 text-gray-400 hover:text-red-500"
        >
          <Heart
            className={`w-6 h-6 ${
              isWishlisted(product) ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image || "https://via.placeholder.com/500"}
            alt={product.name}
            className="w-full h-full object-cover max-h-[500px]"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h2>
            <p className="text-indigo-700 text-2xl font-semibold mb-6">₹{product.price}</p>

            {/* Size Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Size</label>
              <div className="flex gap-2 flex-wrap">
                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`cursor-pointer px-3 py-1 border rounded ${
                      size === s
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
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

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleAddToCart(product)}
                className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg transition"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="cursor-pointer w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg text-lg transition"
              >
                Buy Now
              </button>

              {/* ✅ NEW "Create Your Design" Button */}
              <button
                onClick={handleCreateDesign}
                className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg transition"
              >
                Create Your Design
              </button>
            </div>

            {message && (
              <p className="mt-5 text-green-600 font-medium text-center">{message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Suggested for You</h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {suggestions.map((item) => (
            <Link
              key={item._id}
              to={`/product/${item.category?.toLowerCase()}/${item._id}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 relative hover:shadow-lg transition"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleWishlist(item);
                }}
                className="cursor-pointer absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted(item) ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>

              <img
                src={item.image || "https://via.placeholder.com/300"}
                alt={item.name}
                className="w-full h-48 object-cover transition group-hover:scale-105"
              />

              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {item.name}
                </h4>
                <p className="text-indigo-700 font-medium mb-2">₹{item.price}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(item);
                  }}
                  className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
