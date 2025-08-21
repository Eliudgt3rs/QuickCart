'use client';
import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '@/context/AppContext';

const HomeProducts = () => {
  const { paginatedProducts, products, productsPerPage, currentPage, setCurrentPage } = useAppContext();
  const allProductsRef = useRef(null);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (allProductsRef.current) {
      allProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={allProductsRef} className="flex flex-col items-center pt-14">
      <h1 className="text-3xl font-semibold text-gray-800 text-center">
        All Products
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {paginatedProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
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
  );
};

export default HomeProducts;
