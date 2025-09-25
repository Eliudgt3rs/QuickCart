'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlogPage = () => {
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
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-12">Our Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden ">
                            <Link href={`/blog/${blog.id}`}>
                                
                                    <img src={`/${blog.image}`} alt={blog.title} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                                        <p className="text-gray-600 mb-4">{blog.snippet}</p>
                                        <div className="flex items-center">
                                            <p className="text-sm text-gray-500">{blog.author} - {blog.date}</p>
                                        </div>
                                    </div>
                                
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;
