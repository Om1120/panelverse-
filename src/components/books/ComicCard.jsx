import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bookmark, BookOpen, Star, Calendar, Sparkles, Layers } from 'lucide-react';
import { truncateText } from '../../utils/comicFormatting';

export const ComicCard = ({ comic, priority = false }) => {
  const { isInWishlist, toggleWishlist, getReadingProgress } = useApp();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  if (!comic) return null;

  const comicId = comic.id || comic.marvelId;
  const isSaved = isInWishlist(comicId);
  const progress = getReadingProgress(comicId);

  // Fallback image if network fails
  const coverSrc = imgError 
    ? 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' 
    : (comic.coverImage || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80');

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(comicId);
  };

  const handleReadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/read/${comicId}`);
  };

  // Subtle 3D card tilt effect on mouse move
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width - 0.5) * 8; // Max 4deg
    const yPercent = (y / rect.height - 0.5) * -8;
    setTiltStyle({
      transform: `perspective(700px) rotateX(${yPercent.toFixed(1)}deg) rotateY(${xPercent.toFixed(1)}deg) translateY(-4px)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.3s ease-out'
    });
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="group relative flex flex-col bg-[#151519] border-3 border-black hover:border-[#ED1D24] shadow-[4px_4px_0px_#000000] hover:shadow-[7px_7px_0px_#ED1D24] transition-colors duration-200 focus-within:ring-2 focus-within:ring-[#FFD400]"
    >
      {/* Cover Image Container (True Comic Ratio 2:3) */}
      <Link 
        to={`/books/${comicId}`} 
        className="relative aspect-[2/3] overflow-hidden bg-[#0B0B0D] block border-b-3 border-black select-none"
        aria-label={`View details for ${comic.title}`}
      >
        <img
          src={coverSrc}
          alt={`Cover of ${comic.title}`}
          onError={() => setImgError(true)}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Vintage Comic Corner Price / Issue Box Stamp */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          <div className="bg-[#ED1D24] text-white font-comic text-[11px] sm:text-xs px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg] tracking-wider uppercase">
            {comic.issueNumber !== undefined && comic.issueNumber !== null ? `ISSUE #${comic.issueNumber}` : 'ORIGINAL'}
          </div>

          {comic.isTrending && (
            <div className="bg-[#FFD400] text-black font-comic text-[10px] px-1.5 py-0.2 border border-black shadow-[1px_1px_0px_#000] rotate-[1deg] tracking-wider uppercase font-bold">
              HOT ISSUE
            </div>
          )}

          {comic.isEssential && (
            <div className="bg-[#1769FF] text-white font-comic text-[9px] px-1.5 py-0.2 border border-black shadow-[1px_1px_0px_#000] rotate-[-1deg] tracking-wider uppercase font-bold">
              MUST-READ
            </div>
          )}
        </div>

        {/* Bookmark Action Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-2 border-2 border-black transition z-20 ${
            isSaved 
              ? 'bg-[#FFD400] text-black shadow-[2px_2px_0px_#000] scale-105' 
              : 'bg-black/80 text-white hover:bg-[#ED1D24] hover:text-white shadow-[2px_2px_0px_#000]'
          }`}
          title={isSaved ? "Remove from universe collection" : "Save to universe collection"}
          aria-label={isSaved ? `Remove ${comic.title} from collection` : `Add ${comic.title} to collection`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-black' : ''}`} />
        </button>

        {/* Saved Reading Progress Bar */}
        {progress && (
          <div className="absolute bottom-0 inset-x-0 bg-black/95 px-2 py-1 flex items-center justify-between text-[10px] border-t-2 border-[#ED1D24] z-10">
            <span className="font-comic text-[#FFD400] tracking-wider text-xs">
              Page {progress.currentPage} ({progress.progressPercentage}%)
            </span>
            <div className="w-16 h-1.5 bg-neutral-800 overflow-hidden border border-black">
              <div 
                className="h-full bg-[#ED1D24]" 
                style={{ width: `${progress.progressPercentage}%` }} 
              />
            </div>
          </div>
        )}

        {/* Hover Quick Read CTA Overlay (pointer-only) */}
        <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center p-4 z-10 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={handleReadClick}
            className="comic-btn-red px-4 py-2 flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-wider"
          >
            <BookOpen className="w-4 h-4 stroke-[2.5]" />
            Read Issue Free
          </button>
        </div>
      </Link>

      {/* Card Info Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2 bg-[#151519]">
        <div>
          {/* Metadata Row: Series / Year / Rating */}
          <div className="flex items-center justify-between text-[11px] mb-1.5 gap-2">
            <span className="font-comic text-[11px] uppercase tracking-wider text-[#FFD400] bg-black px-1.5 py-0.5 border border-neutral-800 truncate max-w-[130px]">
              {comic.seriesName || comic.genres?.[0] || 'Marvel Universe'}
            </span>
            
            <div className="flex items-center gap-1 shrink-0">
              {comic.year && (
                <span className="text-[10px] text-[#777780] font-mono font-bold">
                  {comic.year}
                </span>
              )}
              <span className="flex items-center gap-0.5 font-bold text-white text-[11px] bg-black/70 px-1 py-0.2 border border-neutral-800">
                <Star className="w-2.5 h-2.5 fill-[#FFD400] text-[#FFD400]" />
                {comic.rating || 4.8}
              </span>
            </div>
          </div>

          {/* Comic Title */}
          <Link to={`/books/${comicId}`}>
            <h3 className="font-bebas text-lg sm:text-xl text-white group-hover:text-[#FFD400] transition-colors leading-tight line-clamp-1 tracking-wide">
              {comic.title}
            </h3>
          </Link>

          {/* Creators */}
          <p className="text-[11px] text-[#8C8C96] truncate mt-1">
            By <span className="text-[#F5F0E8] font-medium">{Array.isArray(comic.creators) ? comic.creators.slice(0, 2).join(', ') : 'Marvel Bullpen'}</span>
          </p>

          {/* Short description preview */}
          {comic.description && (
            <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1.5 font-sans leading-relaxed">
              {truncateText(comic.description, 85)}
            </p>
          )}
        </div>

        {/* Card Footer */}
        <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[11px]">
          <span className="text-[10px] font-comic uppercase tracking-wider text-[#777780] flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#ED1D24]" />
            {comic.pageCount ? `${comic.pageCount} Pgs` : 'Special Edition'}
          </span>

          <Link
            to={`/books/${comicId}`}
            className="font-comic text-xs text-white group-hover:text-[#ED1D24] uppercase tracking-wider flex items-center gap-0.5"
          >
            Explore Issue →
          </Link>
        </div>
      </div>
    </article>
  );
};
