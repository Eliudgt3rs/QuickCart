'use client';

export const dynamic = 'force-dynamic'; // ✅ Force dynamic rendering — no static generation at build time

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SearchResults = () => {
  const { products } = useAppContext();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  return (
    <>
      <Navbar />
      <div className="mt-6 flex flex-col items-center pt-14 mx-6">
        <h2 className="text-2xl font-medium text-left w-full mb-6">
          Search Results for <span className="text-red-500">"{searchQuery}"</span>
        </h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
