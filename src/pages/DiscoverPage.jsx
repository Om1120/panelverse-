import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ComicCard } from '../components/books/ComicCard';
import { DEMO_COMICS } from '../data/demoComics';
import { DEMO_CHARACTERS } from '../data/demoCharacters';
import { DEMO_COMIC_VINE_ISSUES, DEMO_COMIC_VINE_CHARACTERS } from '../data/demoComicVine';
import { formatComicVineIssue } from '../services/comicVineApi';
import { 
  Search, Filter, X, ArrowUpDown, BookOpen, 
  RotateCcw, Check, Sparkles, Layers, Zap, Star, Globe 
} from 'lucide-react';

export const DiscoverPage = () => {
  const { books, genres } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Query & filter params
  const queryParam = searchParams.get('search') || '';
  const genreParam = searchParams.get('genre') || 'all';
  const characterParam = searchParams.get('character') || 'all';
  const sourceParam = searchParams.get('source') || 'all';
  const sortParam = searchParams.get('sort') || 'popular';

  const [query, setQuery] = useState(queryParam);
  const [selectedGenre, setSelectedGenre] = useState(genreParam);
  const [selectedCharacter, setSelectedCharacter] = useState(characterParam);
  const [selectedSource, setSelectedSource] = useState(sourceParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [displayCount, setDisplayCount] = useState(12);

  // Sync state when URL params change
  useEffect(() => {
    setQuery(queryParam);
    setSelectedGenre(genreParam);
    setSelectedCharacter(characterParam);
    setSelectedSource(sourceParam);
    setSortBy(sortParam);
  }, [queryParam, genreParam, characterParam, sourceParam, sortParam]);

  // Update URL params
  const updateParams = (newParams) => {
    const updated = {
      ...(query ? { search: query } : {}),
      ...(selectedGenre !== 'all' ? { genre: selectedGenre } : {}),
      ...(selectedCharacter !== 'all' ? { character: selectedCharacter } : {}),
      ...(selectedSource !== 'all' ? { source: selectedSource } : {}),
      ...(sortBy !== 'popular' ? { sort: sortBy } : {}),
      ...newParams
    };
    // Clean empty
    Object.keys(updated).forEach(k => {
      if (!updated[k] || updated[k] === 'all') delete updated[k];
    });
    setSearchParams(updated);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search: query });
  };

  const clearAllFilters = () => {
    setQuery('');
    setSelectedGenre('all');
    setSelectedCharacter('all');
    setSelectedSource('all');
    setSortBy('popular');
    setSearchParams({});
    setDisplayCount(12);
  };

  // Combine curated Marvel comics + Comic Vine issues + local books catalog
  const allComicsPool = useMemo(() => {
    const marvelItems = DEMO_COMICS.map(c => ({
      ...c,
      isMarvel: true,
      apiSource: 'marvel'
    }));
    const comicVineItems = DEMO_COMIC_VINE_ISSUES.map(c => ({
      ...formatComicVineIssue(c),
      apiSource: 'comicvine'
    }));
    return [...marvelItems, ...comicVineItems, ...books];
  }, [books]);

  // Filtered & sorted comics
  const filteredComics = useMemo(() => {
    return allComicsPool.filter((comic) => {
      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const titleMatch = comic.title.toLowerCase().includes(q);
        const seriesMatch = comic.seriesName?.toLowerCase().includes(q);
        const creatorMatch = Array.isArray(comic.creators) 
          ? comic.creators.some(c => c.toLowerCase().includes(q)) 
          : false;
        const charMatch = Array.isArray(comic.characters) 
          ? comic.characters.some(c => c.toLowerCase().includes(q)) 
          : false;
        if (!titleMatch && !seriesMatch && !creatorMatch && !charMatch) {
          return false;
        }
      }

      // Source filter (Marvel vs Comic Vine)
      if (selectedSource !== 'all') {
        if (selectedSource === 'marvel' && !comic.isMarvel && comic.publisher !== 'Marvel Comics') return false;
        if (selectedSource === 'comicvine' && !comic.isComicVine && comic.apiSource !== 'comicvine') return false;
      }

      // Character filter
      if (selectedCharacter !== 'all') {
        const charIdNum = Number(selectedCharacter);
        const allChars = [...DEMO_CHARACTERS, ...DEMO_COMIC_VINE_CHARACTERS];
        const charObj = allChars.find(c => c.id === charIdNum);
        const charName = charObj ? charObj.name.toLowerCase() : '';
        const matchCharId = comic.characterIds && comic.characterIds.includes(charIdNum);
        const matchCharName = Array.isArray(comic.characters) && comic.characters.some(c => c.toLowerCase().includes(charName));
        const matchTitle = charName ? comic.title.toLowerCase().includes(charName) : false;
        if (!matchCharId && !matchCharName && !matchTitle) {
          return false;
        }
      }

      // Genre filter
      if (selectedGenre !== 'all') {
        const matchGenre = Array.isArray(comic.genres) && 
          comic.genres.some(g => g.toLowerCase().includes(selectedGenre.toLowerCase()));
        if (!matchGenre) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return (b.rating || 4.8) - (a.rating || 4.8);
      if (sortBy === 'newest') return (b.year || 2024) - (a.year || 2024);
      if (sortBy === 'issueNumber') return (a.issueNumber || 1) - (b.issueNumber || 1);
      // Default: Popular / Essential
      return (b.isEssential ? 1 : 0) - (a.isEssential ? 1 : 0);
    });
  }, [allComicsPool, query, selectedCharacter, selectedGenre, selectedSource, sortBy]);

  const visibleComics = filteredComics.slice(0, displayCount);
  const hasMore = displayCount < filteredComics.length;
  const hasActiveFilters = query || selectedGenre !== 'all' || selectedCharacter !== 'all' || selectedSource !== 'all' || sortBy !== 'popular';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#F5F0E8]">
      
      {/* Header Banner */}
      <div className="border-b-4 border-black pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ED1D24] text-white text-xs font-comic uppercase tracking-wider mb-2 border-2 border-black shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5" />
              MARVEL & COMIC VINE DISCOVERY ARCHIVE
            </div>
            <h1 className="font-bebas text-5xl sm:text-7xl text-white tracking-wide uppercase leading-none">
              EXPLORE COMICS & SAGAS
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-1 max-w-xl">
              Filter through Marvel milestones, Comic Vine universe issues, and graphic novel collector releases.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="font-comic text-xs uppercase tracking-wider text-[#FFD400] bg-black px-2.5 py-1 border border-neutral-800">
              {filteredComics.length} ISSUES FOUND
            </span>
          </div>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by comic title, creator, or issue number..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#151519] border-2 border-black focus:border-[#ED1D24] text-white text-sm font-sans placeholder-neutral-500 shadow-[3px_3px_0px_#000] outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="comic-btn-red px-6 py-2.5 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            Filter Archive
          </button>
        </form>
      </div>

      {/* Filter Controls Panel */}
      <div className="p-4 sm:p-5 bg-[#151519] border-3 border-black shadow-[5px_5px_0px_#000] space-y-4">
        
        {/* Row 0: API Source Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b-2 border-black pb-3">
          <span className="font-comic text-xs uppercase tracking-wider text-[#FFD400] shrink-0 mr-1">
            CATALOG GATEWAY:
          </span>
          {[
            { id: 'all', label: '⭐ All Gateways' },
            { id: 'marvel', label: '⚡ Marvel Developer Portal' },
            { id: 'comicvine', label: '🍇 Comic Vine API' }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => { setSelectedSource(s.id); updateParams({ source: s.id }); }}
              className={`px-3 py-1 font-comic text-xs uppercase tracking-wider border-2 shrink-0 transition ${
                selectedSource === s.id
                  ? 'bg-black text-[#FFD400] border-[#ED1D24] shadow-[2px_2px_0px_#ED1D24]'
                  : 'bg-black/60 text-neutral-400 border-neutral-800 hover:border-neutral-600'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Row 1: Character Filter Strip */}
        <div className="space-y-1.5">
          <span className="font-comic text-xs uppercase tracking-wider text-neutral-400 block">
            SUPERHERO SPOTLIGHT:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => { setSelectedCharacter('all'); updateParams({ character: 'all' }); }}
              className={`px-3 py-1 font-comic text-xs uppercase tracking-wider border-2 shrink-0 transition ${
                selectedCharacter === 'all'
                  ? 'bg-black text-[#FFD400] border-[#FFD400] shadow-[2px_2px_0px_#000]'
                  : 'bg-black/60 text-neutral-400 border-neutral-800 hover:border-neutral-600'
              }`}
            >
              All Heroes
            </button>
            {[...DEMO_CHARACTERS, ...DEMO_COMIC_VINE_CHARACTERS].map(c => (
              <button
                key={c.id}
                onClick={() => { setSelectedCharacter(String(c.id)); updateParams({ character: String(c.id) }); }}
                className={`px-3 py-1 font-comic text-xs uppercase tracking-wider border-2 shrink-0 transition flex items-center gap-1.5 ${
                  selectedCharacter === String(c.id)
                    ? 'bg-[#ED1D24] text-white border-black shadow-[2px_2px_0px_#000]'
                    : 'bg-black/60 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Genre Pills & Sort Dropdown */}
        <div className="pt-2 border-t-2 border-black flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Genre Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-neutral-400 font-comic text-xs uppercase tracking-wider shrink-0 mr-1">
              GENRES:
            </span>
            {['all', 'Superheroes', 'Action', 'Dark Fantasy', 'Sci-Fi & Cyberpunk', 'Mystery & Noir'].map(genreName => (
              <button
                key={genreName}
                onClick={() => { setSelectedGenre(genreName); updateParams({ genre: genreName }); }}
                className={`px-2.5 py-0.5 text-xs font-mono font-bold border shrink-0 transition ${
                  selectedGenre === genreName
                    ? 'bg-[#FFD400] text-black border-black font-black'
                    : 'bg-black/60 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {genreName === 'all' ? 'All Genres' : genreName}
              </button>
            ))}
          </div>

          {/* Sort Selector & Reset */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-comic uppercase tracking-wider">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#ED1D24]" />
              <span className="text-neutral-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); updateParams({ sort: e.target.value }); }}
                className="bg-black text-white px-2 py-1 border border-neutral-700 text-xs font-sans outline-none cursor-pointer"
              >
                <option value="popular">Essential / Popular</option>
                <option value="newest">Newest Year</option>
                <option value="rating">Highest Rated</option>
                <option value="title">Title (A-Z)</option>
                <option value="issueNumber">Issue #</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-comic uppercase tracking-wider text-[#ED1D24] hover:text-[#FFD400] flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Comic Cover Grid */}
      {visibleComics.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleComics.map((comic) => (
              <ComicCard key={comic.id || comic.marvelId} comic={comic} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={() => setDisplayCount(prev => prev + 12)}
                className="comic-btn-yellow px-8 py-3 text-sm uppercase tracking-wider font-comic inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                Load More Issues ({filteredComics.length - visibleComics.length} Remaining)
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty Results View */
        <div className="text-center py-20 border-3 border-black bg-[#151519] p-8 shadow-[6px_6px_0px_#000]">
          <div className="inline-block p-4 bg-black border-2 border-neutral-700 mb-4 rotate-[-2deg]">
            <BookOpen className="w-12 h-12 text-[#ED1D24]" />
          </div>
          <h2 className="font-bebas text-4xl text-white tracking-wide">
            NO ISSUES FOUND MATCHING FILTERS
          </h2>
          <p className="text-neutral-400 text-sm font-sans max-w-md mx-auto mt-2">
            No comic entries matched your active search query or filter combination. Reset your filters to browse the entire archive.
          </p>
          <button
            onClick={clearAllFilters}
            className="comic-btn-yellow mt-6 px-6 py-2.5 text-xs uppercase tracking-wider"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
