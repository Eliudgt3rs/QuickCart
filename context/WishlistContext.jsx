'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]); // Initialize with empty array for SSR consistency

  useEffect(() => {
    // This useEffect runs only on the client side after initial render
    if (typeof window !== 'undefined') {
      const savedWishlistData = localStorage.getItem('wishlist_data');
      if (savedWishlistData) {
        try {
          const { data, timestamp } = JSON.parse(savedWishlistData);
          const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
          if (Date.now() - timestamp < oneWeek) {
            setWishlist(data); // Update state with loaded data
          }
        } catch (e) {
          console.error("Failed to parse wishlist from localStorage", e);
        }
      }
    }
  }, []); // Empty dependency array means it runs once on mount

  useEffect(() => {
    // This useEffect saves the wishlist whenever it changes
    if (typeof window !== 'undefined') {
      const wishlistData = {
        data: wishlist,
        timestamp: Date.now(),
      };
      localStorage.setItem('wishlist_data', JSON.stringify(wishlistData));
    }
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};
