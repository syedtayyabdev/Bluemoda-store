import React from 'react';
import { useLocation } from 'react-router-dom';
import { FloatingCart } from './FloatingCart';
import { BottomNav } from './BottomNav';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Hide BottomNav on Product Details, Cart, and Checkout pages 
  // so the fixed action buttons (Add to Cart, Checkout) are fully visible.
  const hideBottomNav = 
    location.pathname.includes('/product/') || 
    location.pathname.includes('/cart') || 
    location.pathname.includes('/checkout');

  // Floating cart should not appear on Cart or Checkout pages
  const showFloatingCart = !location.pathname.includes('/cart') && !location.pathname.includes('/checkout');

  return (
    <div className="min-h-screen bg-background text-text-main pb-20 font-sans selection:bg-primary/20">
      <div className="max-w-md mx-auto min-h-screen bg-background shadow-2xl relative overflow-hidden md:max-w-lg lg:max-w-xl pb-16">
        {children}
        {showFloatingCart && <FloatingCart />}
        {!hideBottomNav && <BottomNav />}
      </div>
    </div>
  );
};