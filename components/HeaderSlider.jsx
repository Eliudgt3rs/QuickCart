'use client'
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";


const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "From as low as 7,900 - Big Value, Small Price!",
      offer: "Buy Now & Get Free Phone Case!",
      buttonText1: "Buy Now",
      buttonText2: "Learn More",
      imgSrc: assets.redme,
      button1Url: "/search-results?query=Redme A5",
      button2Url: "/search-results?query=Smartphone",
    },
     {
      id: 2,
      title: "The New iPhone 17 - Power in Your Pocket!",
      offer: "Pre-order Now & Get Free AirPods!",
      buttonText1: "Pre-order iPhone",
      buttonText2: "Learn More",
      imgSrc: assets.iphone17,
      button1Url: "/search-results?query=iPhone 17",
      button2Url: "/search-results?query=Smartphone",
    },
    {
      id: 7,
      title: "Capture Every Moment - The Latest Smartphones Are Here!",
      offer: "Shop Now & Get Free Accessories!",
      buttonText1: "Discover Phones",
      buttonText2: "Compare Models",
      imgSrc: assets.mainhero,
      // Add target URLs for buttons
      button1Url: "/search-results?category=Smartphone",
      button2Url: "/search-results?query=Smartphone",
    },
   
    
    {
      id: 3,
      title: "Experience the Future - The New Google Pixel is Here!",
      offer: "Pre-order Now & Get Exclusive Benefits!",
      buttonText1: "Pre-order Pixel",
      buttonText2: "Learn More",
      imgSrc: assets.pixel, // Using existing image as placeholder
      button1Url: "/search-results?query=Google Pixel",
      button2Url: "/search-results?query=Smartphone",
    },
    {
      id: 4,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 25% Off!",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
      button1Url: "/search-results?query=MacBook Pro",
      button2Url: "/search-results?query=Laptop",
    },
    {
      id: 5,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Pro Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
      button1Url: "/search-results?query=PlayStation 5",
      button2Url: "/search-results?query=Gaming",
    },
    {
      id: 6,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off!",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
      button1Url: "/search-results?query=Headphone",
      button2Url: "/all-products",
    },

  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const { router } = useAppContext(); // Destructure router from useAppContext

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleButtonClick = (url) => {
    if (router && url) {
      router.push(url);
    }
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-4 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-4 md:mt-0">
              <p className="md:text-base text-red-600 pb-2">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button
                  className="md:px-10 px-7 md:py-2.5 py-2 bg-red-600 rounded-full text-white font-medium"
                  onClick={() => handleButtonClick(slide.button1Url)} // Add onClick handler
                >
                  {slide.buttonText1}
                </button>
                <button
                  className="group flex items-center gap-2 px-6 py-2.5 font-medium"
                  onClick={() => handleButtonClick(slide.button2Url)} // Add onClick handler
                >
                  {slide.buttonText2}
                  <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-red-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;