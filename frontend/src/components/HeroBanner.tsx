import React from 'react';
import { ArrowRight, Flame, MapPin, Sparkles, Users, Zap } from 'lucide-react';
import type { Event } from '../types';
import { getConcertImage } from '../utils/imageHelper';

interface HeroBannerProps {
  event?: Event;
  onBookClick: (event: Event) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ event, onBookClick }) => {
  if (!event) return null;

  const bgImage = getConcertImage(event.title);

  return (
    <div className="relative min-h-[490px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-950 flex flex-col justify-end p-8 md:p-12 group transition-all">
      {/* Background Image with Ambient Backdrop Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.96) 20%, rgba(15, 23, 42, 0.65) 60%, rgba(15, 23, 42, 0.15) 100%), url(${bgImage})`,
        }}
      />

      {/* Ambient Gradient Lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col gap-4 max-w-3xl">
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-black text-xs tracking-wider flex items-center gap-1.5 shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-rose-400" />
            INDIA STADIUM TOUR 2026
          </span>
          <span className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-xs tracking-wider flex items-center gap-1.5 shadow-sm backdrop-blur-md">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            HIGH DEMAND SURGE ACTIVE
          </span>
        </div>

        <h1 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight leading-tight drop-shadow-md">
          {event.title}
        </h1>

        <p className="text-slate-200 text-sm md:text-base font-bold flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
          {event.venue} &bull; <span className="text-slate-300 font-semibold">July 18, 2026 • 19:00 IST</span>
        </p>

        {/* Real-time Surge Counters */}
        <div className="flex flex-wrap items-center gap-4 my-2">
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 px-5 py-3 rounded-2xl flex flex-col shadow-lg">
            <span className="font-mono font-extrabold text-lg text-rose-600 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-rose-600" /> 38,450
            </span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fans In Queue</span>
          </div>

          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 px-5 py-3 rounded-2xl flex flex-col shadow-lg">
            <span className="font-mono font-extrabold text-lg text-emerald-600 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600" /> 6,500
            </span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Passes Remaining</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-6 mt-2 bg-white/95 border border-slate-200/90 p-3.5 pl-6 rounded-2xl w-fit backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Starting Price</span>
            <span className="font-mono font-extrabold text-2xl text-slate-900">₹ 4,999.00</span>
          </div>

          <button
            onClick={() => onBookClick(event)}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-black text-sm shadow-xl shadow-rose-500/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2"
          >
            Select Section & Buy Passes
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
