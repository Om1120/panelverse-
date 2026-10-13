import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen, ShieldAlert, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Panelverse Drops & Zines!', 'success');
  };

  return (
    <footer className="bg-[#0c0c0c] border-t-4 border-black text-brand-paper pt-16 pb-12 relative overflow-hidden">
      {/* Halftone ambient texture */}
      <div className="absolute inset-0 bg-halftone opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter Graphic Banner */}
        <div className="bg-[#191919] border-2 border-brand-yellow shadow-brutal-yellow p-6 sm:p-10 mb-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="bg-brand-yellow text-black text-[10px] font-black uppercase px-2 py-0.5 tracking-widest inline-block">
                ZINE DISPATCH #01
              </span>
              <h3 className="font-comic text-3xl sm:text-4xl text-brand-paper tracking-wider">
                GET THE GOOD STUFF. <span className="text-brand-yellow">SKIP THE BORING STUFF.</span>
              </h3>
              <p className="text-sm text-brand-muted font-sans">
                Weekly curated comic drops, mangaka interviews, underground zine releases, and inventory alerts directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 bg-brand-yellow/10 border border-brand-yellow text-brand-yellow font-bold text-sm flex items-center gap-2">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <span>TRANSMISSION LOCKED. Welcome to the underground syndicate!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="flex-1 bg-[#111111] border-2 border-brand-border px-4 py-2.5 text-sm text-brand-paper focus:outline-none focus:border-brand-yellow"
                    required
                  />
                  <button
                    type="submit"
                    className="comic-btn-yellow px-5 py-2.5 text-xs font-black tracking-wider flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-yellow border-2 border-black flex items-center justify-center font-comic text-xl text-black shadow-brutal-dark">
                P
              </div>
              <span className="font-comic text-2xl tracking-wider text-brand-paper">
                PANEL<span className="text-brand-yellow">VERSE</span>
              </span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed max-w-sm">
              The digital comic universe where stories run wild. Read free online, explore legendary characters and creators, and borrow physical editions from local collections.
            </p>
            <div className="p-2.5 bg-[#161616] border border-brand-border text-[11px] text-brand-muted flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-brand-yellow shrink-0 mt-0.5" />
              <span>
                <strong>DEMO ACTIVE:</strong> Fully interactive local demo. Read sample chapters, manage physical loans, and test curator controls.
              </span>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-brand-yellow mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-medium text-brand-muted">
              <li><Link to="/books" className="hover:text-brand-paper transition">All Titles</Link></li>
              <li><Link to="/books?genre=superheroes" className="hover:text-brand-paper transition">Superhero Comics</Link></li>
              <li><Link to="/books?genre=manga" className="hover:text-brand-paper transition">Manga District</Link></li>
              <li><Link to="/genres" className="hover:text-brand-paper transition">Universes & Genres</Link></li>
              <li><Link to="/series" className="hover:text-brand-paper transition">Series Arcs</Link></li>
              <li><Link to="/offers" className="hover:text-brand-paper transition">Drops & Challenges</Link></li>
            </ul>
          </div>

          {/* Column 2: Creators & Community */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-brand-purple mb-4">
              Community
            </h4>
            <ul className="space-y-2 text-xs font-medium text-brand-muted">
              <li><Link to="/authors" className="hover:text-brand-paper transition">Creators & Mangaka</Link></li>
              <li><Link to="/borrow" className="hover:text-brand-paper transition">Borrow IRL</Link></li>
              <li><Link to="/my-borrowings" className="hover:text-brand-paper transition">Borrowing History</Link></li>
              <li><Link to="/wishlist" className="hover:text-brand-paper transition">Personal Wishlist</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-paper transition">Reader Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-brand-cyan mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-xs font-medium text-brand-muted">
              <li><Link to="/about" className="hover:text-brand-paper transition">About Mission</Link></li>
              <li><Link to="/contact" className="hover:text-brand-paper transition">Contact Syndicate</Link></li>
              <li><Link to="/admin" className="hover:text-brand-paper transition">Admin Portal</Link></li>
              <li><a href="#rules" onClick={(e) => { e.preventDefault(); alert("Borrowing Rules:\n1. 14 days loan period\n2. Max 2 active physical copies\n3. Zero fines for advance returns!"); }} className="hover:text-brand-paper transition">Borrowing Rules</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
          <p>© {new Date().getFullYear()} PANELVERSE. Built with Neo-Comic Brutalism. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-brand-yellow">Manifesto</Link>
            <Link to="/contact" className="hover:text-brand-yellow">Transmission</Link>
            <span className="text-brand-yellow flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> ENTER THE PANEL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
