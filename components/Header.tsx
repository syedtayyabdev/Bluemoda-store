import React from 'react';
import { Bell, Search, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../store/useStore';

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onFilterClick }) => {
  const user = useStore(state => state.user);

  return (
    <div className="px-6 pt-8 pb-4 bg-background sticky top-0 z-40">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={user?.avatar || "https://i.pravatar.cc/150"} 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <p className="text-xs text-text-muted">Welcome back,</p>
            <h2 className="text-sm font-bold text-text-main">{user?.name || "Guest"}</h2>
          </div>
        </div>
        
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm relative hover:bg-gray-50 transition-colors">
          <Bell size={20} className="text-text-main" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-white rounded-2xl flex items-center px-4 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search size={20} className="text-text-muted mr-3" />
          <input 
            type="text" 
            placeholder="Search clothes..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full h-full bg-transparent outline-none text-sm font-medium text-text-main placeholder:text-gray-400"
          />
        </div>
        <button 
          onClick={onFilterClick}
          className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
        >
          <SlidersHorizontal size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};