import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Search, Heart, Bell, User, Menu, X, BookOpen, 
  ShieldCheck, LogOut, ChevronDown, BookMarked, Sparkles, RefreshCw
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentUser, 
    wishlist, 
    borrowings,
    notifications, 
    setSearchModalOpen, 
    switchUserRole,
    readingProgress,
    resetToDefaultData
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate unread notifications
  const unreadNotifs = notifications.filter(n => !n.read);

  // Active borrowing requests count
  const activeBorrowings = borrowings.filter(b => ['REQUESTED', 'APPROVED', 'ISSUED'].includes(b.status));

  // Determine last read book
  const lastReadBookId = Object.keys(readingProgress)[0] || 'pv-001';

  return (
    <header className="sticky top-0 z-40 bg-[#111111]/95 backdrop-blur-md border-b-2 border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-brand-yellow border-2 border-black flex items-center justify-center font-comic text-2xl text-black shadow-brutal-dark group-hover:rotate-6 transition-transform">
              P
            </div>
            <div>
              <span className="font-comic text-2xl sm:text-3xl tracking-wider text-brand-paper group-hover:text-brand-yellow transition">
                PANEL<span className="text-brand-yellow">VERSE</span>
              </span>
              <span className="hidden sm:block text-[9px] font-black tracking-widest text-brand-muted uppercase -mt-1">
                Enter The Panel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-xs font-black uppercase tracking-wider">
            <NavLink 
              to="/books" 
              className={({ isActive }) => `px-2.5 py-1.5 transition hover:text-brand-yellow ${isActive ? 'text-brand-yellow bg-[#222222]' : 'text-brand-paper'}`}
            >
              Discover
            </NavLink>
            <NavLink 
              to="/books?genre=superheroes" 
              className="px-2.5 py-1.5 transition text-brand-paper hover:text-brand-yellow"
            >
              Comics
            </NavLink>
            <NavLink 
              to="/books?genre=manga" 
              className="px-2.5 py-1.5 transition text-brand-paper hover:text-brand-purple"
            >
              Manga
            </NavLink>
            <NavLink 
              to="/genres" 
              className={({ isActive }) => `px-2.5 py-1.5 transition hover:text-brand-yellow ${isActive ? 'text-brand-yellow bg-[#222222]' : 'text-brand-paper'}`}
            >
              Universes
            </NavLink>
            <NavLink 
              to="/series" 
              className={({ isActive }) => `px-2.5 py-1.5 transition hover:text-brand-yellow ${isActive ? 'text-brand-yellow bg-[#222222]' : 'text-brand-paper'}`}
            >
              Series
            </NavLink>
            <NavLink 
              to="/authors" 
              className={({ isActive }) => `px-2.5 py-1.5 transition hover:text-brand-yellow ${isActive ? 'text-brand-yellow bg-[#222222]' : 'text-brand-paper'}`}
            >
              Creators
            </NavLink>
            <NavLink 
              to="/borrow" 
              className={({ isActive }) => `px-2.5 py-1.5 transition relative hover:text-brand-green ${isActive ? 'text-brand-green bg-[#222222]' : 'text-brand-paper'}`}
            >
              IRL Borrow
              {activeBorrowings.length > 0 && (
                <span className="ml-1 px-1 bg-brand-green text-black text-[9px] font-bold">
                  {activeBorrowings.length}
                </span>
              )}
            </NavLink>
            <NavLink 
              to="/offers" 
              className={({ isActive }) => `px-2.5 py-1.5 transition hover:text-brand-yellow ${isActive ? 'text-brand-yellow bg-[#222222]' : 'text-brand-paper'}`}
            >
              Drops
            </NavLink>
          </nav>

          {/* Right Action Icons & Auth Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-[#1c1c1c] border border-brand-border text-brand-muted hover:border-brand-yellow hover:text-brand-paper text-xs font-semibold transition"
              title="Search catalog (Ctrl+K or /)"
            >
              <Search className="w-4 h-4 text-brand-yellow" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline px-1 py-0.2 bg-black border border-brand-border text-[10px] text-brand-muted">
                /
              </kbd>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 bg-[#1c1c1c] border border-brand-border hover:border-brand-red text-brand-paper hover:text-brand-red transition"
              title="Your Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-none border border-black">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 bg-[#1c1c1c] border border-brand-border hover:border-brand-yellow text-brand-paper hover:text-brand-yellow transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-yellow text-black text-[10px] font-black w-4 h-4 flex items-center justify-center border border-black">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#191919] border-2 border-brand-yellow shadow-brutal-yellow z-50 p-3 text-xs">
                  <div className="flex items-center justify-between border-b border-brand-border pb-2 mb-2 font-black uppercase text-brand-yellow">
                    <span>Transmissions ({notifications.length})</span>
                    <span className="text-[10px] text-brand-muted">Real-time</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-brand-muted py-2 text-center">No transmissions yet.</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-2 bg-[#222222] border border-brand-border">
                          <p className="font-bold text-brand-paper">{n.title}</p>
                          <p className="text-brand-muted text-[11px] mt-0.5">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Role Control Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 bg-[#1c1c1c] border border-brand-border hover:border-brand-yellow transition"
              >
                {currentUser ? (
                  <>
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.displayName} 
                      className="w-6 h-6 object-cover border border-black" 
                    />
                    <span className="hidden sm:inline text-xs font-bold text-brand-paper max-w-[85px] truncate">
                      {currentUser.displayName}
                    </span>
                    {currentUser.role === 'admin' && (
                      <span className="hidden sm:inline px-1 bg-brand-purple text-white text-[9px] font-black">
                        ADMIN
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 text-brand-muted" />
                    <span className="hidden sm:inline text-xs font-bold text-brand-paper">Guest</span>
                  </>
                )}
                <ChevronDown className="w-3 h-3 text-brand-muted" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#191919] border-2 border-brand-yellow shadow-brutal-dark z-50 p-3 text-xs">
                  <div className="border-b border-brand-border pb-2 mb-2">
                    <p className="font-black text-brand-yellow uppercase">
                      {currentUser ? currentUser.displayName : 'Guest Reader'}
                    </p>
                    <p className="text-[11px] text-brand-muted truncate">
                      {currentUser ? currentUser.email : 'Unauthenticated (Local Storage)'}
                    </p>
                  </div>

                  {/* Quick User Links */}
                  <div className="space-y-1 mb-3">
                    <button
                      onClick={() => { setProfileDropdownOpen(false); navigate('/dashboard'); }}
                      className="w-full text-left p-1.5 hover:bg-[#252525] font-bold text-brand-paper flex items-center gap-2"
                    >
                      <BookMarked className="w-3.5 h-3.5 text-brand-yellow" />
                      Reader Dashboard
                    </button>
                    <button
                      onClick={() => { setProfileDropdownOpen(false); navigate('/my-borrowings'); }}
                      className="w-full text-left p-1.5 hover:bg-[#252525] font-bold text-brand-paper flex items-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-brand-green" />
                      Physical Loans & Reservations
                    </button>
                    {currentUser?.role === 'admin' && (
                      <button
                        onClick={() => { setProfileDropdownOpen(false); navigate('/admin'); }}
                        className="w-full text-left p-1.5 bg-brand-purple/20 text-brand-purple hover:bg-brand-purple/30 font-bold flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Admin Command Center
                      </button>
                    )}
                  </div>

                  {/* Role Switcher for seamless testing */}
                  <div className="border-t border-brand-border pt-2">
                    <p className="text-[10px] font-black uppercase text-brand-muted mb-1.5">
                      Demo Role Switcher:
                    </p>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => { switchUserRole('user'); setProfileDropdownOpen(false); }}
                        className={`px-1.5 py-1 text-[10px] font-black uppercase border ${
                          currentUser?.role === 'user' ? 'bg-brand-yellow text-black border-black' : 'border-brand-border text-brand-muted hover:text-white'
                        }`}
                      >
                        Reader
                      </button>
                      <button
                        onClick={() => { switchUserRole('admin'); setProfileDropdownOpen(false); }}
                        className={`px-1.5 py-1 text-[10px] font-black uppercase border ${
                          currentUser?.role === 'admin' ? 'bg-brand-purple text-white border-black' : 'border-brand-border text-brand-muted hover:text-white'
                        }`}
                      >
                        Admin
                      </button>
                      <button
                        onClick={() => { switchUserRole('guest'); setProfileDropdownOpen(false); }}
                        className={`px-1.5 py-1 text-[10px] font-black uppercase border ${
                          !currentUser ? 'bg-white text-black border-black' : 'border-brand-border text-brand-muted hover:text-white'
                        }`}
                      >
                        Guest
                      </button>
                    </div>

                    <button
                      onClick={() => { resetToDefaultData(); setProfileDropdownOpen(false); }}
                      className="w-full mt-2 text-[10px] font-bold text-brand-muted hover:text-brand-red flex items-center justify-center gap-1 py-1 border border-dashed border-brand-border"
                    >
                      <RefreshCw className="w-3 h-3" /> Reset Demo Seed Data
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Prominent "READ NOW" CTA */}
            <Link
              to={`/read/${lastReadBookId}`}
              className="hidden sm:flex comic-btn-yellow px-3.5 py-1.5 text-xs tracking-wider items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>READ NOW</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 bg-[#1c1c1c] border border-brand-border text-brand-paper hover:text-brand-yellow"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#161616] border-b-2 border-brand-yellow px-4 py-4 space-y-3 font-black uppercase text-sm">
          <Link
            to="/books"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-brand-border text-brand-paper hover:text-brand-yellow"
          >
            Discover All Comics
          </Link>
          <Link
            to="/books?genre=superheroes"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-brand-border text-brand-paper hover:text-brand-yellow"
          >
            Superhero Comics
          </Link>
          <Link
            to="/books?genre=manga"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-brand-border text-brand-paper hover:text-brand-purple"
          >
            Manga & Shonen
          </Link>
          <Link
            to="/genres"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-brand-border text-brand-paper hover:text-brand-yellow"
          >
            Universes & Genres
          </Link>
          <Link
            to="/series"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-brand-border text-brand-paper hover:text-brand-yellow"
          >
            Series & Arcs
          </Link>
          <Link
            to="/authors"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-brand-border text-brand-paper hover:text-brand-yellow"
          >
            Creators & Mangaka
          </Link>
          <Link
            to="/borrow"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-brand-border text-brand-green"
          >
            IRL Physical Borrowing
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-brand-border text-brand-yellow"
          >
            My Reader Dashboard
          </Link>
          {currentUser?.role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-brand-border text-brand-purple"
            >
              Admin Command Center
            </Link>
          )}

          <div className="pt-2">
            <Link
              to={`/read/${lastReadBookId}`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full comic-btn-yellow py-2.5 text-center block text-xs"
            >
              START READING FREE
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
