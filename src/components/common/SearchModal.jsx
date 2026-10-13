import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DEMO_COMICS } from '../../data/demoComics';
import { DEMO_CHARACTERS } from '../../data/demoCharacters';
import { DEMO_COMIC_VINE_CHARACTERS } from '../../data/demoComicVine';
import { 
  Search, X, BookOpen, User, Layers, Tag, ArrowRight, 
  Sparkles, Loader2, Star, Zap 
} from 'lucide-react';
import { fetchUnifiedComics } from '../../services/comicService';

export const SearchModal = () => {
  const { searchModalOpen, setSearchModalOpen, books, authors, series } = useApp();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'comics' | 'characters'
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [searchModalOpen]);

  // Global shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  // Live debounced query
  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    const trimmed = query.trim();
    if (!trimmed) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const response = await fetchUnifiedComics({
          limit: 10,
          query: trimmed
        });
        setSearchResults(response.comics || []);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [query]);

  if (!searchModalOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Matched characters (Marvel + Comic Vine)
  const allCharactersPool = [...DEMO_CHARACTERS, ...DEMO_COMIC_VINE_CHARACTERS];
  const matchedCharacters = cleanQuery
    ? allCharactersPool.filter(c => 
        c.name.toLowerCase().includes(cleanQuery) || 
        c.realName?.toLowerCase().includes(cleanQuery)
      )
    : allCharactersPool.slice(0, 4);

  // Combined matched comics (Unified API / Demo + Existing books)
  const combinedComics = cleanQuery
    ? [
        ...searchResults,
        ...books.filter(b => 
          b.title.toLowerCase().includes(cleanQuery) ||
          b.creators?.some(c => c.toLowerCase().includes(cleanQuery))
        )
      ].slice(0, 8)
    : [...DEMO_COMICS.slice(0, 4), ...books.slice(0, 2)];

  const handleSelect = (url) => {
    setSearchModalOpen(false);
    navigate(url);
  };

  const handleKeyDownSubmit = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      setSearchModalOpen(false);
      navigate(`/books?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Search Dialogue Panel */}
      <div 
        className="relative w-full max-w-3xl bg-[#151519] border-4 border-black shadow-[8px_8px_0px_#ED1D24] text-[#F5F0E8] overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-heading"
      >
        {/* Halftone header pattern */}
        <div className="absolute top-0 right-0 w-32 h-16 bg-comic-dots opacity-20 pointer-events-none" />

        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b-3 border-black bg-[#0B0B0D] flex items-center gap-3">
          <Search className="w-6 h-6 text-[#ED1D24] shrink-0 stroke-[2.5]" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDownSubmit}
            placeholder="Search thousands of Marvel comics, characters, or storylines..."
            className="w-full bg-transparent text-white font-bebas text-2xl sm:text-3xl placeholder-neutral-500 outline-none tracking-wide"
            aria-label="Search comics"
          />

          {isSearching && (
            <Loader2 className="w-5 h-5 text-[#FFD400] animate-spin shrink-0" />
          )}

          {query && !isSearching && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setSearchModalOpen(false)}
            className="p-1.5 bg-[#151519] border-2 border-black hover:bg-[#ED1D24] text-white transition ml-1"
            aria-label="Close search dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Filters Row */}
        <div className="px-4 py-2 bg-black border-b-2 border-neutral-800 flex items-center justify-between text-xs">
          <div className="flex gap-2 font-comic uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2 py-0.5 border ${
                activeTab === 'all' 
                  ? 'bg-[#FFD400] text-black border-black font-bold' 
                  : 'bg-[#151519] text-neutral-400 border-neutral-700'
              }`}
            >
              All Matches
            </button>
            <button
              onClick={() => setActiveTab('comics')}
              className={`px-2 py-0.5 border ${
                activeTab === 'comics' 
                  ? 'bg-[#ED1D24] text-white border-black' 
                  : 'bg-[#151519] text-neutral-400 border-neutral-700'
              }`}
            >
              Comics ({combinedComics.length})
            </button>
            <button
              onClick={() => setActiveTab('characters')}
              className={`px-2 py-0.5 border ${
                activeTab === 'characters' 
                  ? 'bg-[#1769FF] text-white border-black' 
                  : 'bg-[#151519] text-neutral-400 border-neutral-700'
              }`}
            >
              Heroes ({matchedCharacters.length})
            </button>
          </div>

          <span className="hidden sm:inline text-neutral-500 font-mono text-[11px]">
            Press <kbd className="text-[#FFD400] bg-neutral-900 px-1 border border-neutral-700">Enter</kbd> to explore all
          </span>
        </div>

        {/* Scrollable Results Area */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-6 flex-1">
          
          {/* Matched Characters Strip */}
          {(activeTab === 'all' || activeTab === 'characters') && matchedCharacters.length > 0 && (
            <div>
              <span className="font-comic text-xs uppercase tracking-wider text-[#FFD400] block mb-2.5">
                SUPERHERO ROSTER:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {matchedCharacters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => handleSelect(`/books?character=${char.id}`)}
                    className="flex items-center gap-2.5 p-2 bg-black/60 hover:bg-black border-2 border-neutral-800 hover:border-[#ED1D24] transition text-left group"
                  >
                    <img
                      src={`${char.thumbnail.path}/portrait_small.${char.thumbnail.extension}`}
                      alt={char.name}
                      className="w-9 h-9 object-cover rounded-full border border-black shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bebas text-lg text-white group-hover:text-[#FFD400] leading-none truncate">
                        {char.name}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-mono truncate">
                        {char.realName}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Comics Grid */}
          {(activeTab === 'all' || activeTab === 'comics') && (
            <div>
              <span className="font-comic text-xs uppercase tracking-wider text-neutral-400 block mb-2.5">
                {query ? 'MATCHING COMIC ISSUES:' : 'POPULAR MULTIVERSE PICKS:'}
              </span>

              {combinedComics.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {combinedComics.map((comic) => {
                    const cId = comic.id || comic.marvelId;
                    return (
                      <button
                        key={cId}
                        onClick={() => handleSelect(`/books/${cId}`)}
                        className="flex gap-3 p-2.5 bg-black/60 hover:bg-black border-2 border-neutral-800 hover:border-[#ED1D24] shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#ED1D24] transition text-left group"
                      >
                        {/* Cover thumbnail */}
                        <div className="w-14 h-20 bg-black shrink-0 overflow-hidden border border-black">
                          <img
                            src={comic.coverImage}
                            alt={comic.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between py-0.5 truncate">
                          <div>
                            <span className="font-comic text-[10px] text-[#FFD400] uppercase tracking-wider block">
                              {comic.issueNumber !== undefined ? `Issue #${comic.issueNumber}` : 'Special'}
                            </span>
                            <p className="font-bebas text-lg text-white group-hover:text-[#FFD400] leading-tight truncate">
                              {comic.title}
                            </p>
                            <p className="text-[11px] text-[#8C8C96] truncate mt-0.5">
                              {Array.isArray(comic.creators) ? comic.creators[0] : 'Marvel Creators'}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                            {comic.year && <span>{comic.year}</span>}
                            <span>•</span>
                            <span className="text-[#ED1D24] font-comic uppercase">Read Issue →</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-10 text-center border-2 border-neutral-800 p-6 bg-black">
                  <p className="font-bebas text-2xl text-white">NO COMICS FOUND FOR "{query}"</p>
                  <p className="text-xs text-neutral-400 mt-1">Try another superhero name or browse all comics</p>
                  <button
                    onClick={() => {
                      setSearchModalOpen(false);
                      navigate('/books');
                    }}
                    className="comic-btn-yellow mt-4 px-4 py-1.5 text-xs uppercase tracking-wider"
                  >
                    Browse Catalog
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-black border-t-2 border-black flex items-center justify-between text-xs text-neutral-400 font-comic uppercase tracking-wider">
          <span>Marvel Comics Universe Index</span>
          <button
            onClick={() => {
              setSearchModalOpen(false);
              navigate(query ? `/books?search=${encodeURIComponent(query)}` : '/books');
            }}
            className="text-[#FFD400] hover:text-white flex items-center gap-1"
          >
            Open Full Explore Page <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
