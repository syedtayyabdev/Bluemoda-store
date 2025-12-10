import React from 'react';
import { useStore } from '../store/useStore';
import { ChevronLeft, Package, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OrdersPage: React.FC = () => {
  const orders = useStore(state => state.orders);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">My Orders</h1>
      </div>

      <div className="px-6 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-text-muted">No past orders found.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-5 rounded-3xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-sm">Order #{order.id}</p>
                  <p className="text-xs text-text-muted">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span className="text-[10px] font-bold bg-blue-50 text-primary px-2 py-1 rounded-full">
                  {order.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <img src={item.image} className="w-12 h-12 rounded-xl object-cover bg-gray-50" />
                    <div>
                      <p className="text-xs font-bold line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-text-muted">Qty: {item.quantity} • {item.selectedSize}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="text-xs text-text-muted">Total Amount</span>
                <span className="font-bold text-text-main">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
