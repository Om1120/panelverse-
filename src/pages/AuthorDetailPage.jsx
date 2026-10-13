import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ComicCard } from '../components/books/ComicCard';
import { ArrowLeft, BookOpen, Globe, Award, Sparkles } from 'lucide-react';

export const AuthorDetailPage = () => {
  const { authorId } = useParams();
  const { authors, books } = useApp();

  const author = authors.find(a => a.id === authorId || a.slug === authorId);

  if (!author) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display font-black text-2xl text-brand-paper">CREATOR NOT FOUND</h2>
        <Link to="/authors" className="px-4 py-2 bg-brand-yellow text-black font-black uppercase text-xs inline-block">
          Return to Creators
        </Link>
      </div>
    );
  }

  const creatorBooks = books.filter(b => author.bookIds?.includes(b.id) || b.creators?.includes(author.name));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      <Link 
        to="/authors"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-muted hover:text-brand-purple transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to All Creators
      </Link>

      {/* Creator Profile Header */}
      <div className="bg-[#191919] border-2 border-brand-purple p-6 sm:p-10 shadow-brutal-purple">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full border-4 border-brand-purple shadow-brutal-dark shrink-0"
          />
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {author.roles.map((r) => (
                <span key={r} className="px-2.5 py-0.5 bg-black text-brand-yellow text-xs font-black uppercase border border-brand-border">
                  {r}
                </span>
              ))}
              <span className="text-xs text-brand-muted flex items-center gap-1 font-bold">
                <Globe className="w-3.5 h-3.5" /> {author.country}
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase tracking-tight">
              {author.name}
            </h1>

            <p className="text-sm text-brand-muted leading-relaxed font-sans max-w-3xl">
              {author.biography}
            </p>
          </div>
        </div>
      </div>

      {/* Works Catalogue */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-brand-border pb-3">
          <h2 className="font-display font-black text-2xl text-brand-paper uppercase">
            Titles by {author.name} ({creatorBooks.length})
          </h2>
          <span className="text-xs text-brand-muted font-bold">
            All Free to Read Online
          </span>
        </div>

        {creatorBooks.length === 0 ? (
          <p className="text-sm text-brand-muted italic py-8 text-center">
            No published issues catalogued yet for this creator.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {creatorBooks.map((book) => (
              <ComicCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
