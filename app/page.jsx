'use client'
import React, { useState, useEffect } from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularProducts from "@/components/PopularProducts";
import CategorySection from "@/components/CategorySection";
import BlogSection from "@/components/BlogSection";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <meta name="google-site-verification" content="Ah-3FFUr-N8k_x7Y2VSWgkA7YroGYsK1b7VzCjRcld8" />
      <Navbar/>
      <div className="px-6 md:px-12 lg:px-25 mt-12">
        <HeaderSlider />
        <CategorySection />
        <PopularProducts />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <BlogSection blogs={blogs} />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
