"use client";
import React from "react";
import { popularProducts } from "@/assets/popularProducts";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
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
        {popularProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
