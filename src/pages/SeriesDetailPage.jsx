import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ComicCard } from '../components/books/ComicCard';
import { ArrowLeft, BookOpen, Layers, Play } from 'lucide-react';

export const SeriesDetailPage = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const { series, books } = useApp();

  const currentSeries = series.find(s => s.id === seriesId);

  if (!currentSeries) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display font-black text-2xl text-brand-paper">SERIES ARC NOT FOUND</h2>
        <Link to="/series" className="px-4 py-2 bg-brand-yellow text-black font-black uppercase text-xs inline-block">
          Return to Series
        </Link>
      </div>
    );
  }

  const seriesBooks = currentSeries.readingOrder
    ? currentSeries.readingOrder.map(id => books.find(b => b.id === id)).filter(Boolean)
    : books.filter(b => currentSeries.bookIds?.includes(b.id));

  const firstIssue = seriesBooks[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      <Link 
        to="/series"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-muted hover:text-brand-cyan transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to All Series
      </Link>

      {/* Series Banner */}
      <div className="bg-[#191919] border-2 border-brand-cyan p-6 sm:p-8 shadow-brutal-dark">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="px-2.5 py-0.5 bg-brand-cyan text-black text-xs font-black uppercase">
              {currentSeries.genre}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase tracking-tight">
              {currentSeries.name}
            </h1>
            <p className="text-xs font-bold text-brand-muted">
              By <strong className="text-brand-paper">{currentSeries.creatorName}</strong> • Canonical Reading Order
            </p>
            <p className="text-sm text-brand-paper/90 max-w-2xl leading-relaxed">
              {currentSeries.description}
            </p>

            {firstIssue && (
              <div className="pt-2">
                <button
                  onClick={() => navigate(`/read/${firstIssue.id}`)}
                  className="px-6 py-3 bg-brand-cyan text-black font-black uppercase text-xs tracking-wider border-2 border-black shadow-brutal-dark hover:bg-white transition flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-black" />
                  Start From Issue #1 ({firstIssue.title})
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-4">
            <div className="aspect-video bg-black border-2 border-brand-border overflow-hidden">
              <img src={currentSeries.coverImage} alt={currentSeries.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Issues in Chronological / Reading Order */}
      <div className="space-y-6">
        <div className="border-b-2 border-brand-border pb-3 flex items-center justify-between">
          <h2 className="font-display font-black text-2xl text-brand-paper uppercase">
            Issues in Reading Order ({seriesBooks.length})
          </h2>
          <span className="text-xs text-brand-muted font-bold">
            Read online free in sequence
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {seriesBooks.map((book, idx) => (
            <div key={book.id} className="relative">
              <div className="absolute -top-2.5 -left-2.5 z-20 bg-brand-cyan text-black font-comic text-xs px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                #0{idx + 1}
              </div>
              <ComicCard book={book} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
