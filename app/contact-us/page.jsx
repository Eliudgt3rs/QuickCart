'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 md:px-16 lg:px-32 py-20">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="text-lg text-gray-700 leading-relaxed">
          <p className="mb-4">
            We'd love to hear from you! Whether you have a question about our products,
            need assistance with an order, or just want to give us feedback,
            our team is ready to help.
          </p>
          <p className="mb-4">
            You can reach us through the following methods:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Email:</strong> support@quickcart.com</li>
            <li><strong>Phone:</strong> +1 (123) 456-7890</li>
            <li><strong>Address:</strong> 123 E-commerce Lane, Tech City, TC 98765</li>
          </ul>
          <p>
            Our customer service hours are Monday to Friday, 9:00 AM to 5:00 PM (EST).
            We aim to respond to all inquiries within 24-48 hours.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;