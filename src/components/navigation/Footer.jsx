import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowUp, Github, Twitter, Disc, Heart } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0e0e] border-t-2 border-brand-border text-brand-paper mt-20 relative overflow-hidden">
      
      {/* Editorial Decorative Marquee Banner */}
      <div className="bg-[#181818] border-b border-brand-border py-2 px-4 overflow-hidden select-none">
        <div className="flex gap-8 whitespace-nowrap animate-marquee text-xs font-black uppercase tracking-widest text-brand-muted">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span>ONE UNIVERSE. INFINITE STORIES.</span>
              <span className="text-brand-yellow">★</span>
              <span>READ FREE. GO BEYOND THE SCREEN.</span>
              <span className="text-brand-purple">★</span>
              <span>FLIP PAGES. BREAK REALITY.</span>
              <span className="text-brand-green">★</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-[#ED1D24] text-white px-2.5 py-1 font-comic text-2xl font-black border-2 border-black shadow-[2px_2px_0px_#FFD400] group-hover:rotate-1 transition-transform tracking-wider">
                PANEL<span className="text-[#FFD400]">VERSE</span>
              </div>
            </Link>
            
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              An immersive digital comic-book discovery experience inspired by Marvel comics. Featuring verified covers, milestone issues, and official API integration.
            </p>

            <div className="inline-block p-3 bg-black/60 border border-neutral-800 text-xs">
              <span className="text-[#FFD400] font-comic tracking-wider uppercase block">MARVEL DEVELOPER PORTAL INTEGRATION</span>
              <p className="text-neutral-400 mt-1 text-[11px]">
                Data provided by Marvel. © {new Date().getFullYear()} MARVEL. Direct client-side authorization and curated offline fallback.
              </p>
            </div>
          </div>

          {/* Quick Discover */}
          <div className="space-y-3">
            <h4 className="text-xs font-comic uppercase text-[#FFD400] tracking-widest">
              Universe Index
            </h4>
            <ul className="space-y-2 text-xs font-medium text-neutral-400">
              <li><Link to="/books" className="hover:text-white transition">Explore All Comics</Link></li>
              <li><Link to="/characters" className="hover:text-white transition">Superheroes & Mutants</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition">My Collection</Link></li>
              <li><Link to="/genres" className="hover:text-white transition">Multiverse Genres</Link></li>
              <li><Link to="/series" className="hover:text-white transition">Ongoing Sagas</Link></li>
            </ul>
          </div>

          {/* Borrowing & Library */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-brand-purple tracking-widest font-display">
              Physical Hub
            </h4>
            <ul className="space-y-2 text-xs font-medium text-brand-muted">
              <li><Link to="/borrow" className="hover:text-brand-purple transition">Borrow Books IRL</Link></li>
              <li><Link to="/my-borrowings" className="hover:text-brand-purple transition">My Loans & Due Dates</Link></li>
              <li><Link to="/wishlist" className="hover:text-brand-purple transition">My Wishlist</Link></li>
              <li><Link to="/my-library" className="hover:text-brand-purple transition">Reading Progress</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-purple transition">Reader Dashboard</Link></li>
            </ul>
          </div>

          {/* Platform & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-brand-green tracking-widest font-display">
              Community
            </h4>
            <ul className="space-y-2 text-xs font-medium text-brand-muted">
              <li><Link to="/about" className="hover:text-brand-green transition">About Panelverse</Link></li>
              <li><Link to="/authors" className="hover:text-brand-green transition">Creators & Mangaka</Link></li>
              <li><Link to="/contact" className="hover:text-brand-green transition">Get In Touch</Link></li>
              <li><Link to="/admin" className="hover:text-brand-green transition">Curator Admin (Demo)</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© {new Date().getFullYear()} PANELVERSE. Built with Neo-Comic Brutalism.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#1a1a1a] border border-brand-border hover:border-brand-yellow hover:text-brand-yellow transition text-xs font-bold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
