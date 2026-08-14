import React, { useState } from 'react';
import { MapPin, Ticket } from 'lucide-react';
import type { Event } from '../types';
import { getConcertImage } from '../utils/imageHelper';

interface EventGridProps {
  events: Event[];
  onBookClick: (event: Event) => void;
}

export const EventGrid: React.FC<EventGridProps> = ({ events, onBookClick }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterCategories = [
    { id: 'all', label: `⚡ All Live Concerts (${events.length})` },
    { id: 'stadium', label: '🏟️ Stadium Tours' },
    { id: 'symphony', label: '🎵 Symphony & Melodies' },
    { id: 'hiphop', label: '🎤 Hip-Hop & Rap' },
    { id: 'edm', label: '🏝️ EDM Festivals' },
  ];

  const filteredEvents = events.filter((evt) => {
    if (activeFilter === 'all') return true;
    const titleLower = evt.title.toLowerCase();
    if (activeFilter === 'stadium') return titleLower.includes('stadium') || titleLower.includes('dil-luminati') || titleLower.includes('coldplay');
    if (activeFilter === 'symphony') return titleLower.includes('rahman') || titleLower.includes('shreya') || titleLower.includes('sonu');
    if (activeFilter === 'hiphop') return titleLower.includes('aujla') || titleLower.includes('divine');
    if (activeFilter === 'edm') return titleLower.includes('sunburn') || titleLower.includes('goa');
    return true;
  });

  return (
    <section className="flex flex-col gap-6 my-4">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-2.5">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-5 py-2.5 rounded-full font-black text-xs transition-all ${
              activeFilter === cat.id
                ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20 scale-105'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 shadow-xs'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-display font-black text-2xl text-slate-900 tracking-tight">
          Explore All Concert Tiers
        </h2>
        <span className="text-slate-500 text-xs font-semibold">
          Showing {filteredEvents.length} events
        </span>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEvents.map((evt) => {
          const cats = evt.ticketCategories || [];
          const minPrice = cats.length > 0 ? Math.min(...cats.map((c) => c.price)) : 1999;
          const remainingStock = cats.reduce((acc, c) => acc + (c.availableStock ?? c.totalCapacity ?? 0), 0);
          const concertImg = getConcertImage(evt.title);

          return (
            <div
              key={evt.id}
              className="bg-white border border-slate-200/80 hover:border-rose-500/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group min-h-[390px]"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={concertImg}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-white/95 border border-emerald-300 text-emerald-700 font-mono font-bold text-[11px] px-3 py-1 rounded-xl backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                  <Ticket className="w-3.5 h-3.5 text-emerald-600" />
                  {remainingStock.toLocaleString('en-IN')} Passes Left
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                <div>
                  <h3 className="font-black text-base text-slate-900 leading-snug group-hover:text-rose-600 transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    {evt.venue}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                  <span className="font-mono font-black text-xl text-slate-900">
                    ₹ {minPrice.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => onBookClick(evt)}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md shadow-rose-500/20 active:scale-95 transition-all"
                  >
                    Book Passes
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
