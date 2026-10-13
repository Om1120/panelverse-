import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HeroSection } from '../components/home/HeroSection';
import { ComicCarousel } from '../components/books/ComicCarousel';
import { CharacterSpotlight } from '../components/home/CharacterSpotlight';
import { ComicCard } from '../components/books/ComicCard';
import { ApiKeyModal } from '../components/common/ApiKeyModal';
import { DEMO_COMICS } from '../data/demoComics';
import { 
  Sparkles, Zap, Flame, BookOpen, ArrowRight, 
  Search, Shield, CheckCircle, PackageCheck, Bookmark, 
  Star, Layers, Send, Quote 
} from 'lucide-react';

export const HomePage = () => {
  const { books, readingProgress } = useApp();
  const [quickSearch, setQuickSearch] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const navigate = useNavigate();

  // Marvel curated collections
  const essentialComics = DEMO_COMICS.filter(c => c.isEssential);
  const trendingMarvel = DEMO_COMICS.filter(c => c.isTrending);
  const classicMarvel = DEMO_COMICS.filter(c => c.year && c.year < 2000);

  // Existing library continue reading
  const continueReadingBooks = Object.keys(readingProgress).map(bookId => {
    const book = books.find(b => b.id === bookId) || DEMO_COMICS.find(c => String(c.id) === String(bookId));
    return book ? { ...book, progress: readingProgress[bookId] } : null;
  }).filter(Boolean);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/books?search=${encodeURIComponent(quickSearch.trim())}`);
    } else {
      navigate('/books');
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 overflow-hidden bg-[#0B0B0D] text-[#F5F0E8]">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <HeroSection onOpenApiModal={() => setApiModalOpen(true)} />

      {/* 2. CONTINUE READING STRIP (If active progress exists) */}
      {continueReadingBooks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-6 bg-[#151519] border-3 border-black shadow-[6px_6px_0px_#ED1D24]">
            <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#FFD400] inline-block border border-black animate-pulse" />
                <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                  RESUME READING DOSSIER
                </h2>
              </div>
              <Link to="/my-library" className="font-comic text-xs uppercase tracking-wider text-[#FFD400] hover:text-white">
                View Library ({continueReadingBooks.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {continueReadingBooks.map(item => (
                <div key={item.id} className="flex gap-3 bg-black/60 p-2.5 border-2 border-black hover:border-[#FFD400] transition">
                  <img src={item.coverImage} alt={item.title} className="w-14 h-20 object-cover border border-black shrink-0" />
                  <div className="flex-1 flex flex-col justify-between py-0.5 truncate">
                    <div>
                      <h3 className="font-bebas text-lg text-white truncate leading-tight">{item.title}</h3>
                      <p className="font-comic text-xs text-[#FFD400]">Page {item.progress?.currentPage} ({item.progress?.progressPercentage}%)</p>
                    </div>
                    <Link
                      to={`/read/${item.id}`}
                      className="comic-btn-red text-[11px] px-2.5 py-1 uppercase tracking-wider text-center inline-block"
                    >
                      Resume →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. ESSENTIAL READING: LEGENDARY MARVEL CRISES CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComicCarousel
          title="ESSENTIAL READING: DEFINING MARVEL SAGAS"
          subtitle="Historic milestone arcs, groundbreaking superhero conflicts, and legendary multiverse crossover events."
          badge="MUST-READ ARCHIVE"
          comics={essentialComics}
          viewAllLink="/books"
        />
      </section>

      {/* 4. ASYMMETRICAL EDITORIAL SPOTLIGHT: THE INFINITY GAUNTLET & CIVIL WAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#151519] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000] relative overflow-hidden">
          
          {/* Halftone backdrop */}
          <div className="absolute inset-0 bg-comic-dots opacity-20 pointer-events-none" />

          {/* Left Feature Column */}
          <div className="lg:col-span-7 space-y-4 relative z-10">
            <div className="inline-block bg-[#ED1D24] text-white font-comic text-xs uppercase tracking-widest px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
              EDITORIAL SPOTLIGHT • ISSUE #001
            </div>

            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wide uppercase leading-none">
              THE WAR THAT SPLIT THE MULTIVERSE: <span className="text-[#FFD400]">CIVIL WAR #1</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
              Whose side are you on? When a superhuman confrontation triggers national catastrophe, the government demands unmasked registration. Iron Man rallies for oversight; Captain America defends liberty to his dying breath.
            </p>

            <div className="flex flex-wrap gap-4 py-2 text-xs font-mono text-neutral-400">
              <div><strong className="text-white block font-comic text-xs">WRITER</strong> Mark Millar</div>
              <div><strong className="text-white block font-comic text-xs">PENCILLER</strong> Steve McNiven</div>
              <div><strong className="text-white block font-comic text-xs">YEAR</strong> 2006</div>
              <div><strong className="text-white block font-comic text-xs">PAGES</strong> 40 Pgs</div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/read/1002"
                className="comic-btn-red px-6 py-2.5 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 stroke-[2.5]" />
                Read Civil War #1 Sample Free
              </Link>

              <Link
                to="/books/1002"
                className="px-5 py-2.5 bg-black hover:bg-neutral-900 text-[#FFD400] font-comic text-xs sm:text-sm uppercase tracking-wider border-2 border-neutral-700 hover:border-black transition"
              >
                View Full Issue Dossier →
              </Link>
            </div>
          </div>

          {/* Right Feature Column: Large Cover Image */}
          <div className="lg:col-span-5 relative z-10 flex justify-center">
            <div className="relative max-w-xs w-full aspect-[2/3] border-4 border-black shadow-[8px_8px_0px_#ED1D24] overflow-hidden group">
              <img
                src="https://i.annihil.us/u/prod/marvel/i/mg/2/00/5131061958b4d/portrait_uncanny.jpg"
                alt="Civil War #1 Cover"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-[#FFD400] text-black font-comic text-xs px-2 py-0.5 border-2 border-black font-bold">
                ICONIC COVER
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE HERO SPOTLIGHT */}
      <CharacterSpotlight />

      {/* 6. POPULAR ISSUES & MILESTONE COVERS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComicCarousel
          title="HOT DROPS & POPULAR ISSUES"
          subtitle="Current fan-favorite storylines and high-demand superhero collector releases."
          badge="HOT ISSUES"
          comics={trendingMarvel}
          viewAllLink="/books?sort=popular"
        />
      </section>

      {/* 7. CLASSIC VINTAGE ERA: 1980s & 1990s LEGENDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComicCarousel
          title="VINTAGE GOLD: CLASSIC 80s & 90s RELEASES"
          subtitle="Todd McFarlane's Venom, Jim Lee's X-Men #1, Frank Miller's Born Again, and Secret Wars #8."
          badge="RETRO VAULT"
          comics={classicMarvel}
          viewAllLink="/books"
        />
      </section>

      {/* 8. QUICK COMIC MULTIVERSE SEARCH BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-black border-4 border-black shadow-[8px_8px_0px_#FFD400] text-center space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-comic-dots opacity-20 pointer-events-none" />

          <div className="inline-block bg-[#ED1D24] text-white font-comic text-xs uppercase tracking-widest px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">
            ARCHIVE SEARCH DIRECTORY
          </div>

          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wide uppercase leading-none">
            SEARCH OVER 40,000+ MARVEL COMIC ISSUES
          </h2>

          <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-xl mx-auto">
            Find specific titles, character debuts, legendary artists, and milestone issue numbers instantly.
          </p>

          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="e.g. Spider-Man, Infinity Gauntlet, Wolverine..."
              className="flex-1 px-4 py-3 bg-[#151519] border-2 border-neutral-700 focus:border-[#ED1D24] text-white font-sans text-sm outline-none shadow-[3px_3px_0px_#000]"
            />
            <button
              type="submit"
              className="comic-btn-red px-6 py-3 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              Search Archive
            </button>
          </form>
        </div>
      </section>

      {/* 9. MARVEL COMICS API ATTRIBUTION & ARCHIVE FOOTER NOTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-neutral-500 font-mono space-y-1">
        <p>Data provided by Marvel Comics Developer Portal. © 2026 MARVEL</p>
        <p>Built for comic book enthusiasts, collectors, and students of the sequential arts.</p>
      </section>

      {/* API Key Modal */}
      <ApiKeyModal isOpen={apiModalOpen} onClose={() => setApiModalOpen(false)} />
    </div>
  );
};
