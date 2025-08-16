import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../../../src/context/CartContext";

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/product", label: "Shop" },
  { to: "#footer", label: "About" },
  { to: "#footer", label: "Contact" },
];

function NavBar() {
  const { cartItems, wishlist } = useCart();
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlist = wishlist.length;

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-primary text-white px-6 py-4 fixed top-0 left-0 right-0 z-50 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left - Logo */}
          <div className="flex-1">
            <Link to="/home" className="text-lg md:text-xl font-bold">
              T-Shirt
            </Link>
          </div>

          {/* Center - Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navLinks.map(({ to, label }) =>
              to.startsWith("#") ? (
                <a
                  key={to}
                  href={to}
                  onClick={(e) => handleScroll(e, to)}
                  className="hover:text-accent transition font-medium cursor-pointer"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={to}
                  to={to}
                  className="hover:text-accent transition font-medium cursor-pointer"
                >
                  {label}
                </Link>
              )
            )}
          </div>

          {/* Right - Icons */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative hover:text-accent transition text-xl">
              <FaHeart />
              {totalWishlist > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-accent transition text-xl">
              <FaShoppingCart />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalQty}
                </span>
              )}
            </Link>

            {/* Account (desktop only) */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2 hover:text-accent transition cursor-pointer"
              >
                <FaUser className="w-5 h-5" />
                <span className="hidden lg:inline-block font-medium">My Account</span>
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden font-medium text-sm z-50">
                  <Link to="/my-designs" className="block px-4 py-2 hover:bg-gray-100">My Designs</Link>
                  <Link to="/my-uploads" className="block px-4 py-2 hover:bg-gray-100">My Uploads</Link>
                  <Link to="/order-history" className="block px-4 py-2 hover:bg-gray-100">Order History</Link>
                  <Link to="/account-settings" className="block px-4 py-2 hover:bg-gray-100">Account Settings</Link>
                  <button
                    onClick={() => alert("Signed out!")}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      <div className="h-[64px]" />

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-800 shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="p-6 flex flex-col space-y-4 font-medium">
          {navLinks.map(({ to, label }) =>
            to.startsWith("#") ? (
              <a
                key={to}
                href={to}
                onClick={(e) => handleScroll(e, to)}
                className="hover:text-primary transition cursor-pointer"
              >
                {label}
              </a>
            ) : (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="hover:text-primary transition cursor-pointer"
              >
                {label}
              </Link>
            )
          )}

          <hr />

          <Link to="/my-designs" onClick={() => setMenuOpen(false)} className="hover:text-primary">My Designs</Link>
          <Link to="/my-uploads" onClick={() => setMenuOpen(false)} className="hover:text-primary">My Uploads</Link>
          <Link to="/order-history" onClick={() => setMenuOpen(false)} className="hover:text-primary">Order History</Link>
          <Link to="/account-settings" onClick={() => setMenuOpen(false)} className="hover:text-primary">Account Settings</Link>
          <button
            onClick={() => {
              alert("Signed out!");
              setMenuOpen(false);
            }}
            className="text-red-500 hover:text-red-600 text-left"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
