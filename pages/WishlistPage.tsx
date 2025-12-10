import React from 'react';
import { useStore } from '../store/useStore';
import { MOCK_PRODUCTS } from '../services/mockData';
import { ProductCard } from '../components/ProductCard';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WishlistPage: React.FC = () => {
  const wishlistIds = useStore(state => state.wishlist);
  const navigate = useNavigate();
  
  const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">My Wishlist</h1>
      </div>

      <div className="px-6">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted">No items saved yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
