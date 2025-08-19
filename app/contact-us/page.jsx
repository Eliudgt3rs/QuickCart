'use client'
import React, { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import emailjs from '@emailjs/browser';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const ContactUs = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      setError("EmailJS credentials are not set in the .env file.");
      setIsSubmitting(false);
      return;
    }

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          setIsSuccess(true);
          setError(null);
          form.current.reset();
      }, (error) => {
          console.log(error.text);
          setIsSuccess(false);
          setError('Failed to send message. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 md:px-16 lg:px-32 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900">Get in Touch</h1>
            <p className="text-lg text-gray-600 mt-4">
              We are here for you! How can we help?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Send us a Message</h2>
              <form ref={form} onSubmit={sendEmail}>
                <div className="mb-6">
                  <label htmlFor="user_name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                  <input type="text" placeholder='Enter Your Name' id="user_name" name="user_name" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="user_email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                  <input type="email" placeholder='Enter Your Email Address' id="user_email" name="user_email" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="user_phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number (Optional)</label>
                  <input type="tel" id="user_phone" placeholder='Enter Your Phone Number' name="user_phone" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Your Message</label>
                  <textarea id="message" placeholder='Type Your Message Here...' name="message" rows="5" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 disabled:bg-gray-400">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
              {isSuccess && <p className="text-green-500 mt-4 text-center">Message sent successfully!</p>}
              {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Contact Information</h3>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> yenustorekenya@gmail.com</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> 0719 790 026</p>
                <p className="text-gray-700 mb-2"><strong>Phone :</strong> 0748 459091</p>
               
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">We are the best in Kenya.</h3>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={assets.aboutone}
                    alt="Contact Us Image"
                    width={600}
                    height={400}
                    layout="responsive"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;