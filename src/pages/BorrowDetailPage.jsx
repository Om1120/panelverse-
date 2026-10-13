import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, BookOpen, Calendar, Clock, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';

export const BorrowDetailPage = () => {
  const { borrowingId } = useParams();
  const { borrowings, cancelBorrow } = useApp();
  const navigate = useNavigate();

  const borrowing = borrowings.find(b => b.id === borrowingId);

  if (!borrowing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-comic text-4xl text-brand-red mb-2">LOAN RECORD NOT FOUND</h2>
        <Link to="/my-borrowings" className="comic-btn-yellow px-4 py-2 text-xs font-black">
          RETURN TO LOANS
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-brand-paper py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      <Link to="/my-borrowings" className="inline-flex items-center gap-2 text-xs font-black uppercase text-brand-muted hover:text-brand-green">
        <ArrowLeft className="w-4 h-4" /> All Loans & Requests
      </Link>

      <div className="bg-[#181818] border-2 border-brand-green shadow-brutal-dark p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
          <div>
            <span className="text-[10px] font-mono text-brand-yellow font-black uppercase tracking-widest">
              OFFICIAL LOAN CERTIFICATE
            </span>
            <h1 className="font-comic text-3xl sm:text-5xl text-brand-paper mt-1">
              LOAN #{borrowing.id}
            </h1>
          </div>

          <div className="self-start sm:self-auto">
            <span className={`px-3 py-1 text-xs font-black uppercase border-2 ${
              borrowing.status === 'ISSUED' ? 'bg-brand-green text-black border-black' :
              borrowing.status === 'REQUESTED' ? 'bg-brand-yellow text-black border-black' :
              'bg-[#222222] text-brand-paper border-brand-border'
            }`}>
              STATUS: {borrowing.status}
            </span>
          </div>
        </div>

        {/* Content details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-1">
            <img 
              src={borrowing.bookCover} 
              alt={borrowing.bookTitle} 
              className="w-full aspect-[2/3] object-cover border-2 border-black shadow-sm"
            />
          </div>

          <div className="sm:col-span-2 space-y-4 text-xs">
            <div>
              <h2 className="font-display font-black text-xl text-brand-paper">
                {borrowing.bookTitle}
              </h2>
              <p className="text-brand-muted mt-0.5">Borrower: <strong className="text-brand-paper">{borrowing.userName}</strong></p>
            </div>

            <div className="bg-[#111111] border border-brand-border p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-brand-muted">Assigned Copy:</span>
                <span className="font-bold text-brand-paper">{borrowing.copyNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Vault Barcode:</span>
                <span className="font-mono text-brand-yellow">{borrowing.barcode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Date Requested:</span>
                <span className="text-brand-paper">{borrowing.requestDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Due Return Date:</span>
                <span className="font-bold text-brand-green">{borrowing.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Return Status:</span>
                <span className="text-brand-paper">{borrowing.returnDate ? `Returned on ${borrowing.returnDate}` : 'Not Returned Yet'}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                to={`/read/${borrowing.bookId}`}
                className="comic-btn-yellow py-2 px-4 text-xs font-black uppercase tracking-wider"
              >
                READ DIGITAL VERSION
              </Link>

              {['REQUESTED', 'APPROVED'].includes(borrowing.status) && (
                <button
                  onClick={() => {
                    cancelBorrow(borrowing.id);
                    navigate('/my-borrowings');
                  }}
                  className="comic-btn-dark py-2 px-4 text-xs font-bold text-brand-red border-brand-red hover:bg-brand-red hover:text-white"
                >
                  CANCEL REQUEST
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
