import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { CategoryRail } from '../components/CategoryRail';
import { ProductCard } from '../components/ProductCard';
import { FilterModal } from '../components/FilterModal';
import { MOCK_PRODUCTS } from '../services/mockData';
import { Category, Product } from '../types';
import { SearchX } from 'lucide-react';

export const HomePage: React.FC = () => {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Advanced Filter State
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);

  // Combine logic for Category Rail and Filter Modal
  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
  };

  const handleApplyFilters = (filters: { category: Category; minPrice: number; maxPrice: number; minRating: number }) => {
    setSelectedCategory(filters.category);
    setPriceRange({ min: filters.minPrice, max: filters.maxPrice });
    setMinRating(filters.minRating);
  };

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // 1. Category Filter
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      // 2. Search Filter
      const query = searchQuery.toLowerCase();
      const matchSearch = 
        product.title.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      // 3. Price Filter
      const matchPrice = product.price >= priceRange.min && product.price <= priceRange.max;

      // 4. Rating Filter
      const matchRating = product.rating >= minRating;

      return matchCategory && matchSearch && matchPrice && matchRating;
    });
  }, [selectedCategory, searchQuery, priceRange, minRating]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onSearch={setSearchQuery} 
        onFilterClick={() => setIsFilterOpen(true)}
      />
      
      {/* Promo Banner */}
      <div className="px-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-3 backdrop-blur-md">New Season</span>
            <h1 className="text-2xl font-bold mb-1">Get 30% OFF</h1>
            <p className="text-blue-100 text-sm mb-4">On all professional swimwear</p>
            <button className="bg-accent text-primary font-bold px-6 py-2 rounded-full text-sm hover:bg-yellow-300 transition-colors shadow-sm">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <CategoryRail selected={selectedCategory} onSelect={handleCategorySelect} />

      <div className="px-6 pb-24">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <SearchX size={32} className="text-gray-400" />
            </div>
            <h3 className="font-bold text-text-main mb-1">No products found</h3>
            <p className="text-sm text-text-muted">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={{
          category: selectedCategory,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          minRating: minRating
        }}
      />
    </div>
  );
};