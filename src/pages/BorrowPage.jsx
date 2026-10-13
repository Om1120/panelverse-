import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  PackageCheck, AlertCircle, Clock, CheckCircle, 
  Shield, BookOpen, Search, Filter, Sparkles 
} from 'lucide-react';

export const BorrowPage = () => {
  const { books, requestBorrow, reserveBook, currentUser } = useApp();
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'available' | 'waitlist'
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Books with physical borrowing enabled
  const physicalBooks = books.filter(b => b.physicalBorrowingEnabled);

  const filteredBooks = physicalBooks.filter(b => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!b.title.toLowerCase().includes(q) && !b.creators?.some(c => c.toLowerCase().includes(q))) {
        return false;
      }
    }
    const avail = b.physicalInventory?.availableCopies || 0;
    if (filterMode === 'available' && avail <= 0) return false;
    if (filterMode === 'waitlist' && avail > 0) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="border-b-4 border-brand-purple pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-purple text-white text-xs font-black uppercase tracking-wider mb-3">
              <PackageCheck className="w-3.5 h-3.5" />
              PHYSICAL COLLECTOR EDITIONS
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase tracking-tight">
              BORROW IRL. <span className="text-brand-purple">SHELF TIME.</span>
            </h1>
            <p className="text-sm text-brand-muted mt-2 max-w-xl">
              Hold real print in your hands. Check availability of collector copies, place loan requests, or join reservation queues.
            </p>
          </div>

          <Link
            to="/my-borrowings"
            className="px-5 py-2.5 bg-[#191919] border-2 border-brand-purple hover:bg-brand-purple hover:text-white text-brand-paper text-xs font-black uppercase tracking-wider transition text-center shadow-brutal-dark"
          >
            My Active Loans & Status →
          </Link>
        </div>
      </div>

      {/* Borrowing System Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-[#161616] border-2 border-brand-border space-y-2">
          <span className="font-comic text-brand-yellow text-lg">STEP 01</span>
          <h3 className="font-display font-black text-sm uppercase text-brand-paper">Choose A Collector Copy</h3>
          <p className="text-xs text-brand-muted">
            Inspect individual condition grades (Mint, Very Good, Good) and copy barcodes before submitting.
          </p>
        </div>
        <div className="p-5 bg-[#161616] border-2 border-brand-border space-y-2">
          <span className="font-comic text-brand-purple text-lg">STEP 02</span>
          <h3 className="font-display font-black text-sm uppercase text-brand-paper">14-Day Lending Window</h3>
          <p className="text-xs text-brand-muted">
            Enjoy your physical edition for two weeks. Pick up with your request confirmation barcode.
          </p>
        </div>
        <div className="p-5 bg-[#161616] border-2 border-brand-border space-y-2">
          <span className="font-comic text-brand-green text-lg">STEP 03</span>
          <h3 className="font-display font-black text-sm uppercase text-brand-paper">Reserve Queue</h3>
          <p className="text-xs text-brand-muted">
            If all copies are loaned out, reserve a queue spot. You'll receive notification when returned!
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search physical titles or creators..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#191919] border-2 border-brand-border focus:border-brand-purple text-brand-paper placeholder-brand-muted text-sm font-medium focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-2 border uppercase transition ${filterMode === 'all' ? 'bg-brand-purple text-white border-black font-black' : 'bg-[#191919] border-brand-border text-brand-paper'}`}
          >
            All Physical ({physicalBooks.length})
          </button>
          <button
            onClick={() => setFilterMode('available')}
            className={`px-3 py-2 border uppercase transition ${filterMode === 'available' ? 'bg-brand-green text-black border-black font-black' : 'bg-[#191919] border-brand-border text-brand-paper'}`}
          >
            ✓ In Stock Now
          </button>
          <button
            onClick={() => setFilterMode('waitlist')}
            className={`px-3 py-2 border uppercase transition ${filterMode === 'waitlist' ? 'bg-brand-yellow text-black border-black font-black' : 'bg-[#191919] border-brand-border text-brand-paper'}`}
          >
            Waitlist Queue
          </button>
        </div>
      </div>

      {/* Physical Book Inventory List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const copies = book.physicalInventory?.copies || [];
          const avail = copies.filter(c => c.status === 'AVAILABLE');
          const isAvail = avail.length > 0;

          return (
            <div 
              key={book.id}
              className="bg-[#191919] border-2 border-brand-border hover:border-brand-purple p-5 shadow-brutal-dark transition flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-4 mb-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-20 aspect-[2/3] object-cover border-2 border-black shrink-0"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-black border border-brand-border text-brand-purple">
                      {book.genres?.[0]}
                    </span>
                    <h3 className="font-display font-black text-base text-brand-paper mt-1.5 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5 truncate">
                      By {book.creators?.join(', ')}
                    </p>
                    <p className="text-[11px] text-brand-muted font-mono mt-1">
                      ISBN: {book.isbn}
                    </p>
                  </div>
                </div>

                {/* Copies list preview */}
                <div className="space-y-1.5 pt-3 border-t border-brand-border mb-4">
                  <span className="text-[10px] uppercase font-bold text-brand-muted block">
                    Copy Inventory Breakdown:
                  </span>
                  {copies.map(c => (
                    <div key={c.id} className="flex items-center justify-between text-[11px] p-1.5 bg-[#141414] border border-brand-border">
                      <span>{c.copyNumber} ({c.condition})</span>
                      <span className={`px-1.5 py-0.2 text-[9px] font-black uppercase ${
                        c.status === 'AVAILABLE' ? 'text-brand-green' : c.status === 'RESERVED' ? 'text-brand-yellow' : 'text-brand-red'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-brand-border flex items-center gap-2">
                <Link
                  to={`/books/${book.id}`}
                  className="flex-1 py-2 text-center bg-[#222222] hover:bg-brand-paper hover:text-black text-brand-paper font-black uppercase text-xs border border-brand-border transition"
                >
                  View Details
                </Link>

                {isAvail ? (
                  <button
                    onClick={() => {
                      requestBorrow(book.id, avail[0]?.id);
                      navigate('/my-borrowings');
                    }}
                    className="flex-1 py-2 bg-brand-purple hover:bg-white hover:text-black text-white font-black uppercase text-xs border border-black shadow-brutal-dark transition"
                  >
                    Borrow ({avail.length})
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      reserveBook(book.id);
                      navigate('/my-borrowings');
                    }}
                    className="flex-1 py-2 bg-[#1c1c1c] border border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black font-black uppercase text-xs transition"
                  >
                    Reserve
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
