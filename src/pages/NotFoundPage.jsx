import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="font-comic text-7xl text-brand-yellow font-black rotate-[-6deg] inline-block bg-black px-4 py-2 border-4 border-brand-yellow shadow-brutal-dark">
          404!
        </div>

        <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-paper uppercase tracking-tight">
          LOST IN THE MULTIVERSE.
        </h1>

        <p className="text-sm text-brand-muted leading-relaxed">
          The panel you are looking for has suffered a reality collapse or drifted into an unregistered dimension.
        </p>

        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-6 py-3 bg-brand-yellow text-black font-black uppercase text-xs tracking-wider border-2 border-black hover:bg-white transition"
          >
            Warp Back Home
          </Link>
          <Link
            to="/books"
            className="px-6 py-3 bg-[#222222] text-brand-paper font-black uppercase text-xs tracking-wider border-2 border-brand-border hover:border-brand-yellow transition"
          >
            Explore Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
};
