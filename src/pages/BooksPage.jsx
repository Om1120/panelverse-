import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ComicCard } from '../components/books/ComicCard';
import { 
  Filter, X, Search, SlidersHorizontal, ArrowUpDown, 
  RotateCcw, Sparkles, BookOpen, Check 
} from 'lucide-react';

export const BooksPage = () => {
  const { books, genres } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state derived from URL or local
  const urlSearch = searchParams.get('search') || '';
  const urlGenre = searchParams.get('genre') || 'all';

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedGenre, setSelectedGenre] = useState(urlGenre);
  const [selectedFormat, setSelectedFormat] = useState('all'); // all, manga, comic, indie
  const [digitalOnly, setDigitalOnly] = useState(false);
  const [physicalOnly, setPhysicalOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // rating, title, new
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if url changes
  React.useEffect(() => {
    if (urlSearch !== searchQuery) setSearchQuery(urlSearch);
    if (urlGenre !== selectedGenre) setSelectedGenre(urlGenre);
  }, [urlSearch, urlGenre]);

  // Compute filtered & sorted books
  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      // Search query filter (title, subtitle, creators, isbn)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = b.title.toLowerCase().includes(q);
        const matchesSubtitle = b.subtitle?.toLowerCase().includes(q);
        const matchesCreator = b.creators?.some(c => c.toLowerCase().includes(q));
        const matchesIsbn = b.isbn?.toLowerCase().includes(q);
        const matchesGenre = b.genres?.some(g => g.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubtitle && !matchesCreator && !matchesIsbn && !matchesGenre) {
          return false;
        }
      }

      // Genre filter
      if (selectedGenre !== 'all') {
        const matchesG = b.genres?.some(g => g.toLowerCase().includes(selectedGenre.toLowerCase()));
        if (!matchesG) return false;
      }

      // Format filter
      if (selectedFormat === 'manga' && !b.isManga) return false;
      if (selectedFormat === 'indie' && !b.isIndie) return false;
      if (selectedFormat === 'comic' && b.isManga) return false;

      // Digital availability filter
      if (digitalOnly && !b.digitalAvailability) return false;

      // Physical availability filter
      if (physicalOnly && (!b.physicalBorrowingEnabled || (b.physicalInventory?.availableCopies || 0) === 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'new') return (b.publicationDate || '').localeCompare(a.publicationDate || '');
      return 0;
    });
  }, [books, searchQuery, selectedGenre, selectedFormat, digitalOnly, physicalOnly, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedGenre('all');
    setSelectedFormat('all');
    setDigitalOnly(false);
    setPhysicalOnly(false);
    setSortBy('rating');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedGenre !== 'all' || selectedFormat !== 'all' || digitalOnly || physicalOnly;

  return (
    <div className="min-h-screen bg-bg-primary text-brand-paper py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="border-b-4 border-black pb-8 mb-8 bg-[#181818] p-6 sm:p-10 border-2 shadow-brutal-dark">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-yellow mb-2">
              <Sparkles className="w-4 h-4 fill-brand-yellow" />
              <span>THE COMPLETE ARCHIVES</span>
            </div>
            <h1 className="font-comic text-4xl sm:text-6xl text-brand-paper tracking-wider">
              THE SHELF IS <span className="text-brand-yellow">INFINITE.</span>
            </h1>
            <p className="text-sm text-brand-muted mt-2 max-w-2xl font-medium">
              Comics, manga, graphic novels, and strange little stories worth getting lost in. Browse through {books.length} curated master editions.
            </p>
          </div>

          <div className="bg-[#111111] p-3 border border-brand-border text-xs flex items-center gap-3">
            <span className="text-brand-muted">Loaded Catalogue:</span>
            <span className="font-mono font-black text-brand-yellow text-sm">{filteredBooks.length} / {books.length} TITLES</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Books Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-[#191919] border-2 border-brand-border p-5 space-y-6 shadow-brutal-dark">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-display font-black text-xs uppercase tracking-wider text-brand-paper flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-yellow" />
                FILTER MATRIX
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-bold text-brand-yellow hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-[11px] font-black uppercase text-brand-muted mb-2">
                Title, Creator or ISBN
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-brand-muted absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to filter..."
                  className="w-full bg-[#111111] border border-brand-border text-xs py-2 pl-9 pr-3 text-brand-paper focus:outline-none focus:border-brand-yellow"
                />
              </div>
            </div>

            {/* Universe / Genre Select */}
            <div>
              <label className="block text-[11px] font-black uppercase text-brand-muted mb-2">
                Universe / Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full bg-[#111111] border border-brand-border text-xs py-2 px-3 text-brand-paper focus:outline-none focus:border-brand-yellow cursor-pointer"
              >
                <option value="all">All Universes</option>
                {genres.map(g => (
                  <option key={g.id} value={g.name.toLowerCase()}>{g.name}</option>
                ))}
              </select>
            </div>

            {/* Format Toggle */}
            <div>
              <label className="block text-[11px] font-black uppercase text-brand-muted mb-2">
                Format
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'comic', label: 'Comics' },
                  { id: 'manga', label: 'Manga' },
                  { id: 'indie', label: 'Indie' }
                ].map(fmt => (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`py-1.5 px-2 border text-center transition ${
                      selectedFormat === fmt.id
                        ? 'bg-brand-yellow text-black border-black font-black'
                        : 'border-brand-border bg-[#111111] text-brand-muted hover:border-brand-paper'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes: Digital & Physical */}
            <div className="space-y-2.5 pt-2 border-t border-brand-border">
              <label className="flex items-center gap-2.5 text-xs font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={digitalOnly}
                  onChange={(e) => setDigitalOnly(e.target.checked)}
                  className="accent-brand-yellow w-4 h-4"
                />
                <span>Online Reader Available</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={physicalOnly}
                  onChange={(e) => setPhysicalOnly(e.target.checked)}
                  className="accent-brand-green w-4 h-4"
                />
                <span>In Vault Physical Stock</span>
              </label>
            </div>

          </div>
        </aside>

        {/* Right Books Grid Area */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Top Sort and Mobile Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#191919] border border-brand-border p-3 text-xs">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden comic-btn-yellow px-3 py-1.5 text-xs font-black uppercase flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
            </button>

            {/* Active Filters Display */}
            <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
              {hasActiveFilters && (
                <>
                  <span className="text-[11px] text-brand-muted font-bold">Active:</span>
                  {selectedGenre !== 'all' && (
                    <span className="bg-brand-yellow text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black flex items-center gap-1">
                      {selectedGenre}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedGenre('all')} />
                    </span>
                  )}
                  {selectedFormat !== 'all' && (
                    <span className="bg-brand-purple text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black flex items-center gap-1">
                      {selectedFormat}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFormat('all')} />
                    </span>
                  )}
                  {digitalOnly && (
                    <span className="bg-brand-cyan text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black">
                      Digital Free
                    </span>
                  )}
                  {physicalOnly && (
                    <span className="bg-brand-green text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black">
                      In Vault
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-brand-muted font-bold flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#111111] border border-brand-border text-xs py-1.5 px-2 text-brand-paper focus:outline-none focus:border-brand-yellow cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="title">Title (A - Z)</option>
                <option value="new">Recently Added</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden bg-[#181818] border-2 border-brand-yellow p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border pb-2">
                <span className="font-black uppercase text-xs text-brand-yellow">Mobile Filter Matrix</span>
                <button onClick={() => setMobileFilterOpen(false)} className="text-brand-muted hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-muted mb-1">Search Keywords</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter title or creator..."
                  className="w-full bg-[#111111] border border-brand-border text-xs p-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-muted mb-1">Universe</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full bg-[#111111] border border-brand-border text-xs p-2"
                >
                  <option value="all">All Universes</option>
                  {genres.map(g => (
                    <option key={g.id} value={g.name.toLowerCase()}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 comic-btn-dark py-2 text-xs font-bold"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 comic-btn-yellow py-2 text-xs font-black uppercase"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Books Result Grid */}
          {filteredBooks.length === 0 ? (
            <div className="bg-[#181818] border-2 border-dashed border-brand-border p-12 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-brand-yellow mx-auto opacity-70" />
              <h3 className="font-comic text-2xl text-brand-paper">NO MATCHES IN THE MULTIVERSE</h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto">
                No titles matched your specific filter query. Try resetting your tags or searching with a broader keyword.
              </p>
              <button
                onClick={clearAllFilters}
                className="comic-btn-yellow px-5 py-2 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>CLEAR FILTERS</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {filteredBooks.map(book => (
                <ComicCard key={book.id} book={book} />
              ))}
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
