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
              className={`px-4 py-2 border rounded-md ${
                currentPage === i + 1 ? 'bg-red-600 text-white' : 'bg-white text-gray-700'
              }`}
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
  );
};

export default HomeProducts;
