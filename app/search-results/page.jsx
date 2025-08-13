'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function SearchResultsContent() {
  const { products } = useAppContext();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let results = products;

    if (searchQuery) {
      results = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) // Also filter by category if searchQuery matches
      );
    }

    setFilteredProducts(results);
  }, [searchQuery, products]);

  const displayQuery = searchQuery; // Only display search query

  return (
    <div className="mt-6 flex flex-col items-center pt-14 mx-6">
      <h2 className="text-2xl font-medium text-left w-full mb-6">
        Search Results for <span className="text-red-500">"{displayQuery}"</span>
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
  );
}

export default function SearchResultsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<p className="pt-20 text-center">Loading search results...</p>}>
        <SearchResultsContent />
      </Suspense>
      <Footer />
    </>
  );
}
