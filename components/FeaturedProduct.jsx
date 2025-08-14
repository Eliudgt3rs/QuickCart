import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
const products = [
  {
    id: 1,
    image: assets.yellowscarf,
    title: "Unbelievable Discounts",
    description:
      "Experience the best customer service and enjoy the most competitive prices in Kenya.",
  },

  {
    id: 2,
    image: assets.bluegirl,
    title: "Get the Latest Tech ",
    description:
      "Looking for the latest gadgets? We have the best quality and prices in Kenya.",
  },
  {
    id: 3,
    image: assets.purpleboy,
    title: "Power in Every Pixel",
    description:
      "Get gadgets that suites your style from the most recommended online store in Kenya.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-4xl font-medium">Featured Products</p>
        <div className="w-40 h-0.5 bg-red-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={title}
              className="group-hover:brightness-55 transition duration-300 w-full h-full object-cover"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-3xl text-yellow-400">
                {title}
              </p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              <Link href="/all-products">
                <button className="flex items-center gap-1.5 bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition-colors">
                  Buy now
                  <Image
                    className="h-3 w-3"
                    src={assets.redirect_icon}
                    alt="Redirect Icon"
                  />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
