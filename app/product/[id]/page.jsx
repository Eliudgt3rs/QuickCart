"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import ImageModal from "@/components/ImageModal"; // Import ImageModal

const Product = () => {
    const { id } = useParams();
    const { products, router, addToCart } = useAppContext();

    const [productData, setProductData] = useState(null);
    const [mainImageDisplay, setMainImageDisplay] = useState(null); // State to control the main displayed image
    const [showImageModal, setShowImageModal] = useState(false); // State for modal visibility
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for current image index in modal

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
        if (product && product.images && product.images.length > 0) {
            setMainImageDisplay(product.images[0]); // Set initial main image
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [id, products.length]);

    const handleThumbnailClick = (image, index) => {
        setMainImageDisplay(image);
        setCurrentImageIndex(index);
    };

    const handleMainImageClick = () => {
        if (productData && productData.images && productData.images.length > 0) {
            setShowImageModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowImageModal(false);
    };

    return productData ? (<>
        <Navbar />
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                        <Image
                            src={mainImageDisplay || productData.images[0]} // Use mainImageDisplay
                            alt="Product Main Image"
                            className="w-full h-auto object-cover mix-blend-multiply cursor-pointer" // Added cursor-pointer
                            width={1280}
                            height={720}
                            onClick={handleMainImageClick} // Add onClick to main image
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productData.images.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => handleThumbnailClick(image, index)} // Updated onClick
                                                                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                            >
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.7)</p>
                    </div>

                    {productData.features && productData.features.trim() !== "" && (
                        <>
                            <p className="text-gray-900 mt-3 text-2xl">Features</p>
                            <ul className="list-disc list-inside text-gray-700 mt-3">
                                {productData.features
                                    .split(",") // split features by comma
                                    .map((feature, idx) => (
                                        <li key={idx}>{feature.trim()}</li>
                                    ))}
                            </ul>
                        </>
                    )}

                    <p className="text-gray-900 mt-3 text-2xl"> About this product</p>
                    <p className="text-gray-700 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-red-500 mt-3 text-2xl"> Price</p>
                    <p className="text-3xl font-medium mt-6">
                        Ksh{productData.offerPrice}
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            Ksh{productData.price}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Condition</td>
                                    <td className="text-gray-800/50 ">Best Quality</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Color</td>
                                    <td className="text-gray-800/50 ">Multi</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center mt-10 gap-4 rounded-full">
                        <button
                            onClick={() => addToCart(productData._id, true)}
                            className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 hover:scale-105 transition rounded-full border border-gray-500/20"
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={() => { addToCart(productData._id, true); router.push('/cart'); }}
                            className="w-full py-3.5 bg-red-500 text-white hover:bg-red-700 hover:scale-105 transition rounded-full border border-red-500/20"
                        >
                            Buy now
                        </button>

                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium">Featured <span className="font-medium text-red-600">Products</span></p>
                    <div className="w-28 h-0.5 bg-red-600 mt-2"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                    See more
                </button>
            </div>
        </div>
        <Footer />

        {showImageModal && productData && productData.images && (
            <ImageModal
                images={productData.images}
                initialIndex={currentImageIndex}
                onClose={handleCloseModal}
            />
        )}
    </>
    ) : <Loading />
};

export default Product;
