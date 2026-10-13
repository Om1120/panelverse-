import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  PackageCheck, AlertCircle, Clock, CheckCircle, 
  XCircle, Calendar, ArrowRight, Shield 
} from 'lucide-react';

export const MyBorrowingsPage = () => {
  const { borrowings, reservations, cancelBorrow, cancelReservation, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('loans'); // 'loans' | 'reservations'

  // Filter borrowings for current user (or show all in demo if guest)
  const userBorrowings = currentUser?.role === 'admin' 
    ? borrowings 
    : borrowings.filter(b => b.userId === currentUser?.id || b.userId === 'guest-user');

  const userReservations = currentUser?.role === 'admin'
    ? reservations
    : reservations.filter(r => r.userId === currentUser?.id || r.userId === 'guest-user');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b-4 border-brand-purple pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-purple text-white text-xs font-black uppercase tracking-wider mb-3">
              <PackageCheck className="w-3.5 h-3.5" />
              PHYSICAL LOANS & QUEUES
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase tracking-tight">
              MY BORROWINGS & <span className="text-brand-purple">DUE DATES.</span>
            </h1>
            <p className="text-sm text-brand-muted mt-2 max-w-xl">
              Track physical book lending requests, pickup barcodes, 14-day checkout windows, and waitlist reservations.
            </p>
          </div>

          <Link
            to="/borrow"
            className="px-5 py-2.5 bg-brand-yellow text-black font-black uppercase text-xs tracking-wider border-2 border-black shadow-brutal-dark hover:bg-white transition text-center"
          >
            Borrow Another Title →
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b-2 border-brand-border text-xs font-black uppercase">
        <button
          onClick={() => setActiveTab('loans')}
          className={`px-5 py-3 border-b-2 transition ${
            activeTab === 'loans'
              ? 'border-brand-purple text-brand-purple bg-[#1c1c1c]'
              : 'border-transparent text-brand-muted hover:text-white'
          }`}
        >
          Loans & Requests ({userBorrowings.length})
        </button>
        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-5 py-3 border-b-2 transition ${
            activeTab === 'reservations'
              ? 'border-brand-purple text-brand-purple bg-[#1c1c1c]'
              : 'border-transparent text-brand-muted hover:text-white'
          }`}
        >
          Waitlist Reservations ({userReservations.length})
        </button>
      </div>

      {/* TAB 1: LOANS & REQUESTS */}
      {activeTab === 'loans' && (
        <div className="space-y-4">
          {userBorrowings.length === 0 ? (
            <div className="text-center py-16 bg-[#161616] border-2 border-dashed border-brand-border p-6 space-y-3">
              <PackageCheck className="w-12 h-12 text-brand-muted mx-auto stroke-1" />
              <h3 className="font-display font-black text-xl text-brand-paper">NO PHYSICAL LOANS REQUESTED</h3>
              <p className="text-xs text-brand-muted max-w-md mx-auto">
                You haven't requested any physical copies from the library yet. Browse our physical collector editions to get started.
              </p>
              <Link to="/borrow" className="px-5 py-2 bg-brand-purple text-white text-xs font-black uppercase inline-block">
                Browse Physical Books
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {userBorrowings.map((b) => (
                <div 
                  key={b.id}
                  className="bg-[#191919] border-2 border-brand-border p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:border-brand-purple"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={b.bookCover || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=200&q=80'} 
                      alt={b.bookTitle} 
                      className="w-14 h-20 object-cover border border-black shrink-0" 
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] text-brand-muted bg-black px-1.5 py-0.5 border border-brand-border">
                          {b.id}
                        </span>
                        <span className="text-[10px] font-bold text-brand-purple">
                          Copy {b.copyNumber} • Barcode: {b.barcode}
                        </span>
                      </div>
                      <h4 className="font-display font-black text-base text-brand-paper">
                        {b.bookTitle}
                      </h4>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-brand-muted mt-2">
                        <span>Requested: <strong className="text-brand-paper">{b.requestDate}</strong></span>
                        <span>Due Date: <strong className="text-brand-yellow">{b.dueDate}</strong></span>
                        <span>Fine: <strong className="text-brand-paper">${b.fineAmount || 0}.00</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-brand-border">
                    <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider border ${
                      b.status === 'ISSUED' 
                        ? 'bg-brand-green/20 text-brand-green border-brand-green' 
                        : b.status === 'REQUESTED' 
                        ? 'bg-brand-yellow/20 text-brand-yellow border-brand-yellow' 
                        : b.status === 'APPROVED' 
                        ? 'bg-brand-purple/20 text-brand-purple border-brand-purple'
                        : b.status === 'RETURNED'
                        ? 'bg-white/20 text-white border-white'
                        : 'bg-brand-red/20 text-brand-red border-brand-red'
                    }`}>
                      {b.status}
                    </span>

                    {['REQUESTED', 'APPROVED'].includes(b.status) && (
                      <button
                        onClick={() => cancelBorrow(b.id)}
                        className="px-3 py-1 text-xs font-bold text-brand-muted hover:text-brand-red border border-brand-border hover:border-brand-red transition"
                        title="Cancel this borrow request"
                      >
                        Cancel
                      </button>
                    )}

                    <Link
                      to={`/books/${b.bookId}`}
                      className="p-1 hover:text-brand-yellow text-brand-muted"
                      title="View Book Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: RESERVATIONS */}
      {activeTab === 'reservations' && (
        <div className="space-y-4">
          {userReservations.length === 0 ? (
            <div className="text-center py-16 bg-[#161616] border-2 border-dashed border-brand-border p-6 space-y-3">
              <AlertCircle className="w-12 h-12 text-brand-muted mx-auto stroke-1" />
              <h3 className="font-display font-black text-xl text-brand-paper">NO ACTIVE RESERVATIONS</h3>
              <p className="text-xs text-brand-muted max-w-md mx-auto">
                When a physical copy is currently loaned out, you can join its waitlist queue to reserve the next available copy.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {userReservations.map((r) => (
                <div 
                  key={r.id}
                  className="bg-[#191919] border-2 border-brand-border p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={r.bookCover || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=200&q=80'} 
                      alt={r.bookTitle} 
                      className="w-14 h-20 object-cover border border-black shrink-0" 
                    />
                    <div>
                      <span className="font-mono text-[10px] text-brand-muted bg-black px-1.5 py-0.5 border border-brand-border">
                        {r.id}
                      </span>
                      <h4 className="font-display font-black text-base text-brand-paper mt-1">
                        {r.bookTitle}
                      </h4>
                      <p className="text-xs text-brand-yellow font-bold mt-1">
                        Queue Position: #{r.queuePosition} in line
                      </p>
                      <span className="text-[11px] text-brand-muted block mt-1">
                        Reserved on: {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-xs font-black uppercase border ${
                      r.status === 'AVAILABLE' 
                        ? 'bg-brand-green/20 text-brand-green border-brand-green' 
                        : r.status === 'WAITING' 
                        ? 'bg-brand-yellow/20 text-brand-yellow border-brand-yellow' 
                        : 'bg-brand-muted/20 text-brand-muted border-brand-muted'
                    }`}>
                      {r.status}
                    </span>

                    {r.status === 'WAITING' && (
                      <button
                        onClick={() => cancelReservation(r.id)}
                        className="px-3 py-1 text-xs font-bold text-brand-muted hover:text-brand-red border border-brand-border hover:border-brand-red transition"
                      >
                        Cancel Reservation
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
