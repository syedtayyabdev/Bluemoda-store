import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Star, ShoppingBag, Truck, RotateCcw, Check } from 'lucide-react';
import { MOCK_PRODUCTS } from '../services/mockData';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

const CLOTHING_SIZES = ['S', 'M', 'L', 'XL'];

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToCart = useStore(state => state.addToCart);
  
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  // Determine if product should have sizes
  const isClothing = product ? ['Swimwear', 'T-Shirts'].includes(product.category) : false;
  const availableSizes = isClothing ? CLOTHING_SIZES : ['One Size'];
  
  const [selectedSize, setSelectedSize] = useState<string>(isClothing ? 'M' : 'One Size');
  const [isAdded, setIsAdded] = useState(false);

  // Reset size and added state when product changes
  useEffect(() => {
    setSelectedSize(isClothing ? 'M' : 'One Size');
    setIsAdded(false);
  }, [id, isClothing]);

  if (!product) {
    return <div className="p-8 text-center mt-10">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Navbar Overlay */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-md mx-auto md:max-w-lg lg:max-w-xl pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors pointer-events-auto"
        >
          <ChevronLeft size={24} className="text-text-main" />
        </button>
        <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors pointer-events-auto">
          <Heart size={20} className="text-text-main" />
        </button>
      </div>

      {/* Hero Image */}
      <div className="h-[50vh] w-full bg-white relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover rounded-b-[3rem] shadow-soft"
        />
      </div>

      {/* Content */}
      <div className="px-6 pt-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold text-text-main mb-1">{product.title}</h1>
            <p className="text-text-muted text-sm font-medium">{product.brand} • {product.category}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="fill-accent text-accent" />
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-xs text-text-muted">({product.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mt-4 mb-6">
          {product.description}
        </p>

        {/* Size Selector */}
        <div className="mb-8">
          <h3 className="font-bold text-text-main mb-3">
            {isClothing ? 'Select Size' : 'Size'}
          </h3>
          <div className="flex gap-3 flex-wrap">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={clsx(
                  "h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 px-4 min-w-[3rem]",
                  selectedSize === size
                    ? "bg-primary text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "bg-white text-text-muted border border-gray-100 hover:bg-gray-50"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Specs / Features */}
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                    <Truck size={20} />
                </div>
                <div>
                    <p className="text-xs text-gray-400">Delivery</p>
                    <p className="text-sm font-bold">2-3 Days</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                    <RotateCcw size={20} />
                </div>
                <div>
                    <p className="text-xs text-gray-400">Returns</p>
                    <p className="text-sm font-bold">30 Days</p>
                </div>
            </div>
        </div>
      </div>

      {/* Add to Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 max-w-md mx-auto md:max-w-lg lg:max-w-xl">
        <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={clsx(
              "w-full font-bold py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95",
              isAdded 
                ? "bg-green-500 text-white shadow-green-500/30" 
                : "bg-primary text-white shadow-blue-500/30"
            )}
        >
            {isAdded ? (
              <>
                <Check size={20} />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag size={20} />
                Add to Cart - ${(product.price).toFixed(2)}
              </>
            )}
        </button>
      </div>
    </div>
  );
};