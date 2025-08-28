// src/pages/ProductDetail/ProductDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import { Heart } from "lucide-react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // Zoom states
  const [zoom, setZoom] = useState(false);
  const [lens, setLens] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [zoomTimeout, setZoomTimeout] = useState(null);
  const imgRef = useRef(null);

  // Fetch product & suggestions
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

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

  const isWishlisted = (item) => wishlist.some((i) => i._id === item._id);

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

  const handleCreateDesign = () => navigate(`/design/${id}`);

  // Mouse move for zoom
  const handleMouseMove = (e) => {
    const img = imgRef.current;
    if (!img) return;

    const { left, top, width, height } = img.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setLens({
      x: Math.max(0, Math.min(x, width)),
      y: Math.max(0, Math.min(y, height)),
    });

    setImgSize({ width, height });
  };

  // Zoom with 1-second delay
  const handleMouseEnter = () => {
    if (zoomTimeout) clearTimeout(zoomTimeout);
    setZoomTimeout(setTimeout(() => setZoom(true), 1000));
  };

  const handleMouseLeave = () => {
    if (zoomTimeout) clearTimeout(zoomTimeout);
    setZoom(false);
  };

  if (loading) return <div className="p-10 text-center text-text text-xl">Loading product...</div>;
  if (!product) return <div className="p-10 text-center text-red-500 text-xl">Product not found.</div>;

  return (
    <div className="min-h-screen bg-background py-10 px-4 md:px-10 relative">
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
            className={`w-6 h-6 ${isWishlisted(product) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center relative">
          <div
            className="w-full max-h-[500px] overflow-hidden relative bg-gray-50 cursor-zoom-in"
            ref={imgRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.image || "https://via.placeholder.com/500"}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-200"
            />
          </div>

          {/* Zoom Window on Left */}
          {zoom && (
            <div className="absolute top-0 -left-[400px] w-96 h-96 border border-gray-300 bg-white overflow-hidden shadow-lg z-50">
              <img
                src={product.image}
                alt="zoom"
                className="absolute w-[200%] h-[200%] object-contain transition-all duration-100"
                style={{
                  left: `-${(lens.x / imgSize.width) * 100}%`,
                  top: `-${(lens.y / imgSize.height) * 100}%`,
                }}
              />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-text mb-3">{product.name}</h2>
            <p className="text-primary text-2xl font-semibold mb-6">₹{product.price}</p>

            {/* Size Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text mb-1">Select Size</label>
              <div className="flex gap-2 flex-wrap">
                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`cursor-pointer px-3 py-1 border rounded ${
                      size === s
                        ? "bg-primary text-white border-primary"
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
              <label className="block text-sm font-medium text-text mb-1">Quantity</label>
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
                className="cursor-pointer w-full bg-primary hover:bg-accent text-white py-3 rounded-lg text-lg transition"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="cursor-pointer w-full bg-secondary hover:bg-accent text-white py-3 rounded-lg text-lg transition"
              >
                Buy Now
              </button>

              <button
                onClick={handleCreateDesign}
                className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg transition"
              >
                Create Your Design
              </button>
            </div>

            {message && <p className="mt-5 text-green-600 font-medium text-center">{message}</p>}
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-text mb-6">Suggested for You</h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {suggestions.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              isWishlisted={isWishlisted}
              toggleWishlist={handleToggleWishlist}
              addToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
