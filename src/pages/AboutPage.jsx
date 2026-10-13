import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, PackageCheck, Zap, Shield, Heart } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-comic text-brand-yellow text-lg uppercase tracking-wider bg-black px-3 py-1 border border-brand-yellow inline-block rotate-[-2deg]">
          THE MANIFESTO
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-brand-paper uppercase tracking-tight leading-none">
          COMICS BELONG TO <span className="text-brand-yellow">EVERYONE.</span>
        </h1>
        <p className="text-base text-brand-muted leading-relaxed">
          Stories should be easier to discover, explore, and enjoy. We built Panelverse to merge digital accessibility with the tactile joy of real print.
        </p>
      </div>

      {/* Manifesto Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-[#191919] border-2 border-brand-yellow shadow-brutal-yellow space-y-4">
          <BookOpen className="w-8 h-8 text-brand-yellow" />
          <h2 className="font-display font-black text-2xl text-brand-paper uppercase">
            100% Free Digital Reading
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed font-sans">
            No mandatory subscriptions. No microtransaction paywalls for sample chapters. Readers can browse, read single or spread pages, flip through vertical webtoons, and save their reading progress seamlessly across sessions.
          </p>
        </div>

        <div className="p-8 bg-[#191919] border-2 border-brand-purple shadow-brutal-purple space-y-4">
          <PackageCheck className="w-8 h-8 text-brand-purple" />
          <h2 className="font-display font-black text-2xl text-brand-paper uppercase">
            Physical Collector Loans
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed font-sans">
            Digital is convenient, but nothing replaces the tactile smell of high-grade paper and oversized print. We maintain physical collector copies of available books with transparent condition grading and a 14-day checkout window.
          </p>
        </div>
      </div>

      {/* Culture Values */}
      <div className="bg-[#141414] border-2 border-brand-border p-8 sm:p-10 space-y-6">
        <h3 className="font-display font-black text-2xl text-brand-paper uppercase text-center">
          CORE PRODUCT VALUES
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <span className="font-display font-black text-xl text-brand-yellow block">01 / GEN Z ENERGY</span>
            <p className="text-xs text-brand-muted leading-relaxed">
              Neo-comic brutalism, oversized typography, and raw graffiti textures instead of sanitized corporate SaaS templates.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-display font-black text-xl text-brand-purple block">02 / INDIE SPOTLIGHT</span>
            <p className="text-xs text-brand-muted leading-relaxed">
              Independent mangaka and self-published zine creators are prioritized alongside blockbuster superhero universes.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-display font-black text-xl text-brand-green block">03 / OPEN CURATION</span>
            <p className="text-xs text-brand-muted leading-relaxed">
              Open catalog metadata, live inventory statuses, and honest community ratings by passionate readers.
            </p>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="text-center pt-4">
        <Link
          to="/books"
          className="px-8 py-3.5 bg-brand-yellow text-black font-black uppercase text-xs tracking-wider border-2 border-black shadow-brutal-white hover:bg-white transition inline-block"
        >
          Enter The Multiverse Shelf →
        </Link>
      </div>

    </div>
  );
};
