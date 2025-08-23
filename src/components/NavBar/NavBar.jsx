// src/components/NavBar/NavBar.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/print_shop_logo_white_bg_round.png";

function NavBar() {
  const { cartItems, wishlist } = useCart();
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlist = wishlist.length;

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsLoggedIn(true);

    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setAccountOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-text text-white px-6 py-4 fixed top-0 left-0 right-0 z-50 shadow h-[64px] flex items-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          
          {/* Logo */}
          <div className="flex-1 flex items-center">
            <Link to="/home" className="flex items-center gap-2">
              <img src={logo} alt="Print Shop Logo" className="h-10 w-10 object-contain" />
              <span className="hidden md:inline-block text-lg md:text-xl font-bold">
                Print Shop
              </span>
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link to="/home" className="hover:text-accent">Home</Link>
            <Link to="/product" className="hover:text-accent">Shop</Link>
            <a href="#footer" className="hover:text-accent">About</a>
            <a href="#footer" className="hover:text-accent">Contact</a>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative hover:text-accent text-xl">
              <FaHeart />
              {totalWishlist > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-accent text-xl">
              <FaShoppingCart />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalQty}
                </span>
              )}
            </Link>

            {/* Account */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="flex items-center gap-2 hover:text-accent cursor-pointer font-medium"
                >
                  <FaUser className="w-5 h-5" />
                  Log in / Sign Up
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="flex items-center gap-2 hover:text-accent cursor-pointer"
                  >
                    <FaUser className="w-5 h-5" />
                    <span className="hidden lg:inline-block font-medium">My Account</span>
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg font-medium text-sm z-50">
                      <Link to="/my-designs" className="block px-4 py-2 hover:bg-gray-100">My Designs</Link>
                      <Link to="/order-history" className="block px-4 py-2 hover:bg-gray-100">Order History</Link>
                      <Link to="/account-settings" className="block px-4 py-2 hover:bg-gray-100">Account Settings</Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Spacer so content doesn’t hide under navbar */}
      <div className="h-[64px]" />
    </>
  );
}

export default NavBar;
