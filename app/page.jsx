'use client'
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularProducts from "@/components/PopularProducts";
import CategorySection from "@/components/CategorySection"; // Import the new component

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="px-6 md:px-12 lg:px-25 mt-12">
        <HeaderSlider />
        <CategorySection /> {/* Add the new component here */}
        <PopularProducts />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
