import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, User, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export const AuthorsPage = () => {
  const { authors, books } = useApp();
  const [query, setQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredAuthors = authors.filter((a) => {
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const nameMatch = a.name.toLowerCase().includes(q);
      const bioMatch = a.biography.toLowerCase().includes(q);
      const countryMatch = a.country.toLowerCase().includes(q);
      if (!nameMatch && !bioMatch && !countryMatch) return false;
    }
    if (selectedRole !== 'all') {
      if (!a.roles.some(r => r.toLowerCase().includes(selectedRole.toLowerCase()))) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b-4 border-brand-purple pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-purple text-white text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          CREATORS & MANGAKA
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase tracking-tight">
          THE MINDS BEHIND <span className="text-brand-purple">THE PANELS.</span>
        </h1>
        <p className="text-sm text-brand-muted mt-2 max-w-xl">
          Writers, storyboarders, indie zine makers, and master mangaka defining modern comic visual language.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search creator by name, country, or bio..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#191919] border-2 border-brand-border focus:border-brand-purple text-brand-paper placeholder-brand-muted text-sm font-medium focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          {['all', 'Writer', 'Artist', 'Mangaka', 'Colourist'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-2 border transition shrink-0 uppercase ${
                selectedRole === role 
                  ? 'bg-brand-purple text-white border-black font-black' 
                  : 'bg-[#191919] border-brand-border text-brand-paper hover:border-brand-purple'
              }`}
            >
              {role === 'all' ? 'All Roles' : role}
            </button>
          ))}
        </div>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuthors.map((author) => {
          const authorBooks = books.filter(b => author.bookIds?.includes(b.id) || b.creators?.includes(author.name));
          return (
            <div 
              key={author.id}
              className="bg-[#191919] border-2 border-brand-border hover:border-brand-purple p-6 shadow-brutal-dark transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-16 h-16 object-cover rounded-full border-2 border-brand-purple"
                  />
                  <div>
                    <h3 className="font-display font-black text-xl text-brand-paper">
                      {author.name}
                    </h3>
                    <p className="text-xs text-brand-muted">{author.country}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {author.roles.map((r) => (
                        <span key={r} className="text-[10px] font-bold px-1.5 py-0.2 bg-black text-brand-yellow border border-brand-border">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed line-clamp-3 mb-4">
                  {author.biography}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                <span className="text-xs font-bold text-brand-muted flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {authorBooks.length} Titles in Universe
                </span>
                <Link
                  to={`/authors/${author.id}`}
                  className="px-3 py-1.5 bg-[#222222] hover:bg-brand-purple hover:text-white text-brand-paper font-black uppercase text-xs border border-brand-border transition flex items-center gap-1"
                >
                  View Profile <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
