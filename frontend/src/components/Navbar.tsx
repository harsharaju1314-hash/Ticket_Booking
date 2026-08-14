import React from 'react';
import { Search, Sparkles, Ticket, User, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: 'explore' | 'tickets';
  setActiveTab: (tab: 'explore' | 'tickets') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  passCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  passCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-2xl border-b border-slate-200/90 px-6 py-4 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo - BookMyConcert */}
        <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => setActiveTab('explore')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-600 to-amber-500 p-0.5 shadow-lg shadow-rose-500/25 group-hover:scale-108 transition-transform duration-300">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-rose-600 fill-rose-500/20" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                BOOKMY<span className="text-rose-600">CONCERT</span>
              </span>
              <span className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/80 text-rose-700 text-[9px] font-black px-2 py-0.5 rounded-md tracking-widest uppercase shadow-2xs">
                PRO 2.0
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-extrabold tracking-wider uppercase">
              India's #1 Live Stadium Booking Engine
            </span>
          </div>
        </div>

        {/* Central Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search concerts, artists, or stadiums across India..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/90 border border-slate-200/90 focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all shadow-2xs font-semibold"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation Tabs & VIP Profile Pill */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'explore'
                  ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 text-white shadow-md shadow-rose-500/25'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Explore Concerts
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 relative ${
                activeTab === 'tickets'
                  ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 text-white shadow-md shadow-rose-500/25'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              My Passes
              {passCount > 0 && (
                <span className="w-4 h-4 bg-emerald-500 text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-xs animate-pulse">
                  {passCount}
                </span>
              )}
            </button>
          </div>

          {/* User Profile Pill */}
          <div className="hidden lg:flex items-center gap-2.5 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-2xl shadow-2xs hover:shadow-xs transition-all">
            <div className="w-7.5 h-7.5 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-amber-500 flex items-center justify-center text-white shadow-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black text-slate-900 leading-tight">Harsha Varma</span>
              <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">VIP Member</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
