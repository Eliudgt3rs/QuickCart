'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <div className="relative h-96">
          <Image
            src={assets.phones}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="opacity-75"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-extrabold text-white tracking-wider">
              Welcome To Yenu.
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-16 lg:px-32 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-lg leading-relaxed">
              <h2 className="text-3xl font-bold mb-4">Welcome to the Future of Online Shopping</h2>
              <p className="mb-4">
                At Yenu Online Store, we believe that shopping for the latest electronics should be an experience, not a chore. Born from a passion for technology and a desire to make it accessible to everyone, we are a purely online store dedicated to bringing you the best gadgets and devices right to your doorstep.
              </p>
              <p>
                Our mission is to provide a seamless and enjoyable shopping journey, from the moment you land on our site to the second your new gadget arrives. We are a team of tech enthusiasts, customer service experts, and logistics wizards, all working together to redefine the world of e-commerce.
              </p>
            </div>
            <div className="w-full">
              <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                className="rounded-lg shadow-lg overflow-hidden"
              >
                <div>
                  <Image src={assets.abouttwo} alt="Team Image 1" width={400} height={300} />
                </div>
                <div>
                  <Image src={assets.aboutthree} alt="Team Image 2" width={400} height={300} />
                </div>
                <div>
                  <Image src={assets.aboutfour} alt="Team Image 3" width={400} height={300} />
                </div>
              </Carousel>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-xl font-semibold mb-2">Customer Obsession</h3>
                <p>We are committed to our customers and work tirelessly to earn and keep their trust.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p>We are constantly looking for new ways to innovate and improve the customer experience.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p>We offer only the highest quality products from trusted brands and suppliers.</p>
              </div>
            </div>
          </div>

          {/* Delivery Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-100 p-12 rounded-lg">
            <div>
              <Image src={assets.aboutone} alt="Delivery Image" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
            <div className="text-lg leading-relaxed">
              <h2 className="text-3xl font-bold mb-4">Nationwide Delivery</h2>
              <p className="mb-4">
                As a purely online store, we have perfected the art of delivery. We have a robust and efficient delivery network that spans the entire country. No matter where you are, we will get your order to you quickly and safely.
              </p>
              <p>
                We partner with the most reliable courier services to ensure that your package is handled with care and delivered on time. You can track your order in real-time and our customer service team is always available to answer any questions you may have about your delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;