import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ComicCard } from '../components/books/ComicCard';
import { 
  BookOpen, Heart, Clock, Calendar, CheckCircle2, 
  Sparkles, ShieldCheck, User, Settings, ArrowRight, Bell 
} from 'lucide-react';

export const UserDashboardPage = () => {
  const { 
    currentUser, 
    books, 
    wishlist, 
    readingProgress, 
    borrowings, 
    reservations, 
    notifications,
    switchUserRole,
    logout
  } = useApp();

  const navigate = useNavigate();

  // Compute currently reading & completed books
  const progressEntries = Object.entries(readingProgress);
  const readingBookIds = progressEntries.map(([id]) => id);
  const currentlyReading = books.filter(b => readingBookIds.includes(b.id));

  // Active loans
  const activeLoans = borrowings.filter(b => 
    (!currentUser || b.userId === currentUser.id || b.userId === 'guest-user') &&
    ['REQUESTED', 'APPROVED', 'ISSUED'].includes(b.status)
  );

  // Active reservations
  const activeReservations = reservations.filter(r => 
    (!currentUser || r.userId === currentUser.id || r.userId === 'guest-user') &&
    r.status === 'WAITING'
  );

  return (
    <div className="min-h-screen bg-bg-primary text-brand-paper py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Profile Header Hero */}
      <div className="bg-[#181818] border-2 border-brand-yellow shadow-brutal-yellow p-6 sm:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser?.displayName || 'Guest'}
              className="w-20 h-20 object-cover border-2 border-black shadow-brutal-dark"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-brand-yellow text-black font-black text-[10px] uppercase px-2 py-0.5 border border-black">
                  {currentUser ? `${currentUser.role.toUpperCase()} PROFILE` : 'GUEST READER'}
                </span>
                {currentUser?.role === 'admin' && (
                  <Link to="/admin" className="bg-brand-purple text-white font-black text-[10px] uppercase px-2 py-0.5 border border-black hover:bg-white hover:text-black">
                    GO TO ADMIN PORTAL →
                  </Link>
                )}
              </div>
              <h1 className="font-comic text-3xl sm:text-5xl text-brand-paper">
                BACK TO YOUR <span className="text-brand-yellow">UNIVERSE.</span>
              </h1>
              <p className="text-xs text-brand-muted">
                {currentUser ? `${currentUser.displayName} • ${currentUser.email}` : 'Unregistered session saved in browser storage.'}
              </p>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="bg-[#111111] border border-brand-border px-3 py-2 text-center min-w-[80px]">
              <span className="block text-brand-yellow font-comic text-2xl">{currentlyReading.length}</span>
              <span className="text-[10px] text-brand-muted uppercase font-bold">Reading</span>
            </div>
            <div className="bg-[#111111] border border-brand-border px-3 py-2 text-center min-w-[80px]">
              <span className="block text-brand-red font-comic text-2xl">{wishlist.length}</span>
              <span className="text-[10px] text-brand-muted uppercase font-bold">Wishlist</span>
            </div>
            <div className="bg-[#111111] border border-brand-border px-3 py-2 text-center min-w-[80px]">
              <span className="block text-brand-green font-comic text-2xl">{activeLoans.length}</span>
              <span className="text-[10px] text-brand-muted uppercase font-bold">Loans</span>
            </div>
          </div>
        </div>

        {/* Role Demo Switcher Bar */}
        <div className="mt-6 pt-4 border-t border-brand-border flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-brand-muted font-bold text-[11px]">Simulate Account:</span>
            <button
              onClick={() => switchUserRole('user')}
              className={`px-2.5 py-1 text-[11px] font-black uppercase border ${
                currentUser?.role === 'user' ? 'bg-brand-yellow text-black border-black' : 'border-brand-border text-brand-muted hover:text-white'
              }`}
            >
              Reader (Alex)
            </button>
            <button
              onClick={() => switchUserRole('admin')}
              className={`px-2.5 py-1 text-[11px] font-black uppercase border ${
                currentUser?.role === 'admin' ? 'bg-brand-purple text-white border-black' : 'border-brand-border text-brand-muted hover:text-white'
              }`}
            >
              Admin (Vesper)
            </button>
            <button
              onClick={() => switchUserRole('guest')}
              className={`px-2.5 py-1 text-[11px] font-black uppercase border ${
                !currentUser ? 'bg-white text-black border-black' : 'border-brand-border text-brand-muted hover:text-white'
              }`}
            >
              Guest Mode
            </button>
          </div>

          <button
            onClick={logout}
            className="text-brand-red hover:underline font-bold text-xs"
          >
            Sign Out / Reset Session
          </button>
        </div>
      </div>

      {/* SECTION 1: CONTINUE READING */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-brand-border pb-3">
          <h2 className="font-comic text-3xl text-brand-paper flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand-yellow" />
            IN-PROGRESS CHAPTERS ({currentlyReading.length})
          </h2>
          <Link to="/books" className="text-xs font-bold text-brand-yellow hover:underline">
            Explore More →
          </Link>
        </div>

        {currentlyReading.length === 0 ? (
          <div className="bg-[#181818] border border-brand-border p-6 text-center text-xs text-brand-muted">
            You haven't opened any comic pages yet. Start reading from the catalogue to track your bookmark automatically!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentlyReading.map(book => {
              const prog = readingProgress[book.id];
              return (
                <div key={book.id} className="bg-[#1c1c1c] border-2 border-brand-border p-4 flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover border border-black shrink-0" />
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-xs text-brand-paper truncate">{book.title}</h4>
                      <p className="text-[11px] text-brand-yellow font-black mt-0.5">Page {prog?.currentPage || 1} ({prog?.progressPercentage || 0}%)</p>
                      <p className="text-[10px] text-brand-muted">{prog?.completed ? '✓ Completed' : 'In Progress'}</p>
                    </div>
                  </div>
                  <Link
                    to={`/read/${book.id}`}
                    className="comic-btn-yellow px-3 py-1.5 text-xs font-black uppercase shrink-0"
                  >
                    CONTINUE
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 2: ACTIVE PHYSICAL BORROWINGS & RESERVATIONS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-brand-border pb-3">
          <h2 className="font-comic text-3xl text-brand-paper flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-green" />
            PHYSICAL VAULT LOANS ({activeLoans.length})
          </h2>
          <Link to="/my-borrowings" className="text-xs font-bold text-brand-green hover:underline">
            Full Loan Center →
          </Link>
        </div>

        {activeLoans.length === 0 ? (
          <div className="bg-[#181818] border border-brand-border p-6 text-center text-xs text-brand-muted">
            No active physical borrowing requests. Check out available titles in the vault to request physical editions!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeLoans.map(loan => (
              <div key={loan.id} className="bg-[#1c1c1c] border-2 border-brand-green p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-brand-green text-black font-black text-[9px] uppercase px-1.5 py-0.2">
                      {loan.status}
                    </span>
                    <span className="text-[10px] text-brand-muted font-mono">{loan.id}</span>
                  </div>
                  <h4 className="font-display font-black text-sm text-brand-paper">{loan.bookTitle}</h4>
                  <p className="text-xs text-brand-muted mt-1">Copy: {loan.copyNumber} ({loan.barcode})</p>
                  <p className="text-xs text-brand-paper mt-1 font-bold">Due: {loan.dueDate || 'Pending confirmation'}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between text-xs">
                  <Link to={`/borrowings/${loan.id}`} className="text-brand-yellow hover:underline font-bold">
                    View Details →
                  </Link>
                  <Link to={`/read/${loan.bookId}`} className="text-brand-muted hover:text-white">
                    Digital Edition
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: WISHLIST PREVIEW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-brand-border pb-3">
          <h2 className="font-comic text-3xl text-brand-paper flex items-center gap-2">
            <Heart className="w-6 h-6 text-brand-red fill-brand-red" />
            BOOKMARKED TITLES ({wishlist.length})
          </h2>
          <Link to="/wishlist" className="text-xs font-bold text-brand-red hover:underline">
            All Wishlist ({wishlist.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {books.filter(b => wishlist.includes(b.id)).slice(0, 6).map(book => (
            <ComicCard key={book.id} book={book} />
          ))}
        </div>
      </div>

    </div>
  );
};
