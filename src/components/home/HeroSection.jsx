import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Sparkles, Flame, Zap, ArrowRight, 
  Layers, Star, Shield, Bookmark, Play
} from 'lucide-react';
import { DEMO_COMICS } from '../../data/demoComics';
import { useApp } from '../../context/AppContext';

export const HeroSection = ({ onOpenApiModal }) => {
  const { isInWishlist, toggleWishlist } = useApp();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Top featured Marvel showcase issues
  const featuredComics = DEMO_COMICS.slice(0, 4);
  const currentComic = featuredComics[featuredIndex];
  const isSaved = isInWishlist(currentComic.id);

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Cinematic Background Atmosphere: Ben-Day halftone + radial Marvel glow */}
      <div className="absolute inset-0 bg-marvel-radial pointer-events-none" />
      <div className="absolute inset-0 bg-comic-dots pointer-events-none opacity-30" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ED1D24]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Layout: Asymmetric 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column (7 cols): Editorial Typography & Actions */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Top Ticker Pill */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#ED1D24] text-white font-comic text-xs uppercase tracking-widest px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1.5deg]">
              PANELVERSE #001
            </span>
            <span className="font-comic text-xs uppercase tracking-wider text-[#FFD400] bg-black px-2.5 py-0.5 border border-neutral-700">
              OFFICIAL MARVEL ARCHIVE INTEGRATION
            </span>
          </div>

          {/* Comic Speech Bubble Teaser */}
          <div className="speech-bubble inline-block font-comic text-xs sm:text-sm tracking-wide uppercase text-black rotate-[0.5deg]">
            💥 "ENTER THE PANEL. IMMERSE IN LEGENDARY HEROIC SAGAS."
          </div>

          {/* Giant Editorial Headline */}
          <div className="space-y-1">
            <h1 className="font-bebas text-6xl sm:text-7xl xl:text-8xl tracking-tight uppercase text-white leading-[0.88] drop-shadow-[4px_4px_0px_#000]">
              WITNESS THE<br />
              <span className="bg-[#FFD400] text-black px-3 py-1 border-4 border-black shadow-[6px_6px_0px_#000] inline-block rotate-[-1deg] mt-1.5 font-black">
                COMIC UNIVERSE
              </span><br />
              IN RAW MOTION.
            </h1>
          </div>

          {/* Short Narrative Description */}
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-sans font-medium leading-relaxed">
            Step directly into high-octane superhero epics, legendary first appearances, and mythic crossover crises. Discover genuine Marvel comic covers, read complete preview chapters, and track your universe collection.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/books"
              className="comic-btn-red px-6 py-3.5 flex items-center gap-2 text-sm sm:text-base uppercase tracking-wider"
            >
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
              EXPLORE COMICS
            </Link>

            <Link
              to="/characters"
              className="comic-btn-yellow px-6 py-3.5 flex items-center gap-2 text-sm sm:text-base uppercase tracking-wider"
            >
              <Zap className="w-5 h-5 fill-black stroke-black" />
              DISCOVER THE UNIVERSE
            </Link>

            <button
              onClick={onOpenApiModal}
              className="px-4 py-3 bg-[#151519] hover:bg-black text-[#F5F0E8] font-comic text-xs sm:text-sm uppercase tracking-wider border-2 border-neutral-700 hover:border-[#ED1D24] shadow-[3px_3px_0px_#000] transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#FFD400]" />
              API Key Setup
            </button>
          </div>

          {/* Live Comic Selector Strip (Mini Thumbnails) */}
          <div className="pt-4 border-t-2 border-neutral-800">
            <span className="font-comic text-xs uppercase tracking-wider text-[#8C8C96] block mb-2">
              FEATURED MILESTONES:
            </span>
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {featuredComics.map((fc, idx) => (
                <button
                  key={fc.id}
                  onClick={() => setFeaturedIndex(idx)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 border-2 transition text-left shrink-0 ${
                    featuredIndex === idx
                      ? 'bg-black border-[#ED1D24] shadow-[2px_2px_0px_#ED1D24]'
                      : 'bg-black/60 border-neutral-800 hover:border-neutral-600 text-neutral-400'
                  }`}
                >
                  <img
                    src={fc.coverImage}
                    alt={fc.title}
                    className="w-6 h-9 object-cover border border-black shrink-0"
                  />
                  <div className="max-w-[120px] truncate">
                    <span className="font-bebas text-xs text-white block leading-tight truncate">
                      {fc.title}
                    </span>
                    <span className="text-[10px] text-[#FFD400] font-mono block">
                      {fc.year}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column (5 cols): Cinematic Featured Comic Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          {/* Outer Comic Showcase Frame with tilt & hard comic shadow */}
          <div className="relative max-w-sm sm:max-w-md mx-auto group">
            
            {/* Speed-line backdrop behind comic cover */}
            <div className="absolute -inset-4 bg-[#ED1D24]/20 border-2 border-black rotate-3 transition-transform group-hover:rotate-4" />
            <div className="absolute -inset-2 bg-black border-2 border-black -rotate-2 transition-transform group-hover:-rotate-3" />

            {/* Main Featured Comic Cover Card */}
            <div className="relative bg-[#151519] border-4 border-black shadow-[10px_10px_0px_#000] overflow-hidden">
              
              {/* Cover Image */}
              <div className="relative aspect-[2/3] overflow-hidden bg-black">
                <img
                  src={currentComic.coverImage}
                  alt={currentComic.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top Corner Issue Price Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  <div className="bg-[#ED1D24] text-white font-comic text-xs sm:text-sm px-2.5 py-1 border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-2deg]">
                    ISSUE #{currentComic.issueNumber}
                  </div>
                  <div className="bg-[#FFD400] text-black font-comic text-[11px] px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] rotate-[1deg] font-bold">
                    MILESTONE
                  </div>
                </div>

                {/* Bookmark Toggle */}
                <button
                  onClick={() => toggleWishlist(currentComic.id)}
                  className={`absolute top-3 right-3 p-2 border-2 border-black transition z-20 ${
                    isSaved
                      ? 'bg-[#FFD400] text-black shadow-[2px_2px_0px_#000]'
                      : 'bg-black/85 text-white hover:bg-[#ED1D24]'
                  }`}
                  aria-label="Save comic to collection"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-black' : ''}`} />
                </button>

                {/* Ambient vignette at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Bottom Overlay Info on Cover */}
                <div className="absolute bottom-3 inset-x-3 text-white z-10 space-y-1">
                  <span className="font-comic text-xs uppercase tracking-wider text-[#FFD400] bg-black px-2 py-0.5 border border-black inline-block">
                    {currentComic.seriesName}
                  </span>
                  <h3 className="font-bebas text-2xl sm:text-3xl tracking-wide leading-none drop-shadow-[2px_2px_0px_#000]">
                    {currentComic.title}
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans line-clamp-2">
                    {currentComic.description}
                  </p>
                </div>
              </div>

              {/* Action Bar Beneath Artwork */}
              <div className="p-3 bg-black flex items-center justify-between border-t-3 border-black">
                <Link
                  to={`/books/${currentComic.id}`}
                  className="font-comic text-xs sm:text-sm text-[#FFD400] hover:text-white uppercase tracking-wider flex items-center gap-1"
                >
                  Full Issue Dossier →
                </Link>

                <Link
                  to={`/read/${currentComic.id}`}
                  className="comic-btn-red px-4 py-1.5 text-xs uppercase tracking-wider flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
                  Read Free
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Narrow Comic Metadata Strip at Bottom */}
      <div className="mt-12 pt-4 border-t-3 border-black flex flex-wrap items-center justify-between gap-4 text-xs font-comic uppercase tracking-wider text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#ED1D24] inline-block border border-black" />
          <span>MARVEL COMICS UNIVERSE DISCOVERY PLATFORM</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[#FFD400]">40,000+ DIGITIZED COMIC CATALOG</span>
          <span className="hidden sm:inline text-neutral-400">OFFICIAL DEVELOPER API SPEC</span>
          <span className="text-[#1769FF]">100% FRONTEND PERSISTENCE</span>
        </div>
      </div>
    </section>
  );
};
