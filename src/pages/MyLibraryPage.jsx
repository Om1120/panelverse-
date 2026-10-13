import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookOpen, Bookmark, CheckCircle, Clock, Play, Sparkles } from 'lucide-react';

export const MyLibraryPage = () => {
  const { books, readingProgress, wishlist, currentUser } = useApp();
  const navigate = useNavigate();

  // Parse in-progress and completed books
  const progressList = Object.keys(readingProgress).map((bookId) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return null;
    const p = readingProgress[bookId];
    return { ...book, progress: p };
  }).filter(Boolean);

  const currentlyReading = progressList.filter(item => !item.progress.completed);
  const completedBooks = progressList.filter(item => item.progress.completed);
  const wishlistBooks = books.filter(b => wishlist.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="border-b-4 border-brand-yellow pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-yellow text-black text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              READING HEADQUARTERS
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase tracking-tight">
              MY DIGITAL <span className="text-brand-yellow">LIBRARY.</span>
            </h1>
            <p className="text-sm text-brand-muted mt-2 max-w-xl">
              Track reading sessions, continue saved issues at the exact page, and review completed titles.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#191919] border-2 border-brand-border px-4 py-2 text-center">
              <span className="text-[10px] uppercase font-black text-brand-muted block">In Progress</span>
              <span className="font-display font-black text-xl text-brand-yellow">{currentlyReading.length}</span>
            </div>
            <div className="bg-[#191919] border-2 border-brand-border px-4 py-2 text-center">
              <span className="text-[10px] uppercase font-black text-brand-muted block">Completed</span>
              <span className="font-display font-black text-xl text-brand-green">{completedBooks.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: CONTINUE READING */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-brand-border pb-2">
          <h2 className="font-display font-black text-2xl text-brand-paper uppercase flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-yellow" />
            Currently Reading ({currentlyReading.length})
          </h2>
          <Link to="/books" className="text-xs font-bold text-brand-yellow hover:underline">
            Explore More Titles →
          </Link>
        </div>

        {currentlyReading.length === 0 ? (
          <div className="p-8 bg-[#161616] border border-dashed border-brand-border text-center space-y-3">
            <p className="text-sm text-brand-muted">You have no active reading sessions in progress.</p>
            <Link to="/books" className="px-5 py-2 bg-brand-yellow text-black text-xs font-black uppercase inline-block">
              Pick a Comic to Read
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentlyReading.map((item) => (
              <div 
                key={item.id}
                className="bg-[#191919] border-2 border-brand-border hover:border-brand-yellow p-4 transition flex gap-4"
              >
                <img 
                  src={item.coverImage} 
                  alt={item.title} 
                  className="w-20 aspect-[2/3] object-cover border border-black shrink-0" 
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-brand-paper line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-brand-muted mt-0.5">{item.creators?.join(', ')}</p>
                    <p className="text-xs text-brand-yellow font-black mt-2">
                      Page {item.progress.currentPage} ({item.progress.progressPercentage}% Complete)
                    </p>
                    <div className="w-full h-2 bg-[#2a2a2a] mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-brand-yellow" 
                        style={{ width: `${item.progress.progressPercentage}%` }} 
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/read/${item.id}`)}
                    className="mt-3 w-full py-2 bg-brand-yellow text-black font-black uppercase text-xs tracking-wider border border-black hover:bg-white transition flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    Resume From Page {item.progress.currentPage}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: COMPLETED ISSUES */}
      {completedBooks.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="border-b-2 border-brand-border pb-2">
            <h2 className="font-display font-black text-2xl text-brand-paper uppercase flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-green" />
              Completed Multiverse Volumes ({completedBooks.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {completedBooks.map((item) => (
              <div 
                key={item.id}
                className="p-3 bg-[#191919] border border-brand-green/50 flex items-center gap-3"
              >
                <img src={item.coverImage} alt={item.title} className="w-12 h-16 object-cover border border-black shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-xs text-brand-paper truncate">{item.title}</h4>
                  <span className="text-[10px] font-black uppercase text-brand-green block mt-1">
                    ✓ 100% Finished
                  </span>
                  <Link to={`/read/${item.id}`} className="text-[11px] text-brand-yellow hover:underline mt-1 inline-block">
                    Re-read →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: WISHLIST PREVIEW */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b-2 border-brand-border pb-2">
          <h2 className="font-display font-black text-2xl text-brand-paper uppercase flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-brand-purple" />
            Wishlist Shelf ({wishlistBooks.length})
          </h2>
          <Link to="/wishlist" className="text-xs font-bold text-brand-purple hover:underline">
            View All Saved →
          </Link>
        </div>

        {wishlistBooks.length === 0 ? (
          <p className="text-xs text-brand-muted italic py-4">No wishlisted titles yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {wishlistBooks.slice(0, 5).map((b) => (
              <Link 
                key={b.id} 
                to={`/books/${b.id}`}
                className="group p-2 bg-[#191919] border border-brand-border hover:border-brand-purple transition block"
              >
                <img src={b.coverImage} alt={b.title} className="w-full aspect-[2/3] object-cover mb-2 border border-black" />
                <h4 className="font-bold text-xs text-brand-paper group-hover:text-brand-purple truncate">{b.title}</h4>
                <p className="text-[10px] text-brand-muted truncate">{b.genres?.[0]}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
