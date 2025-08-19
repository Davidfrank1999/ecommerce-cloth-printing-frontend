import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { useCart } from "../../../src/context/CartContext";
import { logout } from "../../services/client/authService";

// Define nav links here
// add # which route are currently not implemented
// You can replace # with actual routes when they are implemented
const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "#", label: "About" },
  { to: "#", label: "Contact" },
];

// Mobile Toggle Icon
function MobileToggleIcon({ isOpen, toggle }) {
  return (
    <div className="md:hidden" onClick={toggle}>
      {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
    </div>
  );
}

// Desktop Nav Links - centered
function DesktopLinks({ links }) {
  return (
    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
      {links.map(({ to, label }) => (
        <Link key={to} to={to} className="hover:text-accent transition">
          {label}
        </Link>
      ))}
    </div>
  );
}

// Cart and Wishlist Icons
function CartAndWishlistIcons({ totalQty, totalWishlist }) {
  return (
    <div className="flex items-center space-x-4">
      <Link to="/wishlist" className="relative hover:text-accent transition text-xl">
        <FaHeart />
        {totalWishlist > 0 && (
          <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {totalWishlist}
          </span>
        )}
      </Link>

      <Link to="/cart" className="relative hover:text-accent transition text-xl">
        <FaShoppingCart />
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {totalQty}
          </span>
        )}
      </Link>
    </div>
  );
}

// Mobile Drawer Menu
function MobileDrawer({ isOpen, toggle, links }) {
  return (
    <div
      className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-white text-black shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex flex-col space-y-4 font-semibold">
        {links.map(({ to, label }) => (
          <Link key={to} to={to} onClick={toggle} className="hover:text-primary">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Mobile Overlay
function MobileOverlay({ isOpen, toggle }) {
  if (!isOpen) return null;
  return (
    <div
      onClick={toggle}
      className="fixed inset-0 top-[64px] bg-black/20 backdrop-blur-sm z-40 md:hidden"
    />
  );
}

// Main NavBar Component
function NavBar() {
  const { cartItems, wishlist } = useCart();
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlist = wishlist.length;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close account dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <nav className="bg-primary text-white px-4 md:px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        {/* Left: Toggle (mobile) + Logo */}
        <div className="flex items-center gap-3">
          <MobileToggleIcon isOpen={isMenuOpen} toggle={toggleMenu} />
          <Link to="/home" className="text-xl font-bold">
            T-Shirt
          </Link>
        </div>

        {/* Centered Links (Desktop Only) */}
        <DesktopLinks links={navLinks} />

        {/* Right: Cart, Wishlist, and Account */}
        <div className="flex items-center gap-4">
          <CartAndWishlistIcons totalQty={totalQty} totalWishlist={totalWishlist} />

          {/* Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:text-accent transition"
            >
              <FaUser className="w-5 h-5" />
              <span className="hidden xl:inline-block font-medium">My Account</span>
            </button>

            {isDropdownOpen && (
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
                  onClick={() => handleLogout()}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Offset for fixed navbar */}
      <div className="h-[64px]" />

      {/* Mobile Menu */}
      <MobileDrawer isOpen={isMenuOpen} toggle={toggleMenu} links={navLinks} />
      <MobileOverlay isOpen={isMenuOpen} toggle={toggleMenu} />
    </>
  );
}

export default NavBar;
