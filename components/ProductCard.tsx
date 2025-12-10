import React from 'react';
import { Product } from '../types';
import { Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);
  const isLiked = wishlist.includes(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-surface rounded-3xl p-4 relative shadow-soft cursor-pointer hover:shadow-lg transition-shadow duration-300 h-[280px] flex flex-col justify-between"
    >
      {/* Wishlist Icon */}
      <button 
        onClick={handleWishlistClick}
        className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-red-50 transition-colors"
      >
        <Heart 
          size={18} 
          className={clsx(
            "transition-colors",
            isLiked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
          )} 
        />
      </button>

      {/* Image Container */}
      <div className="relative h-[65%] w-full flex items-center justify-center mb-2">
        <img 
          src={product.image} 
          alt={product.title}
          className="h-full w-full object-cover rounded-2xl"
          loading="lazy"
        />
        
        {/* Blue Pill Price Tag */}
        <div className="absolute bottom-2 left-2 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          ${product.price.toFixed(0)}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-text-main text-sm line-clamp-2 leading-tight flex-1 mr-2">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={12} className="fill-accent text-accent" />
            <span className="text-xs font-semibold text-text-main">{product.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-text-muted">{product.brand}</span>
          {product.stock < 10 && (
            <span className="text-[10px] font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
              {product.stock} left
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
