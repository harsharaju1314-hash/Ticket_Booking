import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, MapPin, Sparkles } from 'lucide-react';
import type { Event } from '../types';
import { getConcertImage } from '../utils/imageHelper';

interface AutoSliderProps {
  events: Event[];
  onBookClick: (event: Event) => void;
}

export const AutoSlider: React.FC<AutoSliderProps> = ({ events, onBookClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  return (
    <section className="flex flex-col gap-4 my-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-slate-900 flex items-center gap-2 tracking-tight">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Spotlight Concert Drops
          </h2>
          <p className="text-slate-500 text-xs mt-0.5 font-medium">
            Handpicked stadium tours and live music experiences across India
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-rose-500 text-slate-700 hover:text-rose-600 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-rose-500 text-slate-700 hover:text-rose-600 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {events.map((evt) => {
          const cats = evt.ticketCategories || [];
          const minPrice = cats.length > 0 ? Math.min(...cats.map((c) => c.price)) : 2500;
          const isHot = evt.title.includes('Diljit') || evt.title.includes('Coldplay');
          const concertImg = getConcertImage(evt.title);

          return (
            <div
              key={evt.id}
              className="w-[320px] shrink-0 bg-white border border-slate-200/80 hover:border-rose-500/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={concertImg}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <span className={`absolute top-3 left-3 text-[10px] font-black px-3 py-1 rounded-xl border backdrop-blur-md shadow-xs ${
                  isHot 
                    ? 'bg-amber-500/90 border-amber-400 text-white' 
                    : 'bg-indigo-600/90 border-indigo-400 text-white'
                }`}>
                  {isHot ? <span className="flex items-center gap-1.5"><Flame className="w-3 h-3 text-amber-200" /> STADIUM DROP</span> : 'LIVE TOUR'}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                <div>
                  <h3 className="font-black text-base text-slate-900 leading-snug group-hover:text-rose-600 transition-colors line-clamp-1">
                    {evt.title}
                  </h3>
                  <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    {evt.venue}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-mono font-black text-lg text-slate-900">
                    ₹ {minPrice.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => onBookClick(evt)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition-all"
                  >
                    Book Passes &rarr;
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
