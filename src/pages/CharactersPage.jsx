import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DEMO_CHARACTERS } from '../data/demoCharacters';
import { DEMO_COMIC_VINE_CHARACTERS } from '../data/demoComicVine';
import { 
  Search, Zap, BookOpen, Quote, Shield, Flame, 
  Sparkles, Filter, ChevronRight, Globe 
} from 'lucide-react';

export const CharactersPage = () => {
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');

  const teams = [
    { id: 'all', label: 'All Superheroes' },
    { id: 'Avengers', label: 'Avengers' },
    { id: 'X-Men', label: 'X-Men / Mutants' },
    { id: 'Justice League', label: 'Justice League' },
    { id: 'Defenders', label: 'Street Defenders' },
    { id: 'Independent', label: 'Independent Vigilantes' }
  ];

  const allCharactersRoster = useMemo(() => {
    return [...DEMO_CHARACTERS, ...DEMO_COMIC_VINE_CHARACTERS];
  }, []);

  const filteredCharacters = useMemo(() => {
    return allCharactersRoster.filter(char => {
      const matchSearch = 
        char.name.toLowerCase().includes(search.toLowerCase()) ||
        char.realName.toLowerCase().includes(search.toLowerCase()) ||
        char.powers?.some(p => p.toLowerCase().includes(search.toLowerCase()));

      const matchTeam = 
        teamFilter === 'all' || 
        char.team.toLowerCase().includes(teamFilter.toLowerCase());

      return matchSearch && matchTeam;
    });
  }, [allCharactersRoster, search, teamFilter]);

  return (
    <div className="space-y-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 text-[#F5F0E8]">
      
      {/* Editorial Header */}
      <div className="relative border-b-4 border-black pb-8 pt-4">
        <div className="absolute top-0 right-0 w-48 h-48 bg-comic-dots opacity-25 pointer-events-none" />

        <div className="inline-block bg-[#ED1D24] text-white font-comic text-xs uppercase tracking-widest px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg] mb-3">
          ⚡ MARVEL CHARACTER ARCHIVES
        </div>

        <h1 className="font-bebas text-5xl sm:text-7xl text-white tracking-wide uppercase leading-none drop-shadow-[4px_4px_0px_#000]">
          HEROES, MUTANTS & VIGILANTES
        </h1>

        <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-2xl mt-2 font-medium">
          Explore iconic champions across the multiverse. Browse character origins, cataloged powers, historic comic debuts, and read their defining storylines.
        </p>

        {/* Search & Team Filter Bar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by hero name, alter-ego, or superpower..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#151519] border-2 border-black focus:border-[#ED1D24] text-white text-xs sm:text-sm font-sans placeholder-neutral-500 shadow-[3px_3px_0px_#000] outline-none transition"
            />
          </div>

          {/* Team Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {teams.map(t => (
              <button
                key={t.id}
                onClick={() => setTeamFilter(t.id)}
                className={`px-3 py-1.5 font-comic text-xs uppercase tracking-wider border-2 transition whitespace-nowrap ${
                  teamFilter === t.id
                    ? 'bg-[#FFD400] text-black border-black shadow-[2px_2px_0px_#000] font-bold'
                    : 'bg-[#151519] text-neutral-300 border-neutral-700 hover:border-black hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Characters Grid */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCharacters.map((char) => {
            const portraitUrl = char.thumbnail 
              ? `${char.thumbnail.path}/portrait_uncanny.${char.thumbnail.extension}`
              : (char.image?.medium_url || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80');

            return (
              <article
                key={char.id}
                className="group relative flex flex-col bg-[#151519] border-3 border-black hover:border-[#ED1D24] shadow-[5px_5px_0px_#000] hover:shadow-[8px_8px_0px_#ED1D24] transition-all duration-200"
              >
                {/* Character Portrait Header */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black border-b-3 border-black">
                  <img
                    src={portraitUrl}
                    alt={char.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Corner Badge */}
                  <div className="absolute top-2 left-2 bg-[#ED1D24] text-white font-comic text-xs px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
                    {char.team}
                  </div>

                  <div className="absolute bottom-2 right-2 bg-black/90 px-2 py-0.5 border border-neutral-700 text-[10px] font-mono text-[#FFD400]">
                    {(char.comicsCount || 850).toLocaleString()} ISSUES
                  </div>
                </div>

                {/* Character Dossier Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                      <span className="font-comic text-xs tracking-wider uppercase text-[#FFD400]">
                        {char.realName}
                      </span>
                      <span className="text-[10px] font-mono">
                        DEBUT: {char.firstAppearance.split(' ')[0]}
                      </span>
                    </div>

                    <h2 className="font-bebas text-3xl text-white group-hover:text-[#FFD400] transition tracking-wide leading-tight">
                      {char.name}
                    </h2>

                    <p className="font-sans text-xs text-neutral-300 line-clamp-3 mt-2 leading-relaxed">
                      {char.description}
                    </p>

                    {/* Powers Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {char.powers?.slice(0, 3).map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-black text-[#F5F0E8] border border-neutral-800 text-[10px] font-mono"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t-2 border-black flex items-center justify-between">
                    <Link
                      to={`/books?character=${char.id}`}
                      className="comic-btn-red px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
                      Explore {char.name} Comics
                    </Link>

                    <span className="font-comic text-xs text-[#8C8C96] group-hover:text-white uppercase tracking-wider flex items-center gap-0.5">
                      Dossier →
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 border-3 border-black bg-[#151519] p-8 shadow-[6px_6px_0px_#000]">
          <div className="inline-block p-4 bg-black border-2 border-neutral-700 mb-4">
            <Shield className="w-10 h-10 text-[#ED1D24]" />
          </div>
          <h3 className="font-bebas text-3xl text-white tracking-wide">
            NO HEROES FOUND IN THIS TIMELINE
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans max-w-md mx-auto mt-1">
            We couldn't find any superhero matching "{search}". Try searching for another hero name or reset your filters.
          </p>
          <button
            onClick={() => { setSearch(''); setTeamFilter('all'); }}
            className="comic-btn-yellow mt-5 px-6 py-2.5 text-xs uppercase tracking-wider"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
