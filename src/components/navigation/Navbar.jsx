import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Search, Bookmark, Bell, User, Menu, X, Shield, 
  BookOpen, Sparkles, LogOut, ChevronDown, Check, Compass, Layers, Key
} from 'lucide-react';
import { ApiKeyModal } from '../common/ApiKeyModal';
import { getMarvelCredentials } from '../../services/marvelApi';

import { getComicVineApiKey } from '../../services/comicVineApi';
import { getActiveProvider } from '../../services/comicService';

export const Navbar = () => {
  const { 
    currentUser, 
    wishlist, 
    notifications, 
    setSearchModalOpen, 
    switchUserRole,
    logout 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMarvelKey, setHasMarvelKey] = useState(false);
  const [hasComicVineKey, setHasComicVineKey] = useState(false);
  const [activeProvider, setActiveProviderState] = useState('marvel');
  const location = useLocation();
  const navigate = useNavigate();

  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Scroll detection for transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update API status on events
  useEffect(() => {
    const updateCreds = () => {
      const { publicKey } = getMarvelCredentials();
      setHasMarvelKey(!!publicKey);
      setHasComicVineKey(!!getComicVineApiKey());
      setActiveProviderState(getActiveProvider());
    };
    updateCreds();
    window.addEventListener('marvel-auth-changed', updateCreds);
    window.addEventListener('comic-provider-changed', updateCreds);
    return () => {
      window.removeEventListener('marvel-auth-changed', updateCreds);
      window.removeEventListener('comic-provider-changed', updateCreds);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifs = notifications?.filter(n => !n.read)?.length || 0;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/books', label: 'Explore Comics' },
    { to: '/characters', label: 'Characters' },
    { to: '/wishlist', label: 'Collections' },
    { to: '/borrow', label: 'Borrow IRL' }
  ];

  return (
    <>
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 border-b-3 border-black ${
          isScrolled 
            ? 'bg-[#0B0B0D]/95 backdrop-blur-md shadow-[0_6px_0px_#000]' 
            : 'bg-[#0B0B0D]/85 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Classic Comic Masthead Wordmark */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-[#ED1D24] text-white px-2.5 py-1 font-comic text-2xl sm:text-3xl font-black border-2 border-black shadow-[2px_2px_0px_#FFD400] group-hover:rotate-1 transition-transform tracking-wider">
              PANEL<span className="text-[#FFD400]">VERSE</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[9px] font-comic uppercase tracking-widest text-[#FFD400] bg-black px-1.5 py-0.5 border border-neutral-800">
                #001 • COMIC ARCHIVE
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  px-3 py-1.5 font-comic text-sm tracking-wider uppercase transition border-2 ${
                    isActive 
                      ? 'bg-[#ED1D24] text-white border-black shadow-[2px_2px_0px_#000]' 
                      : 'border-transparent text-neutral-300 hover:text-[#FFD400] hover:border-black hover:bg-[#151519]'
                  }
                `}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Multi-API Status Pill / Key Trigger */}
            <button
              onClick={() => setApiModalOpen(true)}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-comic tracking-wider uppercase border-2 transition shadow-[2px_2px_0px_#000] ${
                activeProvider === 'comicvine'
                  ? 'bg-black border-[#1769FF] text-[#1769FF] hover:bg-neutral-900'
                  : hasMarvelKey
                    ? 'bg-black border-[#22C55E] text-[#22C55E] hover:bg-neutral-900'
                    : 'bg-black border-neutral-700 text-[#FFD400] hover:border-[#ED1D24]'
              }`}
              title="Configure official Marvel Developer Portal & Comic Vine API credentials"
            >
              <Key className="w-3 h-3 text-[#ED1D24]" />
              <span>
                {activeProvider === 'comicvine' 
                  ? (hasComicVineKey ? '🍇 COMIC VINE: LIVE' : '🍇 COMIC VINE: DEMO')
                  : activeProvider === 'all'
                    ? '⭐ MULTIVERSE API'
                    : (hasMarvelKey ? '⚡ MARVEL: LIVE' : '⚡ MARVEL: DEMO')
                }
              </span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#151519] border-2 border-black hover:border-[#FFD400] text-neutral-300 hover:text-[#FFD400] transition text-xs font-bold shadow-[2px_2px_0px_#000]"
              title="Search comics, heroes & creators (Ctrl+K)"
              aria-label="Open search dialog"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-comic text-xs uppercase tracking-wide">Search...</span>
              <kbd className="hidden md:inline text-[10px] bg-black px-1.5 py-0.5 border border-neutral-700 text-neutral-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Watchlist / Saved Collection Button */}
            <Link
              to="/wishlist"
              className="relative p-2 bg-[#151519] border-2 border-black hover:border-[#FFD400] text-neutral-300 hover:text-[#FFD400] transition shadow-[2px_2px_0px_#000]"
              title="Your Universe Collection"
              aria-label="View saved collection"
            >
              <Bookmark className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ED1D24] text-white text-[10px] font-comic px-1.5 py-0.2 border border-black shadow-[1px_1px_0px_#000]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 bg-[#151519] border-2 border-black hover:border-[#FFD400] text-neutral-300 hover:text-[#FFD400] transition shadow-[2px_2px_0px_#000]"
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FFD400] text-black text-[10px] font-comic px-1.5 py-0.2 border border-black font-bold">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#151519] border-3 border-black shadow-[6px_6px_0px_#000] p-3 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                    <span className="font-comic text-xs uppercase tracking-wider text-[#FFD400]">
                      MULTIVERSE DISPATCHES
                    </span>
                    <span className="text-[10px] text-neutral-400">{unreadNotifs} unread</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications?.length > 0 ? (
                      notifications.slice(0, 4).map((n) => (
                        <div key={n.id} className="p-2 bg-black/60 border border-neutral-800 text-xs">
                          <p className="font-bold text-white text-[11px]">{n.title}</p>
                          <p className="text-neutral-400 text-[10px] mt-0.5">{n.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-neutral-500 py-3 text-center">No dispatches</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Menu Trigger */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 bg-[#151519] border-2 border-black hover:border-[#FFD400] text-neutral-200 transition shadow-[2px_2px_0px_#000]"
                aria-label="User menu"
              >
                <div className="w-6 h-6 rounded-full bg-[#ED1D24] text-white flex items-center justify-center font-comic text-xs font-bold border border-black">
                  {currentUser?.displayName?.[0] || 'U'}
                </div>
                <span className="hidden sm:inline font-comic text-xs tracking-wider uppercase max-w-[80px] truncate">
                  {currentUser?.displayName?.split(' ')[0] || 'Reader'}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#151519] border-3 border-black shadow-[6px_6px_0px_#000] py-2 z-50">
                  <div className="px-3 py-2 border-b-2 border-black">
                    <p className="text-xs font-bold text-white truncate">{currentUser?.displayName}</p>
                    <p className="text-[10px] text-[#FFD400] font-comic uppercase tracking-wider">{currentUser?.role}</p>
                  </div>
                  <div className="py-1 text-xs font-comic tracking-wider uppercase">
                    <Link to="/my-library" className="block px-3 py-1.5 hover:bg-black hover:text-[#FFD400] text-neutral-300">
                      My Library
                    </Link>
                    <Link to="/wishlist" className="block px-3 py-1.5 hover:bg-black hover:text-[#FFD400] text-neutral-300">
                      Saved Collection
                    </Link>
                    <Link to="/my-borrowings" className="block px-3 py-1.5 hover:bg-black hover:text-[#FFD400] text-neutral-300">
                      Physical Loans
                    </Link>
                    {currentUser?.role === 'admin' && (
                      <Link to="/admin" className="block px-3 py-1.5 text-[#ED1D24] hover:bg-black">
                        Admin Command Hub
                      </Link>
                    )}
                  </div>
                  <div className="border-t-2 border-black pt-1">
                    <button
                      onClick={() => setApiModalOpen(true)}
                      className="w-full text-left px-3 py-1.5 text-[11px] font-comic uppercase tracking-wider text-[#FFD400] hover:bg-black flex items-center gap-1.5"
                    >
                      <Key className="w-3 h-3" />
                      API Key Settings
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 bg-[#151519] border-2 border-black text-white hover:text-[#FFD400] transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B0B0D] border-b-3 border-black p-4 space-y-3 animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `
                    px-3 py-2 font-comic text-base uppercase tracking-wider border-2 ${
                      isActive 
                        ? 'bg-[#ED1D24] text-white border-black' 
                        : 'border-neutral-800 text-neutral-300 hover:text-[#FFD400] hover:bg-[#151519]'
                    }
                  `}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="pt-3 border-t-2 border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => setApiModalOpen(true)}
                className="px-3 py-1.5 bg-black border-2 border-neutral-700 font-comic text-xs uppercase tracking-wider text-[#FFD400] flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5 text-[#ED1D24]" />
                {hasApiKey ? 'Live Marvel API' : 'Marvel API Setup'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* API Key Modal */}
      <ApiKeyModal isOpen={apiModalOpen} onClose={() => setApiModalOpen(false)} />
    </>
  );
};
