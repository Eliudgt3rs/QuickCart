"use client";

import React, { useState } from "react";
import { assets, CartIcon, BagIcon, HomeIcon, BoxIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, useUser, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user, getCartCount } = useAppContext();
  const { openSignIn } = useClerk();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false); // New state for mobile menu

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      router.push(`/search-results?query=${searchQuery}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleSignInClick = () => {
    if (!user) {
      openSignIn();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 bg-white">
      <Image
        className="cursor-pointer w-40 md:w-45"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Navigation */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/about-us" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact-us" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Admin
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-6 h-6 cursor-pointer hover:text-gray-900" src={assets.search_icon} alt="search icon" onClick={() => setShowSearch(!showSearch)} />
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        )}
        <Link href="/cart" className="relative hover:text-gray-900 transition">
          <Image className="w-6 h-6" src={assets.cart_icon} alt="cart icon" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
              {getCartCount()}
            </span>
          )}
        </Link>
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push("/")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push("/all-products")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={handleSignInClick}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" className="w-6 h-6" />
            Login
          </button>
        )}
      </ul>

      {/* Mobile Navigation (Hamburger Menu) */}
      <div className="flex items-center md:hidden gap-3">
        <Image className="w-6 h-6 cursor-pointer hover:text-gray-900" src={assets.search_icon} alt="search icon" onClick={() => setShowSearch(!showSearch)} />
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 w-32"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        )}
        <Link href="/cart" className="relative hover:text-gray-900 transition">
          <Image className="w-6 h-6" src={assets.cart_icon} alt="cart icon" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
              {getCartCount()}
            </span>
          )}
        </Link>
        {/* Login Button for Mobile */}
        {!user && ( // Only show if not logged in
          <button
            onClick={handleSignInClick}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" className="w-6 h-6" />
            {/* Login text can be removed if space is tight, just icon */}
          </button>
        )}
        {/* Hamburger Icon */}
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 focus:outline-none">
          <Image src={assets.menu_icon} alt="menu icon" className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setShowMobileMenu(false)}
          ></div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 h-full bg-white z-40 flex flex-col items-center justify-center md:hidden transform transition-transform duration-300 ease-in-out ${
              showMobileMenu ? 'translate-x-0 w-3/4' : '-translate-x-full w-3/4'
            }`}
          >
            <button onClick={() => setShowMobileMenu(false)} className="absolute top-4 right-4 p-2 focus:outline-none">
              <Image src={assets.add_icon} alt="close icon" className="w-6 h-6 rotate-45" />
            </button>
            <div className="flex flex-col items-start gap-3 w-full py-4 px-6"> {/* Changed py-8 to py-4 */}
              {/* Logo at the top */}
              <Image
                className="w-32 mb-8" // Adjusted width and added bottom margin
                onClick={() => { router.push("/"); setShowMobileMenu(false); }}
                src={assets.logo}
                alt="logo"
              />

              <Link href="/" className="hover:text-gray-900 transition py-1" onClick={() => setShowMobileMenu(false)}> {/* Changed py-2 to py-1 */}
                Home
              </Link>
              <Link href="/all-products" className="hover:text-gray-900 transition py-1" onClick={() => setShowMobileMenu(false)}>
                Shop
              </Link>
              <Link href="/about-us" className="hover:text-gray-900 transition py-1" onClick={() => setShowMobileMenu(false)}>
                About Us
              </Link>
              <Link href="/contact-us" className="hover:text-gray-900 transition py-1" onClick={() => setShowMobileMenu(false)}>
                Contact
              </Link>

              {isSeller && (
                <button
                  onClick={() => { router.push("/seller"); setShowMobileMenu(false); }}
                  className="text-base border px-6 py-2 rounded-full mt-4" // Added top margin
                >
                  Admin
                </button>
              )}

              {user ? (
                <div className="flex flex-col items-start gap-3 mt-4"> {/* Changed items-center to items-start, gap-4 to gap-3 */}
                  <UserButton afterSignOutUrl="/" />
                  <Link href="/" className="hover:text-gray-900 transition py-1" onClick={() => setShowMobileMenu(false)}>
                    Home
                  </Link>
                  <Link href="/all-products" className="hover:text-gray-900 transition py-1" onClick={() => setShowMobileMenu(false)}>
                    Products
                  </Link>
                  <Link href="/cart" className="hover:text-gray-900 transition py-1" onClick={() => setShowMobileMenu(false)}>
                    Cart
                  </Link>
                  <Link href="/my-orders" className="hover:text-gray-900 transition py-1" onClick={() => setShowMobileMenu(false)}>
                    My Orders
                  </Link>
                </div>
              ) : (
                null
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;