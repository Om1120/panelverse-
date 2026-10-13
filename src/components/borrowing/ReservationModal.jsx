import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { X, Clock, CheckCircle, ArrowRight, AlertOctagon } from 'lucide-react';

export const ReservationModal = ({ book, isOpen, onClose }) => {
  const { reserveBook, reservations, currentUser } = useApp();
  const navigate = useNavigate();
  const [submittedReservation, setSubmittedReservation] = useState(null);

  if (!isOpen || !book) return null;

  const handleConfirmReservation = () => {
    const res = reserveBook(book.id);
    if (res.success) {
      setSubmittedReservation(res.reservation);
    }
  };

  const queueCount = reservations.filter(r => r.bookId === book.id && r.status === 'WAITING').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-[#191919] border-2 border-brand-yellow shadow-brutal-yellow text-brand-paper overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-[#111111] border-b-2 border-brand-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-yellow" />
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-brand-paper">
              RESERVE OUT-OF-STOCK EDITION
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-brand-muted hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedReservation ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-brand-yellow text-black border-2 border-black flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-comic text-2xl text-brand-yellow">RESERVATION CONFIRMED!</h4>
              <p className="text-xs text-brand-muted mt-1">
                You have secured your spot in line for <strong className="text-brand-paper">{book.title}</strong>.
              </p>
            </div>

            <div className="bg-[#111111] border border-brand-border p-3 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-brand-muted">Reservation ID:</span>
                <span className="font-mono font-bold text-brand-yellow">{submittedReservation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Your Queue Position:</span>
                <span className="font-black text-brand-green text-sm">#{submittedReservation.queuePosition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Status:</span>
                <span className="font-bold text-brand-yellow uppercase">{submittedReservation.status}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => { onClose(); navigate('/my-borrowings'); }}
                className="flex-1 comic-btn-yellow py-2.5 text-xs font-black tracking-wider flex items-center justify-center gap-2"
              >
                <span>VIEW IN DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="comic-btn-dark py-2.5 px-4 text-xs font-bold"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-4 text-xs">
            <div className="flex items-center gap-3 bg-brand-red/10 border border-brand-red/40 p-3 text-brand-red">
              <AlertOctagon className="w-5 h-5 shrink-0" />
              <p className="font-bold">
                All physical copies of this title are currently loaned out or in maintenance.
              </p>
            </div>

            <div className="bg-[#111111] p-3.5 border border-brand-border space-y-2">
              <h4 className="font-black text-sm text-brand-paper">{book.title}</h4>
              <p className="text-brand-muted">
                Placing a reservation reserves your spot in line. When an existing borrower returns their physical copy, you will be allocated the title next.
              </p>
              <div className="pt-2 border-t border-brand-border flex justify-between text-brand-yellow font-bold">
                <span>Current Waiting Queue:</span>
                <span>{queueCount} Reader{queueCount === 1 ? '' : 's'}</span>
              </div>
            </div>

            <p className="text-[11px] text-brand-muted">
              Note: Digital reading for this title remains 100% free and instantly accessible while you wait for the physical print edition.
            </p>

            <button
              onClick={handleConfirmReservation}
              className="w-full comic-btn-yellow py-3 text-xs font-black uppercase tracking-wider"
            >
              CONFIRM RESERVATION (QUEUE POSITION #{queueCount + 1})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
