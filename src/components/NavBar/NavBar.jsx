import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
import { useCart } from '../../../src/context/CartContext';
import { useState, useRef, useEffect } from 'react';

const NavBar = () => {
  const { cartItems, wishlist } = useCart();
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlist = wishlist.length;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-text text-white px-6 py-4 flex justify-between items-center relative z-50">
      <Link to="/" className="text-xl font-bold">
        T-Shirt
      </Link>

      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-accent transition font-medium">Home</Link>
        <Link to="/home" className="hover:text-accent transition font-medium">Shop</Link>
        <Link to="/sell" className="hover:text-accent transition font-medium">About</Link>
        <Link to="/contact" className="hover:text-accent transition font-medium">Contact</Link>

        {/* Wishlist icon */}
        <Link to="/wishlist" className="relative hover:text-accent transition text-xl">
          <FaHeart />
          {totalWishlist > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {totalWishlist}
            </span>
          )}
        </Link>

        {/* Cart icon */}
        <Link to="/cart" className="relative hover:text-accent transition text-xl">
          <FaShoppingCart />
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {totalQty}
            </span>
          )}
        </Link>

        {/* My Account dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:text-accent transition cursor-pointer"
          >
            <FaUser className="w-5 h-5" />
            <span className="hidden xl:inline-block font-medium">My Account</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden font-medium text-md">
              <Link to="/my-designs" className="block px-4 py-2 hover:bg-gray-100">
                My Designs
              </Link>
              <Link to="/my-uploads" className="block px-4 py-2 hover:bg-gray-100">
                My Uploads
              </Link>
              <Link to="/order-history" className="block px-4 py-2 hover:bg-gray-100">
                Order History
              </Link>
              <Link to="/account-settings" className="block px-4 py-2 hover:bg-gray-100">
                Account Settings
              </Link>
              <button
                onClick={() => {
                  // Handle sign-out logic
                  alert('Signed out!');
                }}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
