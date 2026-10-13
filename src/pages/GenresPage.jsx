import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

export const GenresPage = () => {
  const { genres, books } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b-4 border-brand-yellow pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-yellow text-black text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          DIMENSIONS & FLAVORS
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase tracking-tight">
          MULTIVERSE <span className="text-brand-yellow">GENRES.</span>
        </h1>
        <p className="text-sm text-brand-muted mt-2 max-w-xl">
          From neon cyberpunk alleyways to cursed feudal kingdoms and underground battle rings. Choose your narrative frequency.
        </p>
      </div>

      {/* Genre Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {genres.map((genre) => {
          const count = books.filter(b => b.genres?.some(g => g.toLowerCase().includes(genre.name.toLowerCase()) || genre.name.toLowerCase().includes(g.toLowerCase()))).length;
          return (
            <Link
              key={genre.id}
              to={`/books?genre=${genre.id}`}
              className="group p-6 bg-[#191919] border-2 border-brand-border hover:border-brand-yellow hover:shadow-brutal-yellow transition-all flex flex-col justify-between h-56"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: genre.color }} 
                  />
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-black border border-brand-border text-brand-muted group-hover:text-brand-yellow">
                    {count} {count === 1 ? 'Title' : 'Titles'}
                  </span>
                </div>

                <h2 className="font-display font-black text-xl text-brand-paper group-hover:text-brand-yellow uppercase tracking-tight">
                  {genre.name}
                </h2>

                <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                  {genre.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs font-black uppercase text-brand-paper group-hover:text-brand-yellow">
                <span>Enter Dimension</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
