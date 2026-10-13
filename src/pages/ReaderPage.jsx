import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEMO_COMICS } from '../data/demoComics';
import { DEMO_COMIC_VINE_ISSUES } from '../data/demoComicVine';
import { formatComicVineIssue } from '../services/comicVineApi';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Maximize, Minimize, 
  ZoomIn, ZoomOut, RotateCcw, Columns, Smartphone, BookOpen, 
  Sliders, Settings, Sparkles, CheckCircle, Flame
} from 'lucide-react';

export const ReaderPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { books, getReadingProgress, saveReadingProgress, showToast } = useApp();

  const cleanCvId = String(bookId).replace('cv-', '');
  const matchedCv = DEMO_COMIC_VINE_ISSUES.find(c => String(c.id) === cleanCvId);

  const book = books.find(b => String(b.id) === String(bookId)) || 
               DEMO_COMICS.find(c => String(c.id) === String(bookId) || String(c.marvelId) === String(bookId)) ||
               (matchedCv ? formatComicVineIssue(matchedCv) : null);
  
  const rawPages = book?.digitalPages || (book?.samplePages ? book.samplePages.map((sp, idx) => ({
    pageNumber: sp.pageNumber || idx + 1,
    title: sp.title || `${book.title} - Page ${idx + 1}`,
    imageUrl: sp.imageUrl || book.coverImage,
    panels: [
      {
        id: `p-${idx}-1`,
        caption: sp.caption || `PANEL SEQUENCE 0${idx + 1}`,
        dialogue: sp.dialogue || [{ character: 'HERO', text: `Sample dialogue for ${book.title}` }]
      }
    ]
  })) : [
    {
      pageNumber: 1,
      title: `${book?.title || 'Comic'} - Preview Page 1`,
      imageUrl: book?.coverImage || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      panels: [
        {
          id: 'p-1',
          caption: 'THE MULTIVERSE COLLIDES IN HIGH CONTRAST.',
          dialogue: [
            { character: 'HERO', text: 'Hold the frequency! The archive is stabilizing!' }
          ]
        }
      ]
    },
    {
      pageNumber: 2,
      title: `${book?.title || 'Comic'} - Preview Page 2`,
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      panels: [
        {
          id: 'p-2',
          caption: 'KRAAA-KOOOOM!',
          dialogue: [
            { character: 'ALLIES', text: 'The issue is fully loaded in Panelverse!' }
          ]
        }
      ]
    }
  ]);

  const pages = rawPages;
  const totalPages = pages.length || 2;

  // Saved progress resume on initial load
  const savedProgress = getReadingProgress(bookId);
  const initialPage = savedProgress ? savedProgress.currentPage : 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [layoutMode, setLayoutMode] = useState('single'); // 'single' | 'spread' | 'vertical'
  const [readingDirection, setReadingDirection] = useState(book?.readingDirection || 'ltr'); // 'ltr' | 'rtl'
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const containerRef = useRef(null);

  // Sync reading progress whenever page changes
  useEffect(() => {
    if (bookId && totalPages > 0) {
      saveReadingProgress(bookId, currentPage, totalPages);
      if (currentPage === totalPages) {
        showToast(`🎉 Issue Completed! You finished "${book?.title}".`, 'success');
      }
    }
  }, [bookId, currentPage, totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        readingDirection === 'rtl' ? goToPrevPage() : goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        readingDirection === 'rtl' ? goToNextPage() : goToPrevPage();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen?.();
          setIsFullscreen(false);
        } else {
          navigate(`/books/${bookId}`);
        }
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, readingDirection, isFullscreen]);

  if (!book) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-brand-yellow font-display">BOOK NOT FOUND</h2>
          <Link to="/books" className="px-4 py-2 bg-brand-yellow text-black font-black uppercase text-xs inline-block">
            Back to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const goToNextPage = () => {
    if (layoutMode === 'spread') {
      setCurrentPage(prev => Math.min(totalPages, prev + 2));
    } else {
      setCurrentPage(prev => Math.min(totalPages, prev + 1));
    }
  };

  const goToPrevPage = () => {
    if (layoutMode === 'spread') {
      setCurrentPage(prev => Math.max(1, prev - 2));
    } else {
      setCurrentPage(prev => Math.max(1, prev - 1));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const progressPercentage = Math.round((currentPage / totalPages) * 100);

  // Active page data
  const page1 = pages[currentPage - 1] || { pageNumber: currentPage, title: `Page ${currentPage}`, imageUrl: book.coverImage, panels: [] };
  const page2 = layoutMode === 'spread' && currentPage < totalPages ? (pages[currentPage] || null) : null;

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#0a0a0a] text-brand-paper flex flex-col select-none relative"
    >
      
      {/* TOP HEADER CONTROLS */}
      <header className={`sticky top-0 z-40 bg-[#111111]/95 backdrop-blur border-b-2 border-brand-border px-4 py-2.5 flex items-center justify-between transition-opacity ${controlsVisible ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
        <div className="flex items-center gap-3">
          <Link
            to={`/books/${book.id}`}
            className="p-1.5 hover:text-brand-yellow text-brand-muted border border-brand-border hover:border-brand-yellow transition"
            title="Exit Reader"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-display font-black text-xs sm:text-sm text-brand-paper truncate max-w-xs sm:max-w-md">
              {book.title}
            </h1>
            <p className="text-[10px] text-brand-muted">
              {readingDirection === 'rtl' ? 'Manga Mode (Right-to-Left)' : 'Standard Comic (Left-to-Right)'} • {book.genres?.[0]}
            </p>
          </div>
        </div>

        {/* Center Progress Scrubber */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-brand-yellow">
            {currentPage} / {totalPages}
          </span>
          <div className="w-32 h-2 bg-[#222222] border border-brand-border overflow-hidden">
            <div 
              className="h-full bg-brand-yellow transition-all duration-200" 
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>
          <span className="text-[10px] text-brand-muted font-mono">{progressPercentage}%</span>
        </div>

        {/* Right Layout & View Controls */}
        <div className="flex items-center gap-1.5">
          
          {/* Layout Mode Selector */}
          <div className="flex bg-[#1c1c1c] border border-brand-border p-0.5 text-xs">
            <button
              onClick={() => setLayoutMode('single')}
              className={`p-1.5 transition ${layoutMode === 'single' ? 'bg-brand-yellow text-black' : 'text-brand-muted hover:text-white'}`}
              title="Single Page Mode"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutMode('spread')}
              className={`p-1.5 transition hidden md:block ${layoutMode === 'spread' ? 'bg-brand-yellow text-black' : 'text-brand-muted hover:text-white'}`}
              title="Two-Page Spread Mode"
            >
              <Columns className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutMode('vertical')}
              className={`p-1.5 transition ${layoutMode === 'vertical' ? 'bg-brand-yellow text-black' : 'text-brand-muted hover:text-white'}`}
              title="Vertical Webtoon Scroll Mode"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reading Direction Toggle */}
          <button
            onClick={() => setReadingDirection(prev => prev === 'rtl' ? 'ltr' : 'rtl')}
            className={`px-2 py-1 text-[10px] font-black uppercase border transition ${readingDirection === 'rtl' ? 'bg-brand-cyan text-black border-black' : 'bg-[#1c1c1c] border-brand-border text-brand-muted hover:text-white'}`}
            title="Toggle LTR / RTL Manga Reading Direction"
          >
            {readingDirection === 'rtl' ? 'RTL' : 'LTR'}
          </button>

          {/* Zoom Controls (for single / spread) */}
          {layoutMode !== 'vertical' && (
            <div className="hidden lg:flex items-center gap-1 bg-[#1c1c1c] border border-brand-border p-0.5">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                className="p-1 hover:text-brand-yellow text-brand-muted" 
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono font-bold px-1 text-brand-paper">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                className="p-1 hover:text-brand-yellow text-brand-muted" 
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 bg-[#1c1c1c] border border-brand-border hover:border-brand-yellow text-brand-muted hover:text-brand-yellow transition"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* READING CANVAS */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-auto relative">
        
        {/* Previous Page Click Zone (Left in LTR, Right in RTL) */}
        {layoutMode !== 'vertical' && (
          <>
            <button
              onClick={readingDirection === 'rtl' ? goToNextPage : goToPrevPage}
              disabled={readingDirection === 'rtl' ? currentPage >= totalPages : currentPage <= 1}
              className="absolute left-2 sm:left-6 z-20 p-2 sm:p-3 bg-black/80 hover:bg-brand-yellow hover:text-black border-2 border-brand-border hover:border-black text-brand-paper disabled:opacity-20 transition shadow-brutal-dark"
              title="Previous Page (Left Arrow)"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={readingDirection === 'rtl' ? goToPrevPage : goToNextPage}
              disabled={readingDirection === 'rtl' ? currentPage <= 1 : currentPage >= totalPages}
              className="absolute right-2 sm:right-6 z-20 p-2 sm:p-3 bg-black/80 hover:bg-brand-yellow hover:text-black border-2 border-brand-border hover:border-black text-brand-paper disabled:opacity-20 transition shadow-brutal-dark"
              title="Next Page (Right Arrow)"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Content Render by Mode */}
        {layoutMode === 'vertical' ? (
          /* VERTICAL SCROLL MODE (WEBTOON STYLE) */
          <div className="max-w-2xl w-full mx-auto space-y-4 py-8">
            {pages.map((p, idx) => (
              <div 
                key={p.pageNumber} 
                className="bg-[#141414] border-2 border-brand-border shadow-brutal-dark overflow-hidden"
              >
                <div className="relative aspect-[2/3] bg-black">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-black/90 px-2 py-0.5 text-[10px] font-mono text-brand-yellow border border-brand-border">
                    PAGE {p.pageNumber} / {totalPages}
                  </div>
                </div>

                {/* Rendered Comic Panels & Speech Bubbles */}
                {p.panels && p.panels.length > 0 && (
                  <div className="p-4 bg-[#181818] border-t-2 border-brand-border space-y-3">
                    {p.panels.map((panel) => (
                      <div key={panel.id} className="space-y-2">
                        {panel.caption && (
                          <div className="inline-block bg-brand-yellow text-black font-black uppercase text-[10px] px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                            {panel.caption}
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {panel.dialogue?.map((d, dIdx) => (
                            <div key={dIdx} className="speech-bubble text-xs">
                              <span className="font-black text-brand-purple uppercase mr-1">{d.character}:</span>
                              {d.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* SINGLE OR SPREAD MODE */
          <div 
            className="flex items-center justify-center gap-4 transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
          >
            {/* Page 1 */}
            <div className="w-[320px] sm:w-[460px] md:w-[520px] bg-[#141414] border-4 border-brand-border shadow-brutal-dark flex flex-col overflow-hidden">
              <div className="relative aspect-[2/3] bg-black">
                <img 
                  src={page1.imageUrl} 
                  alt={page1.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-2 left-2 bg-black/90 px-2 py-0.5 text-[10px] font-mono text-brand-yellow border border-brand-border">
                  PAGE {page1.pageNumber} OF {totalPages}
                </div>
              </div>

              {/* Comic Narrative Panels & Dialogue */}
              {page1.panels && page1.panels.length > 0 && (
                <div className="p-3 sm:p-4 bg-[#181818] border-t-2 border-brand-border space-y-2">
                  {page1.panels.map((panel) => (
                    <div key={panel.id} className="space-y-1.5">
                      {panel.caption && (
                        <div className="inline-block bg-brand-yellow text-black font-black uppercase text-[10px] px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                          {panel.caption}
                        </div>
                      )}
                      <div className="space-y-1">
                        {panel.dialogue?.map((d, dIdx) => (
                          <div key={dIdx} className="speech-bubble text-xs">
                            <span className="font-black text-brand-purple uppercase mr-1">{d.character}:</span>
                            {d.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Page 2 (if Two-page spread mode) */}
            {layoutMode === 'spread' && page2 && (
              <div className="w-[320px] sm:w-[460px] md:w-[520px] bg-[#141414] border-4 border-brand-border shadow-brutal-dark flex flex-col overflow-hidden hidden md:flex">
                <div className="relative aspect-[2/3] bg-black">
                  <img 
                    src={page2.imageUrl} 
                    alt={page2.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 left-2 bg-black/90 px-2 py-0.5 text-[10px] font-mono text-brand-yellow border border-brand-border">
                    PAGE {page2.pageNumber} OF {totalPages}
                  </div>
                </div>

                {page2.panels && page2.panels.length > 0 && (
                  <div className="p-3 sm:p-4 bg-[#181818] border-t-2 border-brand-border space-y-2">
                    {page2.panels.map((panel) => (
                      <div key={panel.id} className="space-y-1.5">
                        {panel.caption && (
                          <div className="inline-block bg-brand-purple text-white font-black uppercase text-[10px] px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                            {panel.caption}
                          </div>
                        )}
                        <div className="space-y-1">
                          {panel.dialogue?.map((d, dIdx) => (
                            <div key={dIdx} className="speech-bubble text-xs">
                              <span className="font-black text-brand-yellow uppercase mr-1">{d.character}:</span>
                              {d.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* BOTTOM READER FOOTER CONTROLS */}
      <footer className="sticky bottom-0 z-40 bg-[#111111]/95 backdrop-blur border-t-2 border-brand-border px-4 py-2 flex items-center justify-between text-xs font-bold">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setControlsVisible(!controlsVisible)}
            className="p-1 hover:text-brand-yellow text-brand-muted"
            title="Toggle Controls Visibility"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
          <span className="text-brand-muted text-[11px] hidden sm:inline">
            Use <kbd className="px-1 py-0.5 bg-black border border-brand-border">←</kbd> <kbd className="px-1 py-0.5 bg-black border border-brand-border">→</kbd> to turn pages
          </span>
        </div>

        {/* Page selector */}
        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase font-bold text-brand-muted hidden sm:inline">Jump to:</label>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="bg-[#1c1c1c] border border-brand-border text-brand-paper px-2 py-1 text-xs font-mono font-bold focus:outline-none"
          >
            {pages.map((p) => (
              <option key={p.pageNumber} value={p.pageNumber}>
                Page {p.pageNumber} / {totalPages}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/books/${book.id}`)}
            className="text-brand-yellow hover:underline text-[11px] font-bold"
          >
            Exit Reader →
          </button>
        </div>
      </footer>

    </div>
  );
};
