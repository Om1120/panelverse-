import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Layers, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export const SeriesPage = () => {
  const { series, books } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b-4 border-brand-cyan pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-cyan text-black text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          MULTIVERSE ARCS & SAGAS
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase tracking-tight">
          ONGOING <span className="text-brand-cyan">SERIES.</span>
        </h1>
        <p className="text-sm text-brand-muted mt-2 max-w-xl">
          Multi-issue serial epics with connected lore, verified reading order, and expanding mythologies.
        </p>
      </div>

      {/* Series Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {series.map((s) => {
          const seriesBooks = books.filter(b => s.bookIds?.includes(b.id));
          return (
            <div 
              key={s.id}
              className="bg-[#191919] border-2 border-brand-border hover:border-brand-cyan p-5 shadow-brutal-dark transition flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-black overflow-hidden mb-4 border border-brand-border">
                  <img src={s.coverImage} alt={s.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-brand-cyan text-[10px] font-black uppercase border border-brand-cyan">
                    {s.genre}
                  </span>
                </div>

                <h2 className="font-display font-black text-xl text-brand-paper">
                  {s.name}
                </h2>
                <p className="text-xs text-brand-muted mt-1">
                  Created by <strong className="text-brand-paper">{s.creatorName}</strong>
                </p>

                <p className="text-xs text-brand-muted mt-3 line-clamp-3 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-border flex items-center justify-between">
                <span className="text-xs font-bold text-brand-paper flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand-cyan" />
                  {seriesBooks.length} Issues Released
                </span>
                <Link
                  to={`/series/${s.id}`}
                  className="px-3 py-1.5 bg-[#222222] hover:bg-brand-cyan hover:text-black text-brand-paper font-black uppercase text-xs border border-brand-border transition flex items-center gap-1"
                >
                  View Arc <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
