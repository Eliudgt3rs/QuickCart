import React from 'react';
import Link from 'next/link';

const BlogSection = ({ blogs }) => {
    return (
        <div className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">From Our Blog</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.slice(0, 3).map(blog => (
                        <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Link href={`/blog/${blog.id}`}>
                                
                                    <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                                        <p className="text-gray-600 mb-4">{blog.snippet}</p>
                                        <div className="flex items-center">
                                            <p className="text-sm text-gray-500">{blog.author} - {blog.date}</p>
                                        </div>
                                    </div>
                                
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link href="/blog">
                        <button className="text-lg font-semibold text-blue-600 hover:underline">Read More Blogs</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogSection;
