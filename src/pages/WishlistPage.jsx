import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ComicCard } from '../components/books/ComicCard';
import { DEMO_COMICS } from '../data/demoComics';
import { DEMO_COMIC_VINE_ISSUES } from '../data/demoComicVine';
import { formatComicVineIssue } from '../services/comicVineApi';
import { Bookmark, Sparkles, BookOpen, Trash2, Shield, HardDrive } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist, books, toggleWishlist, showToast } = useApp();
  const [selectedGenre, setSelectedGenre] = useState('all');

  // Search across Marvel comics, Comic Vine issues, and local book records
  const allSavedPool = [
    ...DEMO_COMICS, 
    ...DEMO_COMIC_VINE_ISSUES.map(formatComicVineIssue), 
    ...books
  ];
  
  // Dedup and match wishlist IDs (supporting numbers or strings)
  const wishlistBooks = allSavedPool.filter(comic => {
    const cId = comic.id || comic.marvelId;
    return wishlist.some(wId => String(wId) === String(cId));
  });

  const filtered = wishlistBooks.filter(b => {
    if (selectedGenre === 'all') return true;
    return b.genres?.some(g => g.toLowerCase().includes(selectedGenre.toLowerCase()));
  });

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire local collection?')) {
      wishlist.forEach(id => toggleWishlist(id));
      showToast('Universe Collection emptied.', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#F5F0E8]">
      
      {/* Header */}
      <div className="border-b-4 border-black pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD400] text-black text-xs font-comic uppercase tracking-wider mb-2 border-2 border-black shadow-[2px_2px_0px_#000] font-bold rotate-[-1deg]">
              <Bookmark className="w-3.5 h-3.5 fill-black" />
              PERSONAL UNIVERSE VAULT
            </div>
            <h1 className="font-bebas text-5xl sm:text-7xl text-white uppercase tracking-wide leading-none">
              SAVED COMIC COLLECTION
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-1 max-w-xl">
              Your hand-curated comic book stack, persisted locally in your browser storage for instant discovery.
            </p>
          </div>

          <div className="bg-[#151519] border-3 border-black shadow-[4px_4px_0px_#000] px-5 py-2.5 text-right">
            <span className="text-[10px] uppercase font-comic text-[#8C8C96] block">SAVED ISSUES</span>
            <span className="font-bebas text-3xl text-[#FFD400] leading-none">
              {wishlistBooks.length} TITLES
            </span>
          </div>
        </div>

        {/* Local Storage Notice Banner */}
        <div className="mt-6 p-3 bg-black/60 border-2 border-neutral-800 text-xs text-neutral-400 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#FFD400] shrink-0" />
            <span>
              <strong>Local Browser Storage:</strong> This collection is securely saved on this device via LocalStorage and does not require an account.
            </span>
          </div>

          {wishlistBooks.length > 0 && (
            <button
              onClick={handleClearAll}
              className="font-comic text-xs uppercase tracking-wider text-[#ED1D24] hover:text-[#FFD400] shrink-0 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          )}
        </div>
      </div>

      {wishlistBooks.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 bg-[#151519] border-3 border-black shadow-[8px_8px_0px_#000] p-8 space-y-4 max-w-2xl mx-auto">
          <div className="inline-block p-4 bg-black border-2 border-neutral-700 rotate-[-2deg]">
            <Bookmark className="w-14 h-14 text-[#ED1D24]" />
          </div>
          <h2 className="font-bebas text-4xl text-white uppercase tracking-wide">
            YOUR VAULT IS WAITING FOR HEROES
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto font-sans">
            You haven't bookmarked any Marvel comics yet. Browse our iconic storylines, click the bookmark icon on any cover, and build your digital collection.
          </p>
          <div className="pt-3">
            <Link
              to="/books"
              className="comic-btn-red px-8 py-3 text-xs uppercase tracking-wider inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 stroke-[2.5]" />
              Explore Comics Archive
            </Link>
          </div>
        </div>
      ) : (
        /* Saved Collection Grid */
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((comic) => (
              <ComicCard key={comic.id || comic.marvelId} comic={comic} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
