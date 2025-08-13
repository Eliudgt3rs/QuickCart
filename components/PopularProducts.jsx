"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext"; // Import useAppContext

const PopularProducts = () => {
  const { products } = useAppContext(); // Get all products from AppContext
  const [randomProducts, setRandomProducts] = useState([]);
  const numberOfPopularProducts = 6; // Define how many random products to show

  useEffect(() => {
    if (products.length > 0) {
      // Shuffle products array
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      // Get a slice of the shuffled array
      setRandomProducts(shuffled.slice(0, numberOfPopularProducts));
    }
  }, [products]); // Re-run when products from context change

  if (randomProducts.length === 0) {
    return (
      <div className="mt-10 md:flex-1 text-center text-gray-500">
        Loading popular products...
      </div>
    );
  }

  return (
    <div className="mt-10 md:flex-1">
      <h1 className="text-3xl font-semibold text-gray-800 text-center">
        Popular Products
      </h1>
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-8
          mt-8
        "
      >
        {randomProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
