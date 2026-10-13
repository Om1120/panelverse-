import React, { useRef } from 'react';
import { ComicCard } from './ComicCard';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

export const ComicCarousel = ({ title, subtitle, badge, comics = [], viewAllLink }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (!comics || comics.length === 0) return null;

  return (
    <section className="relative space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-3 border-black pb-3">
        <div>
          {badge && (
            <div className="inline-block bg-[#ED1D24] text-white font-comic text-xs uppercase tracking-widest px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1.5deg] mb-1.5">
              {badge}
            </div>
          )}
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Controls & View All */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-xs font-comic uppercase tracking-wider text-[#FFD400] hover:text-white px-2.5 py-1 border border-neutral-800 hover:border-black transition mr-2"
            >
              View All ({comics.length}) →
            </a>
          )}

          <button
            onClick={() => scroll('left')}
            className="p-2 bg-[#151519] text-white hover:bg-[#ED1D24] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="p-2 bg-[#151519] text-white hover:bg-[#ED1D24] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Comic Strip */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {comics.map((comic, idx) => (
          <div
            key={comic.id || comic.marvelId || idx}
            className="w-[220px] sm:w-[260px] shrink-0 snap-start"
          >
            <ComicCard comic={comic} />
          </div>
        ))}
      </div>
    </section>
  );
};
