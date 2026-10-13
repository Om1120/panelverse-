import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, BookOpen, PackageCheck, Users, MessageSquare, 
  Plus, Edit, Trash2, CheckCircle, XCircle, RotateCcw, 
  Search, AlertTriangle, Eye, ArrowUpDown, X
} from 'lucide-react';

export const AdminPage = () => {
  const { 
    books, 
    authors, 
    borrowings, 
    reservations, 
    reviews, 
    currentUser, 
    switchUserRole,
    adminAddBook, 
    adminUpdateBook, 
    adminDeleteBook, 
    adminAddCopy, 
    adminUpdateCopyStatus, 
    adminUpdateBorrowStatus, 
    deleteReview, 
    resetToDefaultData 
  } = useApp();

  const [activeTab, setActiveTab] = useState('books'); // 'books' | 'inventory' | 'borrowings' | 'reservations' | 'reviews'
  const [bookSearch, setBookSearch] = useState('');
  
  // Book Add/Edit Modal
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [bookForm, setBookForm] = useState({
    title: '',
    subtitle: '',
    creators: '',
    genres: 'Sci-Fi & Cyberpunk',
    pageCount: 32,
    coverImage: '',
    isbn: '',
    description: '',
    readingDirection: 'ltr',
    physicalBorrowingEnabled: true
  });

  // Add Copy Modal
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [selectedBookForCopy, setSelectedBookForCopy] = useState(null);
  const [copyCondition, setCopyCondition] = useState('Mint');

  // Stats
  const totalPhysicalCopies = books.reduce((acc, b) => acc + (b.physicalInventory?.totalCopies || 0), 0);
  const availableCopies = books.reduce((acc, b) => acc + (b.physicalInventory?.availableCopies || 0), 0);
  const pendingBorrowRequests = borrowings.filter(b => b.status === 'REQUESTED').length;
  const activeLoans = borrowings.filter(b => b.status === 'ISSUED').length;

  const handleOpenAddBook = () => {
    setEditingBook(null);
    setBookForm({
      title: '',
      subtitle: '',
      creators: '',
      genres: 'Sci-Fi & Cyberpunk',
      pageCount: 32,
      coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      isbn: `978-1-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}-0`,
      description: '',
      readingDirection: 'ltr',
      physicalBorrowingEnabled: true
    });
    setBookModalOpen(true);
  };

  const handleOpenEditBook = (book) => {
    setEditingBook(book);
    setBookForm({
      title: book.title,
      subtitle: book.subtitle || '',
      creators: book.creators?.join(', ') || '',
      genres: book.genres?.[0] || 'Sci-Fi & Cyberpunk',
      pageCount: book.pageCount || 32,
      coverImage: book.coverImage || '',
      isbn: book.isbn || '',
      description: book.description || '',
      readingDirection: book.readingDirection || 'ltr',
      physicalBorrowingEnabled: !!book.physicalBorrowingEnabled
    });
    setBookModalOpen(true);
  };

  const handleBookFormSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...bookForm,
      creators: bookForm.creators.split(',').map(s => s.trim()).filter(Boolean),
      genres: [bookForm.genres],
      pageCount: Number(bookForm.pageCount)
    };

    if (editingBook) {
      adminUpdateBook(editingBook.id, formattedData);
    } else {
      adminAddBook(formattedData);
    }
    setBookModalOpen(false);
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
    b.creators?.some(c => c.toLowerCase().includes(bookSearch.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="border-b-4 border-brand-red pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-red text-white text-xs font-black uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              CURATOR CONTROL CENTER
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase tracking-tight">
              ADMIN <span className="text-brand-red">CONSOLE.</span>
            </h1>
            <p className="text-sm text-brand-muted mt-2 max-w-xl">
              Catalogue CRUD, physical collector inventory management, borrowing approvals, queue reservations, and review moderation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={resetToDefaultData}
              className="px-4 py-2 bg-[#1c1c1c] border border-brand-border text-brand-muted hover:text-brand-yellow hover:border-brand-yellow text-xs font-bold transition flex items-center gap-1.5"
              title="Reset state back to initial seed data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo State
            </button>
            {currentUser?.role !== 'admin' && (
              <button
                onClick={() => switchUserRole('admin')}
                className="px-4 py-2 bg-brand-red text-white font-black uppercase text-xs border border-black shadow-brutal-dark"
              >
                Switch to Admin Role
              </button>
            )}
          </div>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 bg-[#191919] border-2 border-brand-border">
          <span className="text-[10px] uppercase font-bold text-brand-muted block">Total Titles</span>
          <span className="font-display font-black text-2xl text-brand-yellow">{books.length}</span>
        </div>
        <div className="p-3 bg-[#191919] border-2 border-brand-border">
          <span className="text-[10px] uppercase font-bold text-brand-muted block">Physical Copies</span>
          <span className="font-display font-black text-2xl text-brand-paper">{availableCopies}/{totalPhysicalCopies}</span>
        </div>
        <div className="p-3 bg-[#191919] border-2 border-brand-border">
          <span className="text-[10px] uppercase font-bold text-brand-muted block">Pending Requests</span>
          <span className="font-display font-black text-2xl text-brand-red">{pendingBorrowRequests}</span>
        </div>
        <div className="p-3 bg-[#191919] border-2 border-brand-border">
          <span className="text-[10px] uppercase font-bold text-brand-muted block">Active Loans</span>
          <span className="font-display font-black text-2xl text-brand-green">{activeLoans}</span>
        </div>
        <div className="p-3 bg-[#191919] border-2 border-brand-border">
          <span className="text-[10px] uppercase font-bold text-brand-muted block">Reservations</span>
          <span className="font-display font-black text-2xl text-brand-purple">{reservations.length}</span>
        </div>
        <div className="p-3 bg-[#191919] border-2 border-brand-border">
          <span className="text-[10px] uppercase font-bold text-brand-muted block">Reviews</span>
          <span className="font-display font-black text-2xl text-brand-cyan">{reviews.length}</span>
        </div>
      </div>

      {/* TABS HEADER */}
      <div className="flex border-b-2 border-brand-border text-xs font-black uppercase overflow-x-auto">
        {[
          { id: 'books', label: `Books Catalogue (${books.length})` },
          { id: 'inventory', label: 'Physical Copies' },
          { id: 'borrowings', label: `Borrow Requests (${borrowings.length})` },
          { id: 'reservations', label: `Reservations (${reservations.length})` },
          { id: 'reviews', label: `Reviews (${reviews.length})` }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-3 whitespace-nowrap border-b-2 transition ${
              activeTab === t.id
                ? 'border-brand-red text-brand-red bg-[#1c1c1c]'
                : 'border-transparent text-brand-muted hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: BOOKS CATALOGUE MANAGEMENT */}
      {activeTab === 'books' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input
                type="text"
                value={bookSearch}
                onChange={(e) => setBookSearch(e.target.value)}
                placeholder="Search catalogue to edit or delete..."
                className="w-full pl-9 pr-3 py-2 bg-[#191919] border border-brand-border text-xs text-brand-paper focus:outline-none"
              />
            </div>
            <button
              onClick={handleOpenAddBook}
              className="px-4 py-2 bg-brand-yellow text-black font-black uppercase text-xs border border-black hover:bg-white transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add New Comic Book
            </button>
          </div>

          <div className="overflow-x-auto border-2 border-brand-border bg-[#191919]">
            <table className="w-full text-left text-xs text-brand-paper">
              <thead className="bg-[#111111] border-b border-brand-border uppercase text-brand-muted font-black text-[10px]">
                <tr>
                  <th className="p-3">Cover & Title</th>
                  <th className="p-3">Creators</th>
                  <th className="p-3">Genre</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Physical Inventory</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredBooks.map((b) => (
                  <tr key={b.id} className="hover:bg-[#202020] transition">
                    <td className="p-3 flex items-center gap-3">
                      <img src={b.coverImage} alt={b.title} className="w-10 h-14 object-cover border border-black shrink-0" />
                      <div>
                        <span className="font-bold block text-brand-paper">{b.title}</span>
                        <span className="text-[10px] text-brand-muted font-mono">{b.isbn}</span>
                      </div>
                    </td>
                    <td className="p-3 text-brand-muted">{b.creators?.join(', ')}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-black text-brand-yellow text-[10px] font-bold border border-brand-border">
                        {b.genres?.[0]}
                      </span>
                    </td>
                    <td className="p-3 text-brand-yellow font-bold">★ {b.rating}</td>
                    <td className="p-3">
                      {b.physicalBorrowingEnabled ? (
                        <span className="text-brand-green font-bold">
                          {b.physicalInventory?.availableCopies}/{b.physicalInventory?.totalCopies} Copies
                        </span>
                      ) : (
                        <span className="text-brand-muted">Digital Exclusive</span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditBook(b)}
                        className="p-1.5 hover:text-brand-yellow text-brand-muted"
                        title="Edit book metadata"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${b.title}" from catalogue?`)) {
                            adminDeleteBook(b.id);
                          }
                        }}
                        className="p-1.5 hover:text-brand-red text-brand-muted"
                        title="Delete book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PHYSICAL INVENTORY COPIES */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <p className="text-xs text-brand-muted">
            Manage individual physical copies, barcodes, conditions, and lending statuses for each physical title in the library.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {books.filter(b => b.physicalBorrowingEnabled).map((b) => (
              <div key={b.id} className="p-4 bg-[#191919] border-2 border-brand-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={b.coverImage} alt={b.title} className="w-10 h-14 object-cover border border-black shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-paper">{b.title}</h4>
                      <span className="text-xs text-brand-green font-bold">
                        {b.physicalInventory?.availableCopies} of {b.physicalInventory?.totalCopies} Copies Available
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBookForCopy(b);
                      setCopyModalOpen(true);
                    }}
                    className="px-2.5 py-1 bg-brand-purple text-white text-[11px] font-black uppercase hover:bg-white hover:text-black transition"
                  >
                    + Add Copy
                  </button>
                </div>

                {/* Copies List */}
                <div className="space-y-1.5 pt-2 border-t border-brand-border text-xs">
                  {b.physicalInventory?.copies?.map((copy) => (
                    <div key={copy.id} className="flex items-center justify-between p-2 bg-[#141414] border border-brand-border">
                      <div>
                        <strong className="text-brand-paper mr-2">{copy.copyNumber}</strong>
                        <span className="text-brand-muted">Condition: {copy.condition}</span>
                        <span className="text-[10px] text-brand-muted block font-mono">{copy.barcode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={copy.status}
                          onChange={(e) => adminUpdateCopyStatus(b.id, copy.id, e.target.value)}
                          className="bg-black border border-brand-border text-[10px] font-black uppercase px-2 py-1 text-brand-paper focus:outline-none"
                        >
                          <option value="AVAILABLE">AVAILABLE</option>
                          <option value="RESERVED">RESERVED</option>
                          <option value="LOANED">LOANED</option>
                          <option value="DAMAGED">DAMAGED</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BORROW REQUESTS & LOANS */}
      {activeTab === 'borrowings' && (
        <div className="space-y-4">
          <div className="overflow-x-auto border-2 border-brand-border bg-[#191919]">
            <table className="w-full text-left text-xs text-brand-paper">
              <thead className="bg-[#111111] border-b border-brand-border uppercase text-brand-muted font-black text-[10px]">
                <tr>
                  <th className="p-3">Loan ID & Book</th>
                  <th className="p-3">Reader</th>
                  <th className="p-3">Copy & Barcode</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {borrowings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#202020] transition">
                    <td className="p-3">
                      <span className="font-mono text-[10px] text-brand-muted block">{b.id}</span>
                      <strong className="text-brand-paper">{b.bookTitle}</strong>
                    </td>
                    <td className="p-3 text-brand-muted">{b.userName}</td>
                    <td className="p-3 font-mono text-[11px]">{b.copyNumber} ({b.barcode})</td>
                    <td className="p-3 text-brand-yellow font-bold">{b.dueDate}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase border ${
                        b.status === 'ISSUED' ? 'text-brand-green border-brand-green' :
                        b.status === 'REQUESTED' ? 'text-brand-yellow border-brand-yellow' :
                        b.status === 'APPROVED' ? 'text-brand-purple border-brand-purple' :
                        b.status === 'RETURNED' ? 'text-white border-white' : 'text-brand-red border-brand-red'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      {b.status === 'REQUESTED' && (
                        <button
                          onClick={() => adminUpdateBorrowStatus(b.id, 'APPROVED')}
                          className="px-2 py-1 bg-brand-purple text-white text-[10px] font-bold uppercase hover:bg-white hover:text-black"
                        >
                          Approve
                        </button>
                      )}
                      {b.status === 'APPROVED' && (
                        <button
                          onClick={() => adminUpdateBorrowStatus(b.id, 'ISSUED')}
                          className="px-2 py-1 bg-brand-green text-black text-[10px] font-bold uppercase hover:bg-white"
                        >
                          Issue Book
                        </button>
                      )}
                      {b.status === 'ISSUED' && (
                        <button
                          onClick={() => adminUpdateBorrowStatus(b.id, 'RETURNED')}
                          className="px-2 py-1 bg-brand-yellow text-black text-[10px] font-bold uppercase hover:bg-white"
                        >
                          Mark Returned
                        </button>
                      )}
                      {['REQUESTED', 'APPROVED'].includes(b.status) && (
                        <button
                          onClick={() => adminUpdateBorrowStatus(b.id, 'REJECTED')}
                          className="px-2 py-1 bg-brand-red text-white text-[10px] font-bold uppercase hover:bg-white hover:text-black"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: RESERVATIONS QUEUE */}
      {activeTab === 'reservations' && (
        <div className="space-y-4">
          <div className="overflow-x-auto border-2 border-brand-border bg-[#191919]">
            <table className="w-full text-left text-xs text-brand-paper">
              <thead className="bg-[#111111] border-b border-brand-border uppercase text-brand-muted font-black text-[10px]">
                <tr>
                  <th className="p-3">Reservation ID</th>
                  <th className="p-3">Book Title</th>
                  <th className="p-3">Reader</th>
                  <th className="p-3">Queue Position</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Requested At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {reservations.map((r) => (
                  <tr key={r.id} className="hover:bg-[#202020] transition">
                    <td className="p-3 font-mono text-[11px] text-brand-muted">{r.id}</td>
                    <td className="p-3 font-bold text-brand-paper">{r.bookTitle}</td>
                    <td className="p-3 text-brand-muted">{r.userName}</td>
                    <td className="p-3 text-brand-yellow font-bold">#{r.queuePosition} in line</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase text-brand-yellow border border-brand-yellow">
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-brand-muted text-[11px]">{new Date(r.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: REVIEWS MODERATION */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 bg-[#191919] border border-brand-border flex items-start justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-brand-paper">{rev.userName}</strong>
                    <span className="text-brand-yellow font-bold">★ {rev.rating}</span>
                    <span className="text-[10px] text-brand-muted font-mono">{rev.bookId}</span>
                  </div>
                  <p className="text-brand-paper/90 font-sans">{rev.comment}</p>
                  <span className="text-[10px] text-brand-muted block">{new Date(rev.createdAt).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => deleteReview(rev.id)}
                  className="px-2.5 py-1 bg-brand-red/20 text-brand-red border border-brand-red hover:bg-brand-red hover:text-white text-[10px] font-bold uppercase transition shrink-0"
                >
                  Delete / Moderate
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOK ADD / EDIT MODAL */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#191919] border-2 border-brand-yellow shadow-brutal-dark max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 text-brand-paper space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-display font-black text-lg text-brand-yellow uppercase">
                {editingBook ? `Edit: ${editingBook.title}` : 'Add New Multiverse Title'}
              </h3>
              <button onClick={() => setBookModalOpen(false)} className="text-brand-muted hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold uppercase text-brand-muted block mb-1">Title *</label>
                <input
                  required
                  type="text"
                  value={bookForm.title}
                  onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                  className="w-full p-2 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-brand-muted block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={bookForm.subtitle}
                  onChange={(e) => setBookForm({ ...bookForm, subtitle: e.target.value })}
                  className="w-full p-2 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase text-brand-muted block mb-1">Creators (comma separated)</label>
                  <input
                    required
                    type="text"
                    value={bookForm.creators}
                    onChange={(e) => setBookForm({ ...bookForm, creators: e.target.value })}
                    className="w-full p-2 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-brand-muted block mb-1">Primary Genre</label>
                  <select
                    value={bookForm.genres}
                    onChange={(e) => setBookForm({ ...bookForm, genres: e.target.value })}
                    className="w-full p-2 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
                  >
                    <option value="Sci-Fi & Cyberpunk">Sci-Fi & Cyberpunk</option>
                    <option value="Manga & Shonen">Manga & Shonen</option>
                    <option value="Superheroes">Superheroes</option>
                    <option value="Dark Fantasy">Dark Fantasy</option>
                    <option value="Horror & Occult">Horror & Occult</option>
                    <option value="Mystery & Noir">Mystery & Noir</option>
                    <option value="Street Action">Street Action</option>
                    <option value="Indie & Experimental">Indie & Experimental</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase text-brand-muted block mb-1">Page Count</label>
                  <input
                    type="number"
                    value={bookForm.pageCount}
                    onChange={(e) => setBookForm({ ...bookForm, pageCount: e.target.value })}
                    className="w-full p-2 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-brand-muted block mb-1">Reading Direction</label>
                  <select
                    value={bookForm.readingDirection}
                    onChange={(e) => setBookForm({ ...bookForm, readingDirection: e.target.value })}
                    className="w-full p-2 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
                  >
                    <option value="ltr">LTR (Western Comic)</option>
                    <option value="rtl">RTL (Manga)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-brand-muted block mb-1">Cover Artwork URL</label>
                <input
                  type="url"
                  value={bookForm.coverImage}
                  onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.value })}
                  className="w-full p-2 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-brand-muted block mb-1">Synopsis / Story Description</label>
                <textarea
                  rows={3}
                  value={bookForm.description}
                  onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                  className="w-full p-2 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="physicalEnabled"
                  checked={bookForm.physicalBorrowingEnabled}
                  onChange={(e) => setBookForm({ ...bookForm, physicalBorrowingEnabled: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="physicalEnabled" className="font-bold text-brand-paper cursor-pointer">
                  Enable Physical IRL Borrowing for this Title
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setBookModalOpen(false)}
                  className="flex-1 py-2 bg-[#222222] border border-brand-border text-brand-paper text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-brand-yellow text-black font-black uppercase text-xs border border-black hover:bg-white transition"
                >
                  {editingBook ? 'Save Changes' : 'Publish Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PHYSICAL COPY MODAL */}
      {copyModalOpen && selectedBookForCopy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#191919] border-2 border-brand-purple shadow-brutal-dark max-w-sm w-full p-5 text-brand-paper space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-2">
              <h4 className="font-display font-black text-sm uppercase text-brand-purple">
                Add Copy to: {selectedBookForCopy.title}
              </h4>
              <button onClick={() => setCopyModalOpen(false)} className="text-brand-muted hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-brand-muted block mb-1">Condition Grade:</label>
                <select
                  value={copyCondition}
                  onChange={(e) => setCopyCondition(e.target.value)}
                  className="w-full p-2 bg-[#111111] border border-brand-border text-brand-paper"
                >
                  <option value="Mint">Mint (Collector Grade)</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good (Reading Copy)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCopyModalOpen(false)}
                  className="flex-1 py-2 bg-[#222222] border border-brand-border text-brand-paper font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    adminAddCopy(selectedBookForCopy.id, copyCondition);
                    setCopyModalOpen(false);
                  }}
                  className="flex-1 py-2 bg-brand-purple text-white font-black uppercase border border-black hover:bg-white hover:text-black transition"
                >
                  Add Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
