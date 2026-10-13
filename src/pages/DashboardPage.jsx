import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  User, Bookmark, BookOpen, PackageCheck, Bell, 
  Sparkles, ArrowRight, Clock, Shield, CheckCircle 
} from 'lucide-react';

export const DashboardPage = () => {
  const { 
    currentUser, 
    readingProgress, 
    wishlist, 
    borrowings, 
    reservations, 
    notifications, 
    books, 
    switchUserRole 
  } = useApp();
  const navigate = useNavigate();

  // Active in progress books
  const inProgressList = Object.keys(readingProgress).map((id) => {
    const book = books.find(b => b.id === id);
    return book ? { ...book, progress: readingProgress[id] } : null;
  }).filter(Boolean);

  const activeLoans = borrowings.filter(b => ['REQUESTED', 'APPROVED', 'ISSUED'].includes(b.status));
  const wishlistBooks = books.filter(b => wishlist.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Profile Banner */}
      <div className="bg-[#191919] border-2 border-brand-yellow p-6 sm:p-8 shadow-brutal-yellow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'} 
              alt={currentUser?.displayName || 'Reader'} 
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-4 border-brand-yellow shrink-0" 
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-black border border-brand-border text-brand-yellow">
                  {currentUser?.role === 'admin' ? 'Curator Admin' : 'Active Reader'}
                </span>
                <span className="text-xs text-brand-muted">Multiverse ID #{currentUser?.id || 'guest'}</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-brand-paper uppercase">
                BACK TO YOUR UNIVERSE, {currentUser?.displayName || 'READER'}.
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                {currentUser?.email || 'Guest Session (Data saved locally)'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/my-library"
              className="px-4 py-2 bg-brand-yellow text-black font-black uppercase text-xs border border-black hover:bg-white transition"
            >
              My Reading Shelf
            </Link>
            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-brand-red text-white font-black uppercase text-xs border border-black hover:bg-white hover:text-black transition"
              >
                Admin Control Center
              </Link>
            )}
          </div>
        </div>

        {/* Quick Numerical Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-brand-border">
          <div className="p-3 bg-[#111111] border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-brand-muted block">Reading In Progress</span>
            <span className="font-display font-black text-xl text-brand-yellow">{inProgressList.length}</span>
          </div>
          <div className="p-3 bg-[#111111] border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-brand-muted block">Wishlisted Titles</span>
            <span className="font-display font-black text-xl text-brand-purple">{wishlist.length}</span>
          </div>
          <div className="p-3 bg-[#111111] border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-brand-muted block">Active Physical Loans</span>
            <span className="font-display font-black text-xl text-brand-green">{activeLoans.length}</span>
          </div>
          <div className="p-3 bg-[#111111] border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-brand-muted block">Alerts & Updates</span>
            <span className="font-display font-black text-xl text-brand-cyan">{notifications.length}</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: RESUME READING */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-brand-border pb-2">
          <h2 className="font-display font-black text-xl text-brand-paper uppercase flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-yellow" />
            Resume Reading
          </h2>
          <Link to="/my-library" className="text-xs font-bold text-brand-yellow hover:underline">
            View Library ({inProgressList.length}) →
          </Link>
        </div>

        {inProgressList.length === 0 ? (
          <div className="p-6 bg-[#161616] border border-dashed border-brand-border text-center text-xs text-brand-muted">
            No active reading sessions. <Link to="/books" className="text-brand-yellow font-bold underline ml-1">Browse catalogue</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressList.map((item) => (
              <div key={item.id} className="p-3 bg-[#191919] border border-brand-border flex items-center gap-3">
                <img src={item.coverImage} alt={item.title} className="w-12 h-16 object-cover border border-black shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-xs text-brand-paper truncate">{item.title}</h4>
                  <p className="text-[11px] text-brand-yellow font-bold mt-0.5">
                    Page {item.progress.currentPage} ({item.progress.progressPercentage}%)
                  </p>
                  <div className="w-full h-1.5 bg-[#333333] mt-1.5 overflow-hidden">
                    <div className="h-full bg-brand-yellow" style={{ width: `${item.progress.progressPercentage}%` }} />
                  </div>
                </div>
                <Link
                  to={`/read/${item.id}`}
                  className="px-3 py-1.5 bg-brand-yellow text-black font-black uppercase text-[10px] border border-black shrink-0"
                >
                  Resume
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: PHYSICAL BORROWINGS & NOTIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Physical Loans */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-brand-border pb-2">
            <h2 className="font-display font-black text-xl text-brand-paper uppercase flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-brand-green" />
              Active Loans & Requests
            </h2>
            <Link to="/my-borrowings" className="text-xs font-bold text-brand-purple hover:underline">
              Full Borrowing History →
            </Link>
          </div>

          {activeLoans.length === 0 ? (
            <div className="p-6 bg-[#161616] border border-dashed border-brand-border text-center text-xs text-brand-muted">
              No active physical loan requests. <Link to="/borrow" className="text-brand-purple font-bold underline ml-1">Explore physical copies</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {activeLoans.map((b) => (
                <div key={b.id} className="p-3 bg-[#191919] border border-brand-border flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-brand-paper">{b.bookTitle}</h4>
                    <span className="text-[11px] text-brand-muted">
                      Due: <strong className="text-brand-yellow">{b.dueDate}</strong> • Copy {b.copyNumber}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-black uppercase border ${
                    b.status === 'ISSUED' ? 'text-brand-green border-brand-green' : 'text-brand-yellow border-brand-yellow'
                  }`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications & System Updates */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-brand-border pb-2">
            <h2 className="font-display font-black text-xl text-brand-paper uppercase flex items-center gap-2">
              <Bell className="w-5 h-5 text-brand-yellow" />
              Alerts Stream
            </h2>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="p-3 bg-[#191919] border border-brand-border text-xs">
                <span className="font-black text-brand-yellow text-xs block">{n.title}</span>
                <p className="text-brand-muted text-[11px] mt-0.5 leading-snug">{n.message}</p>
                <span className="text-[9px] text-brand-muted/70 block mt-1">
                  {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
