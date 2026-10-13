import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout & Common Components
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { SearchModal } from './components/common/SearchModal';
import { Toast } from './components/common/Toast';
import { DemoRoleBanner } from './components/common/DemoRoleBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { ReaderPage } from './pages/ReaderPage';
import { CharactersPage } from './pages/CharactersPage';
import { AuthorsPage } from './pages/AuthorsPage';
import { AuthorDetailPage } from './pages/AuthorDetailPage';
import { GenresPage } from './pages/GenresPage';
import { SeriesPage } from './pages/SeriesPage';
import { SeriesDetailPage } from './pages/SeriesDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { MyLibraryPage } from './pages/MyLibraryPage';
import { BorrowPage } from './pages/BorrowPage';
import { MyBorrowingsPage } from './pages/MyBorrowingsPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { AuthPage } from './pages/AuthPage';
import { OffersPage } from './pages/OffersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isReaderRoute = location.pathname.startsWith('/read/');

  return (
    <div className="min-h-screen bg-bg-primary text-brand-paper selection:bg-brand-yellow selection:text-black flex flex-col font-sans">
      <ScrollToTop />
      
      {/* Search Modal (Global) */}
      <SearchModal />

      {/* Global Toast Alerts */}
      <Toast />

      {/* Floating Interactive Role Switcher Pill */}
      <DemoRoleBanner />

      {/* When inside reader mode, hide global announcement bar, header, and footer for distraction-free reading */}
      {!isReaderRoute && <AnnouncementBar />}
      {!isReaderRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<DiscoverPage />} />
          <Route path="/books/:bookId" element={<BookDetailPage />} />
          <Route path="/read/:bookId" element={<ReaderPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:characterId" element={<CharactersPage />} />
          
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/authors/:authorId" element={<AuthorDetailPage />} />
          
          <Route path="/genres" element={<GenresPage />} />
          
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/series/:seriesId" element={<SeriesDetailPage />} />
          
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my-library" element={<MyLibraryPage />} />
          
          <Route path="/borrow" element={<BorrowPage />} />
          <Route path="/my-borrowings" element={<MyBorrowingsPage />} />
          
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<DashboardPage />} />
          
          <Route path="/admin" element={<AdminPage />} />
          
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/register" element={<AuthPage initialMode="register" />} />
          
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isReaderRoute && <Footer />}
    </div>
  );
}
