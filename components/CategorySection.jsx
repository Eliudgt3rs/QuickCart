"use client";
import React from "react";
import Image from "next/image";
import { categories } from "@/assets/categories";
import { useRouter } from "next/navigation";

const CategorySection = () => {
  const router = useRouter();

  const handleCategoryClick = (categoryName) => {
    router.push(`/search-results?category=${categoryName}`);
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
            className="flex flex-col items-center cursor-pointer p-4 bg-gray-500/10 rounded-lg hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="w-24 h-24 relative mb-4">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
            </div>
            <p className="text-lg font-medium text-gray-800 text-center">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
