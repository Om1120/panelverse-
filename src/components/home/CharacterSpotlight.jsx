import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEMO_CHARACTERS } from '../../data/demoCharacters';
import { Sparkles, Zap, ArrowRight, Shield, Flame, BookOpen, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CharacterSpotlight = () => {
  const [selectedId, setSelectedId] = useState(DEMO_CHARACTERS[0].id);
  const activeChar = DEMO_CHARACTERS.find(c => c.id === selectedId) || DEMO_CHARACTERS[0];

  return (
    <section className="relative my-20 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-3 border-black bg-[#151519] shadow-[8px_8px_0px_#000]">
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-500"
        style={{
          background: `radial-gradient(circle at 70% 40%, ${activeChar.accentColor} 0%, transparent 70%)`
        }}
      />
      <div className="absolute inset-0 bg-comic-dots opacity-20 pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b-3 border-black pb-4">
        <div>
          <div className="inline-block bg-[#FFD400] text-black font-comic text-xs uppercase tracking-widest px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg] mb-2 font-bold">
            ⚡ HEROES & VIGILANTES ARCHIVE
          </div>
          <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
            CHARACTER SPOTLIGHT
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-xl mt-1">
            Explore legendary icons of the Marvel Universe. Filter issues by hero, discover their powers, and dive straight into their defining storylines.
          </p>
        </div>

        <Link
          to="/characters"
          className="self-start sm:self-auto px-4 py-2 bg-black text-[#FFD400] hover:text-white hover:bg-[#ED1D24] font-comic text-xs uppercase tracking-wider border-2 border-neutral-700 hover:border-black transition flex items-center gap-1.5"
        >
          View All Roster ({DEMO_CHARACTERS.length}+) <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Character Selector Avatar Strip */}
      <div className="relative z-10 flex gap-3 overflow-x-auto pb-4 pt-1 mb-8 scrollbar-none">
        {DEMO_CHARACTERS.map((char) => {
          const isSelected = char.id === selectedId;
          const charThumb = `${char.thumbnail.path}/portrait_medium.${char.thumbnail.extension}`;

          return (
            <button
              key={char.id}
              onClick={() => setSelectedId(char.id)}
              className={`flex items-center gap-2.5 px-3 py-2 border-2 transition-all shrink-0 ${
                isSelected
                  ? 'bg-black border-[#ED1D24] shadow-[3px_3px_0px_#ED1D24] scale-105'
                  : 'bg-black/60 border-neutral-800 hover:border-neutral-500 text-neutral-400 hover:text-white'
              }`}
            >
              <img
                src={charThumb}
                alt={char.name}
                className="w-8 h-8 rounded-full object-cover border border-black shrink-0"
              />
              <span className="font-bebas text-base tracking-wide text-white whitespace-nowrap">
                {char.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Character Showcase Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChar.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Column: Portrait & Cover Art Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto overflow-hidden border-4 border-black shadow-[6px_6px_0px_#000] bg-black">
              <img
                src={`${activeChar.thumbnail.path}/portrait_uncanny.${activeChar.thumbnail.extension}`}
                alt={activeChar.name}
                className="w-full h-full object-cover object-top"
              />
              
              {/* Badge on card */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/90 p-3 border-2 border-black backdrop-blur-sm">
                <span className="font-comic text-[11px] text-[#FFD400] tracking-wider uppercase block">
                  {activeChar.realName} • {activeChar.team}
                </span>
                <span className="font-bebas text-2xl text-white tracking-wide block">
                  {activeChar.name}
                </span>
                <span className="text-[10px] text-neutral-400 block font-mono">
                  First Debut: {activeChar.firstAppearance}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Quote, Powers & Actions */}
          <div className="lg:col-span-7 space-y-5">
            {/* Quote Speech Card */}
            {activeChar.quote && (
              <div className="speech-bubble relative font-comic text-base sm:text-lg text-black bg-white inline-block max-w-xl">
                <Quote className="w-4 h-4 inline-block mr-1 text-[#ED1D24]" />
                "{activeChar.quote}"
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-comic text-xs tracking-wider text-[#FFD400] bg-black px-2 py-0.5 border border-neutral-700">
                  {activeChar.comicsCount.toLocaleString()} TOTAL ISSUES ARCHIVED
                </span>
              </div>
              <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none">
                {activeChar.name}
              </h3>
              <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed mt-2.5 font-medium">
                {activeChar.description}
              </p>
            </div>

            {/* Powers Pills */}
            <div>
              <span className="font-comic text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                SIGNATURE ABILITIES & POWERS:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeChar.powers?.map((power, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-black text-[#F5F0E8] border border-neutral-700 text-xs font-mono font-bold flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3 text-[#FFD400]" />
                    {power}
                  </span>
                ))}
              </div>
            </div>

            {/* Creators and First Appearance */}
            <div className="p-3 bg-black/60 border-2 border-neutral-800 text-xs text-neutral-300 flex flex-wrap gap-4">
              <div>
                <span className="text-[#8C8C96] block text-[10px] font-comic uppercase">CREATED BY:</span>
                <span className="font-bold text-white">{activeChar.creators?.join(', ')}</span>
              </div>
              <div>
                <span className="text-[#8C8C96] block text-[10px] font-comic uppercase">FIRST DEBUT:</span>
                <span className="font-bold text-[#FFD400]">{activeChar.firstAppearance}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to={`/books?character=${activeChar.id}`}
                className="comic-btn-red px-6 py-2.5 text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 stroke-[2.5]" />
                Browse {activeChar.name} Comics
              </Link>

              <Link
                to="/characters"
                className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-comic text-xs uppercase tracking-wider border-2 border-black flex items-center gap-1.5 transition"
              >
                All Character Profiles →
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
