import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ChevronLeft, CheckCircle2, CreditCard, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CheckoutPage: React.FC = () => {
  const { cart, placeOrder, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'success'>('form');

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = totalPrice + (totalPrice > 100 ? 0 : 15);

  const handlePlaceOrder = () => {
    // Simulate API call
    setTimeout(() => {
      placeOrder({
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toISOString(),
        total: total,
        status: 'PENDING',
        items: [...cart]
      });
      setStep('success');
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-2xl font-bold text-text-main mb-2">Order Placed!</h1>
        <p className="text-text-muted mb-8">Thank you for your purchase. Your order is being processed.</p>
        <button 
          onClick={() => navigate('/orders')}
          className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30"
        >
          View Order
        </button>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-sm text-text-muted font-medium"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Checkout</h1>
      </div>

      <div className="px-6 space-y-6">
        {/* Address Section */}
        <div>
          <h3 className="font-bold text-text-main mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-primary" /> Shipping Address
          </h3>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-transparent hover:border-primary/20 transition-colors cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-sm">Alex Rivera</p>
                <p className="text-xs text-text-muted mt-1">123 Ocean Drive, Suite 404</p>
                <p className="text-xs text-text-muted">Miami, FL 33139</p>
              </div>
              <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-full">Default</span>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div>
          <h3 className="font-bold text-text-main mb-3 flex items-center gap-2">
            <CreditCard size={18} className="text-primary" /> Payment Method
          </h3>
          <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center">
                <div className="w-6 h-4 border border-white/30 rounded-sm"></div>
              </div>
              <div>
                <p className="font-bold text-sm">Visa ending in 4242</p>
                <p className="text-xs text-text-muted">Expires 12/25</p>
              </div>
            </div>
            <div className="w-5 h-5 rounded-full border-4 border-primary"></div>
          </div>
        </div>

        {/* Order Items Preview */}
        <div>
          <h3 className="font-bold text-text-main mb-3">Items ({cart.length})</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {cart.map(item => (
              <div key={item.id} className="shrink-0 w-20">
                <img src={item.image} className="w-20 h-20 rounded-2xl object-cover bg-white mb-1" />
                <p className="text-[10px] font-medium truncate">{item.title}</p>
                <p className="text-[10px] text-text-muted">Qty: {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 max-w-md mx-auto md:max-w-lg lg:max-w-xl">
        <div className="flex justify-between mb-4">
            <span className="text-text-muted">Total Amount</span>
            <span className="font-bold text-xl text-text-main">${total.toFixed(2)}</span>
        </div>
        <button 
            onClick={handlePlaceOrder}
            className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
        >
            Pay Now
        </button>
      </div>
    </div>
  );
};
