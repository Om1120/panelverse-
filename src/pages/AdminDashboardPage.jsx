import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Plus, Trash2, Edit3, BookOpen, User, 
  Layers, CheckCircle, AlertCircle, Clock, RefreshCw, X, Check, Save 
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { 
    books, 
    authors, 
    genres, 
    series, 
    borrowings, 
    reservations, 
    reviews,
    adminAddBook, 
    adminUpdateBook, 
    adminDeleteBook, 
    adminAddCopy, 
    adminUpdateCopyStatus, 
    adminUpdateBorrowStatus, 
    deleteReview, 
    resetToDefaultData, 
    currentUser, 
    switchUserRole,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('books'); // 'books', 'inventory', 'borrowings', 'reservations', 'reviews'

  // Book Create / Edit Modal State
  const [editingBook, setEditingBook] = useState(null); // null = none, 'new' = creating, or book object
  const [bookForm, setBookForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    coverImage: '',
    creators: '',
    genres: 'Sci-Fi & Cyberpunk',
    isbn: '',
    publisher: 'Radical Circuit Press',
    publicationDate: new Date().toISOString().split('T')[0],
    pageCount: 32,
    readingDirection: 'ltr',
    digitalAvailability: true,
    physicalBorrowingEnabled: true
  });

  // Calculate live operational metrics from real data
  const totalPhysicalCopies = books.reduce((acc, b) => acc + (b.physicalInventory?.copies?.length || 0), 0);
  const totalAvailableCopies = books.reduce((acc, b) => acc + (b.physicalInventory?.availableCopies || 0), 0);
  const pendingRequests = borrowings.filter(b => b.status === 'REQUESTED');
  const issuedLoans = borrowings.filter(b => b.status === 'ISSUED');
  const activeReservationsCount = reservations.filter(r => r.status === 'WAITING').length;

  const handleOpenAddBook = () => {
    setBookForm({
      title: '',
      subtitle: '',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      creators: 'Kaelen Voss',
      genres: 'Sci-Fi & Cyberpunk',
      isbn: '978-1-9882-0199-9',
      publisher: 'Radical Circuit Press',
      publicationDate: new Date().toISOString().split('T')[0],
      pageCount: 36,
      readingDirection: 'ltr',
      digitalAvailability: true,
      physicalBorrowingEnabled: true
    });
    setEditingBook('new');
  };

  const handleOpenEditBook = (book) => {
    setBookForm({
      title: book.title,
      subtitle: book.subtitle || '',
      description: book.description,
      coverImage: book.coverImage,
      creators: book.creators?.join(', ') || '',
      genres: book.genres?.[0] || 'Sci-Fi & Cyberpunk',
      isbn: book.isbn || '',
      publisher: book.publisher || 'Radical Circuit Press',
      publicationDate: book.publicationDate || '',
      pageCount: book.pageCount || 32,
      readingDirection: book.readingDirection || 'ltr',
      digitalAvailability: book.digitalAvailability !== false,
      physicalBorrowingEnabled: book.physicalBorrowingEnabled !== false
    });
    setEditingBook(book);
  };

  const handleSaveBook = (e) => {
    e.preventDefault();
    if (!bookForm.title.trim()) {
      showToast('Book title is required', 'error');
      return;
    }

    const payload = {
      ...bookForm,
      creators: bookForm.creators.split(',').map(c => c.trim()).filter(Boolean),
      genres: [bookForm.genres]
    };

    if (editingBook === 'new') {
      adminAddBook(payload);
    } else {
      adminUpdateBook(editingBook.id, payload);
    }

    setEditingBook(null);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-brand-paper py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Admin Header */}
      <div className="bg-[#181818] border-2 border-brand-purple shadow-brutal-purple p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-brand-purple text-white font-black text-[10px] uppercase px-2 py-0.5 border border-black">
                CURATOR PORTAL // LIVE DATA
              </span>
              <span className="text-xs text-brand-yellow font-mono">PANELVERSE-SYSTEM-v1.0</span>
            </div>
            <h1 className="font-comic text-4xl sm:text-5xl text-brand-paper">
              COMMAND CENTER & ARCHIVES.
            </h1>
            <p className="text-xs text-brand-muted mt-1 font-medium">
              Real-time CRUD operations on books, vault copies, borrowing requests, reservations and user reviews.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAddBook}
              className="comic-btn-yellow px-4 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>NEW COMIC RELEASE</span>
            </button>
            <button
              onClick={resetToDefaultData}
              className="comic-btn-dark px-3 py-2.5 text-xs font-bold text-brand-muted hover:text-white"
              title="Reset sample seed data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Operational Metrics Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-brand-border">
          <div className="bg-[#111111] p-3 border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-brand-muted">Titles in Shelf</span>
            <p className="font-comic text-2xl text-brand-paper mt-0.5">{books.length}</p>
          </div>
          <div className="bg-[#111111] p-3 border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-brand-muted">Physical Copies</span>
            <p className="font-comic text-2xl text-brand-green mt-0.5">{totalPhysicalCopies}</p>
          </div>
          <div className="bg-[#111111] p-3 border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-brand-muted">Available in Vault</span>
            <p className="font-comic text-2xl text-brand-yellow mt-0.5">{totalAvailableCopies}</p>
          </div>
          <div className="bg-[#111111] p-3 border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-brand-muted">Pending Requests</span>
            <p className="font-comic text-2xl text-brand-red mt-0.5">{pendingRequests.length}</p>
          </div>
          <div className="bg-[#111111] p-3 border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-brand-muted">Active Loans</span>
            <p className="font-comic text-2xl text-brand-cyan mt-0.5">{issuedLoans.length}</p>
          </div>
          <div className="bg-[#111111] p-3 border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-brand-muted">In Waiting Queue</span>
            <p className="font-comic text-2xl text-brand-purple mt-0.5">{activeReservationsCount}</p>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b-2 border-brand-border bg-[#161616] text-xs font-black uppercase overflow-x-auto">
        <button
          onClick={() => setActiveTab('books')}
          className={`px-5 py-3 border-b-2 transition ${activeTab === 'books' ? 'border-brand-purple text-brand-purple bg-[#202020]' : 'border-transparent text-brand-muted hover:text-white'}`}
        >
          Book Catalogue ({books.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-5 py-3 border-b-2 transition ${activeTab === 'inventory' ? 'border-brand-green text-brand-green bg-[#202020]' : 'border-transparent text-brand-muted hover:text-white'}`}
        >
          Vault Copy Inventory ({totalPhysicalCopies})
        </button>
        <button
          onClick={() => setActiveTab('borrowings')}
          className={`px-5 py-3 border-b-2 transition ${activeTab === 'borrowings' ? 'border-brand-yellow text-brand-yellow bg-[#202020]' : 'border-transparent text-brand-muted hover:text-white'}`}
        >
          Borrowing Requests ({borrowings.length})
        </button>
        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-5 py-3 border-b-2 transition ${activeTab === 'reservations' ? 'border-brand-red text-brand-red bg-[#202020]' : 'border-transparent text-brand-muted hover:text-white'}`}
        >
          Queue Reservations ({reservations.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-5 py-3 border-b-2 transition ${activeTab === 'reviews' ? 'border-brand-cyan text-brand-cyan bg-[#202020]' : 'border-transparent text-brand-muted hover:text-white'}`}
        >
          Reviews Moderation ({reviews.length})
        </button>
      </div>

      {/* TAB 1: BOOKS CATALOGUE TABLE */}
      {activeTab === 'books' && (
        <div className="bg-[#191919] border-2 border-brand-border overflow-x-auto shadow-brutal-dark">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111111] border-b-2 border-brand-border text-[11px] font-black uppercase text-brand-yellow">
              <tr>
                <th className="p-3.5">Cover & Title</th>
                <th className="p-3.5">Creators</th>
                <th className="p-3.5">Genre</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5">Digital</th>
                <th className="p-3.5">Physical Stock</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border font-medium">
              {books.map(b => (
                <tr key={b.id} className="hover:bg-[#202020] transition">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img src={b.coverImage} alt={b.title} className="w-8 h-12 object-cover border border-black shrink-0" />
                      <div>
                        <Link to={`/books/${b.id}`} className="font-bold text-brand-paper hover:text-brand-yellow">
                          {b.title}
                        </Link>
                        <p className="text-[10px] text-brand-muted font-mono">{b.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-brand-muted truncate max-w-[150px]">{b.creators?.join(', ')}</td>
                  <td className="p-3.5 text-brand-paper">{b.genres?.[0]}</td>
                  <td className="p-3.5 font-bold text-brand-yellow">★ {b.rating} ({b.reviewCount})</td>
                  <td className="p-3.5">
                    <span className={`px-1.5 py-0.5 text-[9px] font-black uppercase border ${b.digitalAvailability ? 'bg-brand-yellow/20 text-brand-yellow border-brand-yellow' : 'bg-brand-red/20 text-brand-red border-brand-red'}`}>
                      {b.digitalAvailability ? 'FREE READ' : 'LOCKED'}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-brand-green">
                      {b.physicalInventory?.availableCopies || 0} / {b.physicalInventory?.totalCopies || 0} Copies
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditBook(b)}
                      className="p-1 hover:text-brand-yellow text-brand-muted"
                      title="Edit book"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${b.title}"?`)) {
                          adminDeleteBook(b.id);
                        }
                      }}
                      className="p-1 hover:text-brand-red text-brand-muted"
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
      )}

      {/* TAB 2: PHYSICAL INVENTORY & COPIES */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {books.filter(b => b.physicalBorrowingEnabled).map(b => (
              <div key={b.id} className="bg-[#191919] border-2 border-brand-green p-4 shadow-brutal-dark space-y-3">
                <div className="flex items-center justify-between border-b border-brand-border pb-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img src={b.coverImage} alt={b.title} className="w-8 h-10 object-cover border border-black shrink-0" />
                    <h4 className="font-bold text-xs text-brand-paper truncate">{b.title}</h4>
                  </div>
                  <button
                    onClick={() => adminAddCopy(b.id, 'Mint')}
                    className="comic-btn-yellow px-2 py-1 text-[10px] font-black uppercase shrink-0"
                  >
                    + ADD COPY
                  </button>
                </div>

                <div className="space-y-1.5 text-xs">
                  {b.physicalInventory?.copies?.map(copy => (
                    <div key={copy.id} className="flex items-center justify-between bg-[#111111] p-2 border border-brand-border">
                      <div>
                        <span className="font-bold text-brand-paper mr-2">{copy.copyNumber}</span>
                        <span className="font-mono text-[10px] text-brand-yellow mr-2">{copy.barcode}</span>
                        <span className="text-[10px] text-brand-muted">({copy.condition})</span>
                      </div>

                      <select
                        value={copy.status}
                        onChange={(e) => adminUpdateCopyStatus(b.id, copy.id, e.target.value)}
                        className={`text-[10px] font-black uppercase py-0.5 px-2 border bg-black ${
                          copy.status === 'AVAILABLE' ? 'text-brand-green border-brand-green' :
                          copy.status === 'LOANED' ? 'text-brand-red border-brand-red' :
                          copy.status === 'RESERVED' ? 'text-brand-yellow border-brand-yellow' :
                          'text-brand-muted border-brand-border'
                        }`}
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="LOANED">LOANED</option>
                        <option value="RESERVED">RESERVED</option>
                        <option value="MAINTENANCE">MAINTENANCE</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BORROWING REQUESTS APPROVAL & ISSUANCE */}
      {activeTab === 'borrowings' && (
        <div className="bg-[#191919] border-2 border-brand-border overflow-x-auto shadow-brutal-dark">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111111] border-b-2 border-brand-border text-[11px] font-black uppercase text-brand-yellow">
              <tr>
                <th className="p-3.5">Loan ID</th>
                <th className="p-3.5">Reader</th>
                <th className="p-3.5">Book Title</th>
                <th className="p-3.5">Copy Code</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Current Status</th>
                <th className="p-3.5 text-right">Update Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border font-medium">
              {borrowings.map(b => (
                <tr key={b.id} className="hover:bg-[#202020] transition">
                  <td className="p-3.5 font-mono text-brand-yellow">{b.id}</td>
                  <td className="p-3.5 font-bold">{b.userName}</td>
                  <td className="p-3.5 text-brand-paper">{b.bookTitle}</td>
                  <td className="p-3.5 font-mono">{b.copyNumber} ({b.barcode})</td>
                  <td className="p-3.5">{b.dueDate}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[#111111] border border-brand-border">
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-1.5">
                    {b.status === 'REQUESTED' && (
                      <button
                        onClick={() => adminUpdateBorrowStatus(b.id, 'APPROVED')}
                        className="px-2 py-1 bg-brand-yellow text-black font-black text-[10px] uppercase"
                      >
                        Approve
                      </button>
                    )}
                    {(b.status === 'APPROVED' || b.status === 'REQUESTED') && (
                      <button
                        onClick={() => adminUpdateBorrowStatus(b.id, 'ISSUED')}
                        className="px-2 py-1 bg-brand-green text-black font-black text-[10px] uppercase"
                      >
                        Issue Copy
                      </button>
                    )}
                    {b.status === 'ISSUED' && (
                      <button
                        onClick={() => adminUpdateBorrowStatus(b.id, 'RETURNED')}
                        className="px-2 py-1 bg-[#333333] text-white hover:bg-brand-paper hover:text-black font-bold text-[10px] uppercase"
                      >
                        Mark Returned
                      </button>
                    )}
                    {['REQUESTED', 'APPROVED'].includes(b.status) && (
                      <button
                        onClick={() => adminUpdateBorrowStatus(b.id, 'REJECTED')}
                        className="px-2 py-1 text-brand-red hover:underline text-[10px] font-bold"
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
      )}

      {/* TAB 4: RESERVATIONS QUEUE */}
      {activeTab === 'reservations' && (
        <div className="bg-[#191919] border-2 border-brand-border overflow-x-auto shadow-brutal-dark">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111111] border-b-2 border-brand-border text-[11px] font-black uppercase text-brand-yellow">
              <tr>
                <th className="p-3.5">Queue ID</th>
                <th className="p-3.5">Position</th>
                <th className="p-3.5">Book Title</th>
                <th className="p-3.5">Reader</th>
                <th className="p-3.5">Reserved Timestamp</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border font-medium">
              {reservations.map(r => (
                <tr key={r.id} className="hover:bg-[#202020] transition">
                  <td className="p-3.5 font-mono text-brand-yellow">{r.id}</td>
                  <td className="p-3.5 font-black text-brand-green text-sm">#{r.queuePosition}</td>
                  <td className="p-3.5 font-bold text-brand-paper">{r.bookTitle}</td>
                  <td className="p-3.5">{r.userName}</td>
                  <td className="p-3.5 text-brand-muted">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="p-3.5 font-bold text-brand-yellow uppercase">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: REVIEWS MODERATION */}
      {activeTab === 'reviews' && (
        <div className="space-y-3">
          {reviews.map(rev => {
            const revBook = books.find(b => b.id === rev.bookId);
            return (
              <div key={rev.id} className="bg-[#191919] border border-brand-border p-4 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand-yellow">{rev.userName}</span>
                    <span className="text-[10px] text-brand-muted">on <strong>{revBook?.title || rev.bookId}</strong></span>
                    <span className="text-brand-yellow text-xs font-bold">★ {rev.rating}</span>
                  </div>
                  <p className="text-xs text-brand-paper font-sans">{rev.comment}</p>
                  <p className="text-[10px] text-brand-muted">{new Date(rev.createdAt).toLocaleString()}</p>
                </div>

                <button
                  onClick={() => deleteReview(rev.id)}
                  className="comic-btn-dark px-3 py-1 text-xs text-brand-red border-brand-red hover:bg-brand-red hover:text-white shrink-0"
                >
                  Remove Review
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Book Create / Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#191919] border-2 border-brand-yellow shadow-brutal-yellow text-brand-paper overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between bg-[#111111] border-b-2 border-brand-border px-5 py-3.5">
              <h3 className="font-display font-black text-sm uppercase tracking-wider text-brand-yellow">
                {editingBook === 'new' ? 'CREATE NEW CATALOGUE ISSUE' : `EDIT: ${editingBook.title}`}
              </h3>
              <button onClick={() => setEditingBook(null)} className="p-1 text-brand-muted hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBook} className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">Title *</label>
                  <input
                    type="text"
                    value={bookForm.title}
                    onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                    className="w-full bg-[#111111] border border-brand-border p-2 text-brand-paper focus:outline-none focus:border-brand-yellow"
                    required
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={bookForm.subtitle}
                    onChange={(e) => setBookForm({ ...bookForm, subtitle: e.target.value })}
                    className="w-full bg-[#111111] border border-brand-border p-2 text-brand-paper focus:outline-none focus:border-brand-yellow"
                  />
                </div>
              </div>

              <div>
                <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">Description / Synopsis *</label>
                <textarea
                  value={bookForm.description}
                  onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                  rows={3}
                  className="w-full bg-[#111111] border border-brand-border p-2 text-brand-paper focus:outline-none focus:border-brand-yellow"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    value={bookForm.coverImage}
                    onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.value })}
                    className="w-full bg-[#111111] border border-brand-border p-2 text-brand-paper focus:outline-none focus:border-brand-yellow"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">Creators (comma-separated)</label>
                  <input
                    type="text"
                    value={bookForm.creators}
                    onChange={(e) => setBookForm({ ...bookForm, creators: e.target.value })}
                    className="w-full bg-[#111111] border border-brand-border p-2 text-brand-paper focus:outline-none focus:border-brand-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">Genre</label>
                  <select
                    value={bookForm.genres}
                    onChange={(e) => setBookForm({ ...bookForm, genres: e.target.value })}
                    className="w-full bg-[#111111] border border-brand-border p-2 text-brand-paper"
                  >
                    {genres.map(g => (
                      <option key={g.id} value={g.name}>{g.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">Reading Direction</label>
                  <select
                    value={bookForm.readingDirection}
                    onChange={(e) => setBookForm({ ...bookForm, readingDirection: e.target.value })}
                    className="w-full bg-[#111111] border border-brand-border p-2 text-brand-paper"
                  >
                    <option value="ltr">Left to Right (Comic)</option>
                    <option value="rtl">Right to Left (Manga)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">Pages</label>
                  <input
                    type="number"
                    value={bookForm.pageCount}
                    onChange={(e) => setBookForm({ ...bookForm, pageCount: Number(e.target.value) })}
                    className="w-full bg-[#111111] border border-brand-border p-2 text-brand-paper"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">ISBN</label>
                  <input
                    type="text"
                    value={bookForm.isbn}
                    onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
                    className="w-full bg-[#111111] border border-brand-border p-2 text-brand-paper"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="comic-btn-dark px-4 py-2 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="comic-btn-yellow px-5 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE CHANGES</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
