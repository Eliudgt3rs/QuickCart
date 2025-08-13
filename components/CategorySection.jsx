"use client";
import React from "react";
import Image from "next/image";
import { categories } from "@/assets/categories";
import { useRouter } from "next/navigation";

const CategorySection = () => {
  const router = useRouter();

  const handleCategoryClick = (searchQuery) => { // Changed parameter to searchQuery
    router.push(`/search-results?query=${searchQuery}`); // Changed to use query parameter
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center cursor-pointer p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            onClick={() => handleCategoryClick(category.searchQuery)} // Changed to use category.searchQuery
          >
            <div className="w-28 h-28 relative mb-4 overflow-hidden rounded-lg bg-gray-100 group-hover:bg-red-100 transition-colors duration-300">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-xl font-semibold text-gray-800 text-center group-hover:text-red-600 transition-colors duration-300">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
