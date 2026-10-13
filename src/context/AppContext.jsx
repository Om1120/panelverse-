import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SEED_BOOKS,
  SEED_AUTHORS,
  SEED_GENRES,
  SEED_SERIES,
  SEED_USERS,
  SEED_REVIEWS,
  SEED_BORROWINGS,
  SEED_RESERVATIONS,
  SEED_NOTIFICATIONS
} from '../data/seedData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Books state with localStorage persistence
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_books');
      return saved ? JSON.parse(saved) : SEED_BOOKS;
    } catch {
      return SEED_BOOKS;
    }
  });

  // Authors state
  const [authors, setAuthors] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_authors');
      return saved ? JSON.parse(saved) : SEED_AUTHORS;
    } catch {
      return SEED_AUTHORS;
    }
  });

  // Genres & Series
  const [genres] = useState(SEED_GENRES);
  const [series] = useState(SEED_SERIES);

  // Authentication state (Default to Alex Rider for rich testable experience, toggleable to guest or admin)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_current_user');
      return saved ? JSON.parse(saved) : SEED_USERS[0]; // Alex Rider
    } catch {
      return SEED_USERS[0];
    }
  });

  // Reading progress state: { [bookId]: { currentPage, progressPercentage, completed, lastReadAt } }
  const [readingProgress, setReadingProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_reading_progress');
      return saved ? JSON.parse(saved) : {
        'pv-001': { currentPage: 3, progressPercentage: 38, completed: false, lastReadAt: '2024-03-24T18:00:00Z' }
      };
    } catch {
      return {};
    }
  });

  // Wishlist state: array of book IDs
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_wishlist');
      return saved ? JSON.parse(saved) : ['pv-001', 'pv-002'];
    } catch {
      return ['pv-001', 'pv-002'];
    }
  });

  // Borrowings state
  const [borrowings, setBorrowings] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_borrowings');
      return saved ? JSON.parse(saved) : SEED_BORROWINGS;
    } catch {
      return SEED_BORROWINGS;
    }
  });

  // Reservations state
  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_reservations');
      return saved ? JSON.parse(saved) : SEED_RESERVATIONS;
    } catch {
      return SEED_RESERVATIONS;
    }
  });

  // Reviews state
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_reviews');
      return saved ? JSON.parse(saved) : SEED_REVIEWS;
    } catch {
      return SEED_REVIEWS;
    }
  });

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_notifications');
      return saved ? JSON.parse(saved) : SEED_NOTIFICATIONS;
    } catch {
      return SEED_NOTIFICATIONS;
    }
  });

  // Search modal state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('pv_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('pv_authors', JSON.stringify(authors));
  }, [authors]);

  useEffect(() => {
    localStorage.setItem('pv_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('pv_reading_progress', JSON.stringify(readingProgress));
  }, [readingProgress]);

  useEffect(() => {
    localStorage.setItem('pv_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('pv_borrowings', JSON.stringify(borrowings));
  }, [borrowings]);

  useEffect(() => {
    localStorage.setItem('pv_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('pv_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('pv_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast notification helper
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auth actions
  const login = (role = 'user', email = null, name = null) => {
    if (role === 'admin') {
      const adminUser = SEED_USERS[1];
      setCurrentUser(adminUser);
      showToast('Logged in as Curator Admin: Vesper', 'success');
      return adminUser;
    } else {
      const regularUser = email ? {
        id: `u-${Date.now().toString().slice(-4)}`,
        email,
        displayName: name || email.split('@')[0],
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        preferredGenres: ['Sci-Fi & Cyberpunk', 'Manga & Shonen'],
        createdAt: new Date().toISOString()
      } : SEED_USERS[0];
      setCurrentUser(regularUser);
      showToast(`Welcome back, ${regularUser.displayName}!`, 'success');
      return regularUser;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out of Panelverse account (Guest mode active)', 'info');
  };

  const switchUserRole = (role) => {
    if (role === 'admin') {
      setCurrentUser(SEED_USERS[1]);
      showToast('Switched to Admin Curator role', 'success');
    } else if (role === 'user') {
      setCurrentUser(SEED_USERS[0]);
      showToast('Switched to Reader Alex Rider role', 'success');
    } else {
      setCurrentUser(null);
      showToast('Switched to Guest mode', 'info');
    }
  };

  // Reading progress actions
  const saveReadingProgress = (bookId, page, totalPages, chapter = null) => {
    const progressPct = Math.min(100, Math.round((page / totalPages) * 100));
    const completed = page >= totalPages;
    const update = {
      currentPage: page,
      progressPercentage: progressPct,
      completed,
      chapter: chapter || null,
      lastReadAt: new Date().toISOString()
    };

    setReadingProgress(prev => ({
      ...prev,
      [bookId]: update
    }));
  };

  const getReadingProgress = (bookId) => {
    return readingProgress[bookId] || null;
  };

  // Wishlist actions
  const toggleWishlist = (bookId) => {
    setWishlist(prev => {
      const exists = prev.includes(bookId);
      if (exists) {
        showToast('Removed title from your Wishlist', 'info');
        return prev.filter(id => id !== bookId);
      } else {
        showToast('Added title to your Universe Wishlist!', 'success');
        return [...prev, bookId];
      }
    });
  };

  const isInWishlist = (bookId) => {
    return wishlist.includes(bookId);
  };

  // Borrowing actions
  const requestBorrow = (bookId, copyId = null) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return { success: false, message: 'Book not found' };

    // Find available copy
    const availableCopy = copyId 
      ? book.physicalInventory?.copies?.find(c => c.id === copyId && c.status === 'AVAILABLE')
      : book.physicalInventory?.copies?.find(c => c.status === 'AVAILABLE');

    if (!availableCopy) {
      return { success: false, message: 'No available physical copy to borrow right now.' };
    }

    const newBorrowing = {
      id: `bw-${Date.now().toString().slice(-4)}`,
      userId: currentUser ? currentUser.id : 'guest-user',
      userName: currentUser ? currentUser.displayName : 'Guest Reader',
      bookId: book.id,
      bookTitle: book.title,
      bookCover: book.coverImage,
      copyId: availableCopy.id,
      copyNumber: availableCopy.copyNumber,
      barcode: availableCopy.barcode,
      requestDate: new Date().toISOString().split('T')[0],
      approvalDate: null,
      issueDate: null,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      returnDate: null,
      status: 'REQUESTED',
      fineAmount: 0
    };

    // Update book copy status to RESERVED / REQUESTED in book inventory
    setBooks(prevBooks => prevBooks.map(b => {
      if (b.id !== bookId) return b;
      const updatedCopies = b.physicalInventory.copies.map(c => 
        c.id === availableCopy.id ? { ...c, status: 'RESERVED' } : c
      );
      const availableCount = updatedCopies.filter(c => c.status === 'AVAILABLE').length;
      return {
        ...b,
        physicalInventory: {
          ...b.physicalInventory,
          availableCopies: availableCount,
          copies: updatedCopies
        }
      };
    }));

    setBorrowings(prev => [newBorrowing, ...prev]);

    // Add user notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      userId: currentUser ? currentUser.id : 'guest-user',
      type: 'borrowing',
      title: 'Borrow Request Submitted',
      message: `Your request for "${book.title}" (${availableCopy.copyNumber}) is pending review.`,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Borrow request submitted for ${book.title}!`, 'success');
    return { success: true, borrowing: newBorrowing };
  };

  const cancelBorrow = (borrowingId) => {
    const borrowing = borrowings.find(b => b.id === borrowingId);
    if (!borrowing) return;

    // Release copy back to AVAILABLE if it was pending or requested
    if (['REQUESTED', 'APPROVED'].includes(borrowing.status)) {
      setBooks(prevBooks => prevBooks.map(b => {
        if (b.id !== borrowing.bookId) return b;
        const updatedCopies = b.physicalInventory.copies.map(c => 
          c.id === borrowing.copyId ? { ...c, status: 'AVAILABLE' } : c
        );
        const availableCount = updatedCopies.filter(c => c.status === 'AVAILABLE').length;
        return {
          ...b,
          physicalInventory: {
            ...b.physicalInventory,
            availableCopies: availableCount,
            copies: updatedCopies
          }
        };
      }));
    }

    setBorrowings(prev => prev.map(b => 
      b.id === borrowingId ? { ...b, status: 'CANCELLED' } : b
    ));

    showToast('Borrowing request cancelled', 'info');
  };

  const adminUpdateBorrowStatus = (borrowingId, newStatus) => {
    const borrowing = borrowings.find(b => b.id === borrowingId);
    if (!borrowing) return;

    setBorrowings(prev => prev.map(b => {
      if (b.id !== borrowingId) return b;
      const today = new Date().toISOString().split('T')[0];
      return {
        ...b,
        status: newStatus,
        approvalDate: newStatus === 'APPROVED' ? today : b.approvalDate,
        issueDate: newStatus === 'ISSUED' ? today : b.issueDate,
        returnDate: newStatus === 'RETURNED' ? today : b.returnDate
      };
    }));

    // Update book copy inventory status accordingly
    setBooks(prevBooks => prevBooks.map(b => {
      if (b.id !== borrowing.bookId) return b;
      let targetCopyStatus = 'AVAILABLE';
      if (newStatus === 'ISSUED') targetCopyStatus = 'LOANED';
      else if (newStatus === 'APPROVED' || newStatus === 'REQUESTED') targetCopyStatus = 'RESERVED';
      else if (newStatus === 'RETURNED' || newStatus === 'REJECTED' || newStatus === 'CANCELLED') targetCopyStatus = 'AVAILABLE';

      const updatedCopies = b.physicalInventory.copies.map(c => 
        c.id === borrowing.copyId ? { ...c, status: targetCopyStatus } : c
      );
      const availableCount = updatedCopies.filter(c => c.status === 'AVAILABLE').length;
      return {
        ...b,
        physicalInventory: {
          ...b.physicalInventory,
          availableCopies: availableCount,
          copies: updatedCopies
        }
      };
    }));

    showToast(`Borrowing #${borrowingId} updated to ${newStatus}`, 'success');
  };

  // Reservation actions
  const reserveBook = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return { success: false, message: 'Book not found' };

    // Calculate queue position
    const existingQueue = reservations.filter(r => r.bookId === bookId && r.status === 'WAITING');
    const newReservation = {
      id: `res-${Date.now().toString().slice(-4)}`,
      userId: currentUser ? currentUser.id : 'guest-user',
      userName: currentUser ? currentUser.displayName : 'Guest Reader',
      bookId: book.id,
      bookTitle: book.title,
      bookCover: book.coverImage,
      queuePosition: existingQueue.length + 1,
      createdAt: new Date().toISOString(),
      status: 'WAITING',
      notifiedAt: null
    };

    setReservations(prev => [newReservation, ...prev]);
    showToast(`Reserved ${book.title}! You are #${newReservation.queuePosition} in queue.`, 'success');
    return { success: true, reservation: newReservation };
  };

  const cancelReservation = (reservationId) => {
    setReservations(prev => prev.map(r => 
      r.id === reservationId ? { ...r, status: 'CANCELLED' } : r
    ));
    showToast('Reservation cancelled', 'info');
  };

  // Review actions
  const addReview = (bookId, rating, comment) => {
    if (!comment || comment.trim().length < 5) {
      showToast('Review comment must be at least 5 characters.', 'error');
      return { success: false };
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      bookId,
      userId: currentUser ? currentUser.id : 'guest-user',
      userName: currentUser ? currentUser.displayName : 'Anonymous Reader',
      userAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date().toISOString()
    };

    setReviews(prev => [newRev, ...prev]);

    // Recalculate book rating
    setBooks(prevBooks => prevBooks.map(b => {
      if (b.id !== bookId) return b;
      const allBookReviews = [newRev, ...reviews.filter(r => r.bookId === bookId)];
      const avg = Number((allBookReviews.reduce((acc, r) => acc + r.rating, 0) / allBookReviews.length).toFixed(1));
      return {
        ...b,
        rating: avg,
        reviewCount: allBookReviews.length
      };
    }));

    showToast('Review published to the universe!', 'success');
    return { success: true };
  };

  const deleteReview = (reviewId) => {
    const rev = reviews.find(r => r.id === reviewId);
    if (!rev) return;
    setReviews(prev => prev.filter(r => r.id !== reviewId));

    // Recalculate book rating
    setBooks(prevBooks => prevBooks.map(b => {
      if (b.id !== rev.bookId) return b;
      const remaining = reviews.filter(r => r.bookId === rev.bookId && r.id !== reviewId);
      const avg = remaining.length ? Number((remaining.reduce((acc, r) => acc + r.rating, 0) / remaining.length).toFixed(1)) : 5.0;
      return {
        ...b,
        rating: avg,
        reviewCount: remaining.length
      };
    }));

    showToast('Review deleted', 'info');
  };

  // Admin CRUD for Books
  const adminAddBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: `pv-${(books.length + 1).toString().padStart(3, '0')}`,
      slug: (bookData.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      status: 'active',
      digitalPages: bookData.digitalPages || [
        {
          pageNumber: 1,
          title: `${bookData.title} - Page 1`,
          imageUrl: bookData.coverImage || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
          panels: [{ id: 'p1', caption: 'THE STORY BEGINS HERE.', dialogue: [] }]
        }
      ],
      physicalInventory: bookData.physicalInventory || {
        totalCopies: 1,
        availableCopies: 1,
        copies: [
          { id: `c-${Date.now()}-1`, copyNumber: '#01', barcode: `PV-${Date.now().toString().slice(-4)}`, condition: 'Mint', status: 'AVAILABLE' }
        ]
      }
    };

    setBooks(prev => [newBook, ...prev]);
    showToast(`Added "${newBook.title}" to catalogue!`, 'success');
    return newBook;
  };

  const adminUpdateBook = (id, fields) => {
    setBooks(prev => prev.map(b => (b.id === id ? { ...b, ...fields } : b)));
    showToast('Book updated successfully!', 'success');
  };

  const adminDeleteBook = (id) => {
    const book = books.find(b => b.id === id);
    setBooks(prev => prev.filter(b => b.id !== id));
    showToast(`Deleted "${book?.title || id}" from catalogue`, 'info');
  };

  // Admin Physical Copy management
  const adminAddCopy = (bookId, condition = 'Mint') => {
    setBooks(prev => prev.map(b => {
      if (b.id !== bookId) return b;
      const copies = b.physicalInventory?.copies || [];
      const newCopyNum = `#${(copies.length + 1).toString().padStart(2, '0')}`;
      const newCopy = {
        id: `c-${Date.now().toString().slice(-4)}`,
        copyNumber: newCopyNum,
        barcode: `${b.id.toUpperCase()}-${Date.now().toString().slice(-4)}`,
        condition,
        status: 'AVAILABLE'
      };
      const updatedCopies = [...copies, newCopy];
      return {
        ...b,
        physicalInventory: {
          totalCopies: updatedCopies.length,
          availableCopies: updatedCopies.filter(c => c.status === 'AVAILABLE').length,
          copies: updatedCopies
        }
      };
    }));
    showToast('New physical copy added!', 'success');
  };

  const adminUpdateCopyStatus = (bookId, copyId, newStatus) => {
    setBooks(prev => prev.map(b => {
      if (b.id !== bookId) return b;
      const copies = b.physicalInventory?.copies || [];
      const updatedCopies = copies.map(c => c.id === copyId ? { ...c, status: newStatus } : c);
      return {
        ...b,
        physicalInventory: {
          ...b.physicalInventory,
          availableCopies: updatedCopies.filter(c => c.status === 'AVAILABLE').length,
          copies: updatedCopies
        }
      };
    }));
    showToast(`Copy status updated to ${newStatus}`, 'success');
  };

  // Reset to default seed data
  const resetToDefaultData = () => {
    localStorage.clear();
    setBooks(SEED_BOOKS);
    setAuthors(SEED_AUTHORS);
    setCurrentUser(SEED_USERS[0]);
    setReadingProgress({
      'pv-001': { currentPage: 3, progressPercentage: 38, completed: false, lastReadAt: '2024-03-24T18:00:00Z' }
    });
    setWishlist(['pv-001', 'pv-002']);
    setBorrowings(SEED_BORROWINGS);
    setReservations(SEED_RESERVATIONS);
    setReviews(SEED_REVIEWS);
    setNotifications(SEED_NOTIFICATIONS);
    showToast('Reset all application data to default demo state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        books,
        authors,
        genres,
        series,
        currentUser,
        readingProgress,
        wishlist,
        borrowings,
        reservations,
        reviews,
        notifications,
        searchModalOpen,
        toastMessage,
        setSearchModalOpen,
        showToast,
        login,
        logout,
        switchUserRole,
        saveReadingProgress,
        getReadingProgress,
        toggleWishlist,
        isInWishlist,
        requestBorrow,
        cancelBorrow,
        adminUpdateBorrowStatus,
        reserveBook,
        cancelReservation,
        addReview,
        deleteReview,
        adminAddBook,
        adminUpdateBook,
        adminDeleteBook,
        adminAddCopy,
        adminUpdateCopyStatus,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
