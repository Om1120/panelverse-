import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, BookOpen, Calendar, ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react';

export const BorrowModal = ({ book, isOpen, onClose }) => {
  const { requestBorrow, currentUser } = useApp();
  const navigate = useNavigate();
  const [selectedCopyId, setSelectedCopyId] = useState('');
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [submittedBorrowing, setSubmittedBorrowing] = useState(null);

  if (!isOpen || !book) return null;

  const availableCopies = book.physicalInventory?.copies?.filter(c => c.status === 'AVAILABLE') || [];

  const handleConfirm = () => {
    if (!agreedToRules) return;
    const res = requestBorrow(book.id, selectedCopyId || (availableCopies[0]?.id));
    if (res.success) {
      setSubmittedBorrowing(res.borrowing);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg bg-[#191919] border-2 border-brand-green shadow-brutal-dark text-brand-paper overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-[#111111] border-b-2 border-brand-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-green" />
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-brand-paper">
              PHYSICAL BORROWING REQUEST
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-brand-muted hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedBorrowing ? (
          /* Confirmation Success State */
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-brand-green text-black border-2 border-black flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-comic text-2xl text-brand-green">REQUEST LOGGED SUCCESSFULLY!</h4>
              <p className="text-xs text-brand-muted mt-1">
                Your loan request for <strong className="text-brand-paper">{book.title}</strong> has been logged into the syndicate.
              </p>
            </div>

            <div className="bg-[#111111] border border-brand-border p-3 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-brand-muted">Request ID:</span>
                <span className="font-mono font-bold text-brand-yellow">{submittedBorrowing.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Allocated Copy:</span>
                <span className="font-bold">{submittedBorrowing.copyNumber} ({submittedBorrowing.barcode})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Status:</span>
                <span className="font-black text-brand-yellow uppercase">{submittedBorrowing.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Borrower:</span>
                <span className="font-bold">{submittedBorrowing.userName}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => { onClose(); navigate('/my-borrowings'); }}
                className="flex-1 comic-btn-yellow py-2.5 text-xs font-black tracking-wider flex items-center justify-center gap-2"
              >
                <span>VIEW IN MY DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="comic-btn-dark py-2.5 px-4 text-xs font-bold"
              >
                CONTINUE BROWSING
              </button>
            </div>
          </div>
        ) : (
          /* Request Form */
          <div className="p-5 space-y-4 text-xs">
            {/* Book Info Summary */}
            <div className="flex gap-3 bg-[#222222] p-3 border border-brand-border">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-14 h-20 object-cover border border-black shrink-0" 
              />
              <div className="space-y-1">
                <h4 className="font-display font-black text-sm text-brand-paper">{book.title}</h4>
                <p className="text-brand-muted">By {book.creators?.join(', ')}</p>
                <p className="text-brand-green font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {availableCopies.length} physical copies in vault
                </p>
              </div>
            </div>

            {/* Select Copy */}
            <div>
              <label className="block font-black uppercase text-[11px] text-brand-paper mb-2">
                Select Available Physical Edition:
              </label>
              <div className="space-y-1.5">
                {availableCopies.map((copy) => (
                  <label
                    key={copy.id}
                    className={`flex items-center justify-between p-2.5 border cursor-pointer transition ${
                      (selectedCopyId === copy.id || (!selectedCopyId && availableCopies[0]?.id === copy.id))
                        ? 'border-brand-green bg-brand-green/10 text-white'
                        : 'border-brand-border bg-[#161616] text-brand-muted hover:border-brand-paper'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="physicalCopy"
                        value={copy.id}
                        checked={selectedCopyId === copy.id || (!selectedCopyId && availableCopies[0]?.id === copy.id)}
                        onChange={() => setSelectedCopyId(copy.id)}
                        className="accent-brand-green"
                      />
                      <span className="font-bold text-brand-paper">Copy {copy.copyNumber}</span>
                      <span className="text-[10px] bg-black px-1.5 py-0.5 text-brand-muted border border-brand-border">
                        {copy.barcode}
                      </span>
                    </div>
                    <span className="font-semibold text-brand-yellow text-[11px]">{copy.condition} condition</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Lending Guidelines */}
            <div className="bg-[#111111] p-3 border border-brand-border space-y-2">
              <div className="flex items-center gap-1.5 text-brand-yellow font-black uppercase text-[10px]">
                <Calendar className="w-3.5 h-3.5" /> 14-Day Free IRL Lending Policy
              </div>
              <ul className="list-disc list-inside text-[11px] text-brand-muted space-y-1">
                <li>Loan duration: 14 standard calendar days from pickup.</li>
                <li>Digital reading remains 100% accessible in your library during the loan.</li>
                <li>Handle with care to protect print textures and bindings.</li>
              </ul>
            </div>

            {/* User identification info */}
            <div className="text-[11px] text-brand-muted">
              Submitting as: <strong className="text-brand-paper">{currentUser?.displayName || 'Guest Reader'}</strong>
            </div>

            {/* Agreement Checkbox */}
            <label className="flex items-start gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedToRules}
                onChange={(e) => setAgreedToRules(e.target.checked)}
                className="mt-0.5 accent-brand-green w-4 h-4"
              />
              <span className="text-[11px] text-brand-paper">
                I agree to the borrowing rules and promise to return this edition by the scheduled due date.
              </span>
            </label>

            {/* Submit Button */}
            <button
              onClick={handleConfirm}
              disabled={!agreedToRules || availableCopies.length === 0}
              className={`w-full py-3 text-xs font-black uppercase tracking-wider border-2 border-black transition ${
                agreedToRules && availableCopies.length > 0
                  ? 'bg-brand-green text-black hover:bg-[#a5e836] shadow-brutal-dark cursor-pointer'
                  : 'bg-[#333333] text-brand-muted border-brand-border cursor-not-allowed'
              }`}
            >
              CONFIRM BORROWING REQUEST
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
