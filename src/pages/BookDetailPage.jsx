import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEMO_COMICS } from '../data/demoComics';
import { DEMO_COMIC_VINE_ISSUES } from '../data/demoComicVine';
import { formatComicVineIssue } from '../services/comicVineApi';
import { fetchUnifiedComicById } from '../services/comicService';
import { ComicCard } from '../components/books/ComicCard';
import { 
  BookOpen, Bookmark, Star, Calendar, Layers, Shield, 
  ArrowLeft, CheckCircle, Flame, Sparkles, User, PackageCheck,
  Share2, ChevronRight
} from 'lucide-react';

export const BookDetailPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { 
    books, 
    isInWishlist, 
    toggleWishlist, 
    getReadingProgress, 
    requestBorrow,
    showToast 
  } = useApp();

  const [activeComic, setActiveComic] = useState(null);
  const [loading, setLoading] = useState(true);

  // Find comic from DEMO_COMICS or Comic Vine or books or live fetch
  useEffect(() => {
    setLoading(true);

    // 1. Check DEMO_COMICS
    const demoMatch = DEMO_COMICS.find(c => String(c.id) === String(bookId) || String(c.marvelId) === String(bookId));
    if (demoMatch) {
      setActiveComic(demoMatch);
      setLoading(false);
      return;
    }

    // 2. Check DEMO_COMIC_VINE_ISSUES
    const cleanCvId = String(bookId).replace('cv-', '');
    const cvMatch = DEMO_COMIC_VINE_ISSUES.find(c => String(c.id) === cleanCvId);
    if (cvMatch) {
      setActiveComic(formatComicVineIssue(cvMatch));
      setLoading(false);
      return;
    }

    // 3. Check local books
    const bookMatch = books.find(b => String(b.id) === String(bookId));
    if (bookMatch) {
      setActiveComic(bookMatch);
      setLoading(false);
      return;
    }

    // 4. Fetch from Unified API (Marvel or Comic Vine)
    fetchUnifiedComicById(bookId)
      .then(result => {
        setActiveComic(result || DEMO_COMICS[0]);
      })
      .catch(() => {
        setActiveComic(DEMO_COMICS[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookId, books]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="p-6 bg-[#151519] border-3 border-black text-center space-y-2 shadow-[6px_6px_0px_#000]">
          <div className="w-8 h-8 border-4 border-[#ED1D24] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-bebas text-xl text-white">DECODING ISSUE ARCHIVE...</p>
        </div>
      </div>
    );
  }

  if (!activeComic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-bebas text-4xl text-white">ISSUE NOT FOUND IN THIS TIMELINE</h2>
        <p className="text-neutral-400 text-sm">The title you are searching for might have drifted into another dimension.</p>
        <Link to="/books" className="comic-btn-yellow inline-block px-6 py-2.5 text-xs uppercase tracking-wider">
          Return to Archive
        </Link>
      </div>
    );
  }

  const comicId = activeComic.id || activeComic.marvelId;
  const isSaved = isInWishlist(comicId);
  const progress = getReadingProgress(comicId);

  // Related comics from same series or genre
  const relatedComics = DEMO_COMICS.filter(c => 
    String(c.id) !== String(comicId) && 
    (c.seriesName === activeComic.seriesName || c.genres?.some(g => activeComic.genres?.includes(g)))
  ).slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Comic dossier link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="space-y-16 pb-24 text-[#F5F0E8]">
      
      {/* Ambient Blurred Backdrop Extension */}
      <div className="relative overflow-hidden pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div 
          className="absolute inset-0 opacity-15 filter blur-3xl pointer-events-none scale-125"
          style={{
            backgroundImage: `url(${activeComic.coverImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-comic-dots opacity-20 pointer-events-none" />

        {/* Back Link */}
        <div className="relative z-10 mb-6 flex items-center justify-between">
          <Link
            to="/books"
            className="inline-flex items-center gap-1.5 font-comic text-xs uppercase tracking-wider text-neutral-300 hover:text-[#FFD400] transition bg-black/60 px-3 py-1.5 border border-neutral-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 font-comic text-xs uppercase tracking-wider text-neutral-300 hover:text-white transition bg-black/60 px-3 py-1.5 border border-neutral-700"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Issue
          </button>
        </div>

        {/* Two-Column Cinematic Dossier Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Prominent Large Cover Artwork */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-md mx-auto aspect-[2/3] border-4 border-black shadow-[10px_10px_0px_#000] overflow-hidden bg-black group">
              <img
                src={activeComic.coverImage}
                alt={activeComic.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Top Issue Stamp */}
              <div className="absolute top-3 left-3 bg-[#ED1D24] text-white font-comic text-xs sm:text-sm px-3 py-1 border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-2deg]">
                {activeComic.issueNumber !== undefined ? `ISSUE #${activeComic.issueNumber}` : 'ORIGINAL'}
              </div>

              {/* Bookmark Toggle */}
              <button
                onClick={() => toggleWishlist(comicId)}
                className={`absolute top-3 right-3 p-2.5 border-2 border-black transition z-20 ${
                  isSaved
                    ? 'bg-[#FFD400] text-black shadow-[2px_2px_0px_#000]'
                    : 'bg-black/85 text-white hover:bg-[#ED1D24]'
                }`}
                aria-label="Add to collection"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-black' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Dossier Metadata & Synopsis */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Series & Year Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-black text-[#FFD400] font-comic text-xs uppercase tracking-wider px-2.5 py-1 border border-neutral-700">
                {activeComic.seriesName || 'Marvel Comics'}
              </span>
              {activeComic.year && (
                <span className="bg-black text-white font-mono text-xs px-2.5 py-1 border border-neutral-700">
                  {activeComic.year}
                </span>
              )}
              <span className="bg-black text-[#22C55E] font-comic text-xs px-2.5 py-1 border border-neutral-700 flex items-center gap-1">
                <Star className="w-3 h-3 fill-[#FFD400] text-[#FFD400]" />
                {activeComic.rating || 4.8} / 5.0
              </span>
            </div>

            {/* Title */}
            <h1 className="font-bebas text-5xl sm:text-7xl text-white tracking-wide uppercase leading-[0.9] drop-shadow-[3px_3px_0px_#000]">
              {activeComic.title}
            </h1>

            {/* Synopsis */}
            <div className="p-4 sm:p-5 bg-[#151519] border-3 border-black shadow-[4px_4px_0px_#000] space-y-2">
              <span className="font-comic text-xs uppercase tracking-widest text-[#FFD400] block">
                DOSSIER SYNOPSIS:
              </span>
              <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
                {activeComic.description}
              </p>
            </div>

            {/* Metadata Spec Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-black/60 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-comic uppercase block">FORMAT</span>
                <span className="font-bebas text-lg text-white">{activeComic.format || 'Comic'}</span>
              </div>
              <div className="p-3 bg-black/60 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-comic uppercase block">LENGTH</span>
                <span className="font-bebas text-lg text-white">{activeComic.pageCount ? `${activeComic.pageCount} Pgs` : 'Standard'}</span>
              </div>
              <div className="p-3 bg-black/60 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-comic uppercase block">PUBLISHER</span>
                <span className="font-bebas text-lg text-white">{activeComic.publisher || 'Marvel'}</span>
              </div>
              <div className="p-3 bg-black/60 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-comic uppercase block">ORIGINAL PRICE</span>
                <span className="font-bebas text-lg text-[#FFD400]">{activeComic.price || '$3.99'}</span>
              </div>
            </div>

            {/* Creators & Characters */}
            <div className="space-y-3 p-4 bg-black/60 border-2 border-neutral-800 text-xs text-neutral-300">
              {activeComic.creators && activeComic.creators.length > 0 && (
                <div>
                  <span className="text-[#8C8C96] block text-[10px] font-comic uppercase tracking-wider mb-1">
                    CREATIVE ARCHITECTS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeComic.creators.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#151519] border border-neutral-700 text-white font-mono text-[11px]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeComic.characters && activeComic.characters.length > 0 && (
                <div className="pt-2 border-t border-neutral-800">
                  <span className="text-[#8C8C96] block text-[10px] font-comic uppercase tracking-wider mb-1">
                    KEY CHARACTERS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeComic.characters.map((charName, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#151519] text-[#FFD400] border border-neutral-700 font-mono text-[11px]">
                        {charName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={`/read/${comicId}`}
                className="comic-btn-red px-6 py-3 text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5 stroke-[2.5]" />
                Read Sample Chapter
              </Link>

              <button
                onClick={() => toggleWishlist(comicId)}
                className={`px-5 py-3 font-comic text-xs sm:text-sm uppercase tracking-wider border-2 border-black flex items-center gap-2 transition ${
                  isSaved
                    ? 'bg-[#FFD400] text-black shadow-[3px_3px_0px_#000]'
                    : 'bg-[#151519] text-white hover:bg-black shadow-[3px_3px_0px_#000]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-black' : ''}`} />
                {isSaved ? 'Saved in Universe Collection' : 'Save to Collection'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Issues Section */}
      {relatedComics.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t-3 border-black pt-12">
          <div className="mb-6">
            <div className="inline-block bg-[#FFD400] text-black font-comic text-xs uppercase tracking-widest px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg] mb-1 font-bold">
              RELATED ARCHIVE FILES
            </div>
            <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
              MORE FROM THIS SAGA & UNIVERSE
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedComics.map((relComic) => (
              <ComicCard key={relComic.id} comic={relComic} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
