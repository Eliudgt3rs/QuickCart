'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 md:px-16 lg:px-32 py-20">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="text-lg text-gray-700 leading-relaxed">
          <p className="mb-4">
            Welcome to QuickCart, your number one source for all things electronics.
            We're dedicated to giving you the very best of products, with a focus on
            quality, customer service, and uniqueness.
          </p>
          <p className="mb-4">
            Founded in 2023, QuickCart has come a long way from its beginnings.
            When we first started out, our passion for "eco-friendly cleaning products"
            drove us to do intense research, and gave us the impetus to turn hard work
            and inspiration into a booming online store. We now serve customers all over
            the world, and are thrilled to be a part of the quirky, eco-friendly, fair trade
            wing of the electronics industry.
          </p>
          <p>
            We hope you enjoy our products as much as we enjoy offering them to you.
            If you have any questions or comments, please don't hesitate to contact us.
          </p>
          <p className="mt-6 text-right font-semibold">Sincerely,<br/>The QuickCart Team</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;