'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { motion } from "framer-motion";
import { FiHeart, FiZap, FiShield } from 'react-icons/fi';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <div className="relative h-[70vh] flex items-center justify-center">
          <Image
            src={assets.phones}
            alt="Hero Image"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold text-white text-center tracking-wide drop-shadow-lg"
            >
              Welcome To <span className="text-red-500">Yenu.</span>
            </motion.h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-16 lg:px-32 py-16 space-y-24">
          {/* Intro Section */}
          <div className="grid grid-cols-1 gap-12 items-start">
            {/* Text First */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg leading-relaxed order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-500">
                Welcome to the Future of Online Shopping
              </h2>
              <p className="mb-4 text-gray-600">
  At <span className="font-semibold">Yenu Online Store</span>, we believe shopping for the latest electronics should be an exciting and effortless experience, not a chore. Founded out of a deep passion for technology and a desire to make it accessible to everyone, we carefully curate every product in our store to ensure exceptional quality, reliability, and value. From the latest smartphones and laptops to innovative smart devices and accessories, our catalog is designed to meet the diverse needs of modern tech enthusiasts, students, professionals, and everyday users alike.
</p>
<p className="mb-4 text-gray-600">
  Our mission goes beyond just selling products; we strive to provide a seamless and enjoyable shopping journey from the moment you land on our site to the moment your order arrives at your doorstep. Every step of our process is designed with the customer in mind: intuitive browsing, detailed product information, easy checkout, and fast, reliable delivery. We are a passionate team of tech enthusiasts, customer service experts, and logistics professionals dedicated to redefining the e-commerce experience in Kenya and beyond.
</p>
<p className="text-gray-600">
  At <span className="font-semibold">Yenu Online Store</span>, we value transparency, trust, and innovation. We partner only with reputable brands and suppliers to ensure that every product meets rigorous quality standards. Our commitment to customer satisfaction is reflected in our responsive support team, hassle-free returns, and continuous efforts to improve the shopping experience. By combining technology, expertise, and care, we aim to make every purchase not just a transaction, but a delightful and memorable experience for our customers.
</p>

            </motion.div>

            {/* Carousel Below */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full md:max-w-3xl mx-auto order-2"
            >
              <div className="aspect-video rounded-2xl shadow-lg overflow-hidden">
                <Carousel
                  showArrows
                  autoPlay
                  infiniteLoop
                  showThumbs={false}
                  showStatus={false}
                  className="w-full h-full"
                >
                  <div className="w-fit h-fit relative">
                    <Image src={assets.abouttwo} alt="Team Image 1"  className="object-contain" />
                  </div>
                  <div className="w-full h-full relative">
                    <Image src={assets.aboutthree} alt="Team Image 2"  className="object-contain" />
                  </div>
                  <div className="w-full h-full relative">
                    <Image src={assets.aboutfour} alt="Team Image 3" className="object-contain" />
                  </div>
                </Carousel>
              </div>
            </motion.div>
          </div>

          {/* Who We Are Section */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Yenu is more than just an online store — we’re a community of tech lovers who want to make the digital lifestyle accessible to everyone. 
              From smartphones to laptops and smart accessories, we carefully curate our products to ensure that every customer gets real value for their money.
            </p>
          </div>

          {/* Core Values */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Customer Satisfaction",
                  desc: "We are deeply committed to understanding and exceeding our customers’ expectations. From personalized support and prompt responses to hassle-free returns, every decision we make is focused on ensuring that your shopping experience with us is seamless, enjoyable, and trustworthy. Your satisfaction is not just our goal—it’s our guiding principle.",
                  icon: <FiHeart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                },
                {
                  title: "Innovation",
                  desc: "We constantly explore new technologies, tools, and strategies to enhance the shopping experience. From intuitive website design to advanced product recommendations and delivery solutions, we embrace creativity and innovation at every step. Our goal is to anticipate customer needs and deliver solutions that make shopping smarter, faster, and more enjoyable.",
                  icon: <FiZap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                },
                {
                  title: "Quality First",
                  desc: "We are committed to offering only the highest quality products sourced from trusted brands and verified suppliers. Every gadget, accessory, and device is carefully selected for durability, performance, and value. By prioritizing quality in every aspect of our business, we ensure that customers receive products that meet their expectations and last for years to come.",
                  icon: <FiShield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-xl shadow-lg bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {value.icon}
                  <h3 className="text-2xl font-bold mb-4 text-red-500">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Delivery Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-50 p-10 rounded-2xl shadow-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full max-w-md mx-auto"
            >
              <Image src={assets.aboutone} alt="Delivery Image" className="rounded-xl shadow-lg" />
            </motion.div>
            <div className="text-lg leading-relaxed">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Nationwide Delivery</h2>
              <p className="mb-4 text-gray-600">
                As a purely online store, we’ve perfected delivery. Our efficient network spans the entire country, ensuring fast and safe deliveries.
              </p>
              <p className="text-gray-600">
                We partner with reliable courier services for secure, on-time orders. Track your package in real time and rely on our support team for any help.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "Trusted by Thousands", desc: "Our growing base of happy customers proves that we deliver on our promises." },
                { title: "Affordable Prices", desc: "We balance quality with affordability so you get the best deals." },
                { title: "24/7 Support", desc: "Our dedicated support team is always here to help, day or night." }
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{point.title}</h3>
                  <p className="text-gray-600">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
