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
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-8 mb-14 w-full"> {/* Added flex-wrap and adjusted gap */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-md disabled:opacity-50 text-sm sm:text-base"
                        >
                            Prev
                        </button>
                        {/* Dynamic Page Numbers */}
                        {(() => {
                            const pageNumbers = [];
                            const maxPagesToShow = 4; // Max number of page buttons to show
                            const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
                            const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

                            if (startPage > 1) {
                                pageNumbers.push(
                                    <button
                                        key={1}
                                        onClick={() => handlePageChange(1)}
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded-md text-sm sm:text-base ${currentPage === 1 ? 'bg-red-600 text-white' : 'bg-white text-gray-700'}`}
                                    >
                                        1
                                    </button>
                                );
                                if (startPage > 2) {
                                    pageNumbers.push(<span key="ellipsis-start" className="px-1.5 py-1.5 sm:px-2 sm:py-2 text-sm sm:text-base">...</span>);
                                }
                            }

                            for (let i = startPage; i <= endPage; i++) {
                                pageNumbers.push(
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i)}
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded-md text-sm sm:text-base ${currentPage === i ? 'bg-red-600 text-white' : 'bg-white text-gray-700'}`}
                                    >
                                        {i}
                                    </button>
                                );
                            }

                            if (endPage < totalPages) {
                                if (endPage < totalPages - 1) {
                                    pageNumbers.push(<span key="ellipsis-end" className="px-1.5 py-1.5 sm:px-2 sm:py-2 text-sm sm:text-base">...</span>);
                                }
                                pageNumbers.push(
                                    <button
                                        key={totalPages}
                                        onClick={() => handlePageChange(totalPages)}
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded-md text-sm sm:text-base ${currentPage === totalPages ? 'bg-red-600 text-white' : 'bg-white text-gray-700'}`}
                                    >
                                        {totalPages}
                                    </button>
                                );
                            }
                            return pageNumbers;
                        })()}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-md disabled:opacity-50 text-sm sm:text-base"
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