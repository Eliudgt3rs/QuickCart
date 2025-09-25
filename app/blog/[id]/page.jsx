'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlogPostPage = () => {
    const [blog, setBlog] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                const res = await fetch(`/api/blog/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBlog(data);
                }
            };
            fetchBlog();
        }
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-16 mt-4">
                <div className="max-w-4xl mx-auto">
                    <img src={`/${blog.image}`} alt={blog.title} className="w-full h-fit object-cover rounded-lg mb-8" />
                    <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                    <div className="flex items-center text-gray-500 mb-8">
                        <p>{blog.author} - {blog.date}</p>
                    </div>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogPostPage;
