'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {

    const { paginatedProducts, products, productsPerPage, currentPage, setCurrentPage } = useAppContext();

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    return (
        <>
            <Navbar />
            <div className="mt-6 flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">All products</p>
                    <div className="w-16 h-0.5 bg-red-600 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                    {paginatedProducts.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8 mb-14 w-full">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-md disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 border rounded-md ${currentPage === i + 1 ? 'bg-red-600 text-white' : 'bg-white text-gray-700'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded-md disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;