import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, BookOpen, PackageCheck, Zap, ArrowRight } from 'lucide-react';

export const OffersPage = () => {
  const campaigns = [
    {
      id: 'c1',
      tag: 'READING FESTIVAL',
      title: 'CYBERPUNK ZERO SAGA MARATHON',
      desc: 'All 3 issues of Protocol 9, Synaptic Bleed, and Null Vector unlocked with bonus production storyboards.',
      color: '#DFFF00',
      action: 'Read Protocol Saga',
      link: '/series/series-01'
    },
    {
      id: 'c2',
      tag: 'PHYSICAL LENDING CAMPAIGN',
      title: 'ZERO-FINE PHYSICAL BORROWING EXPANSION',
      desc: 'Our physical lending catalog now features mint collector editions of Kaiju Breaker and The Hollow Kingdom with 14-day checkout windows.',
      color: '#8B5CF6',
      action: 'Explore Physical Copies',
      link: '/borrow'
    },
    {
      id: 'c3',
      tag: 'NEW DROP SPOTLIGHT',
      title: 'THE CHRONO-DRIFTER ISSUE #01 PREMIERE',
      desc: 'New temporal detective manga drop by Santiago Reyes. Features full right-to-left layout and high-contrast ink.',
      color: '#00F0FF',
      action: 'Read Issue #01 Now',
      link: '/read/pv-010'
    },
    {
      id: 'c4',
      tag: 'INDIE SPOTLIGHT',
      title: 'UNDERGROUND RADICAL ZINE COLLECTIVE',
      desc: 'Discover self-published zines from Tokyo, Berlin, and Mexico City. Free digital access for the entire community.',
      color: '#B7FF3C',
      action: 'Browse Indie Titles',
      link: '/books?type=indie'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="border-b-4 border-brand-yellow pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-yellow text-black text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          EDITORIAL CAMPAIGNS & SPOTLIGHTS
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase tracking-tight">
          DROPS & <span className="text-brand-yellow">INITIATIVES.</span>
        </h1>
        <p className="text-sm text-brand-muted mt-2 max-w-xl">
          Seasonal reading festivals, free drop marathons, and physical collector borrowing highlights.
        </p>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((camp) => (
          <div 
            key={camp.id}
            className="p-6 sm:p-8 bg-[#191919] border-2 border-brand-border hover:border-brand-yellow shadow-brutal-dark transition flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <span 
                className="px-2.5 py-0.5 text-black font-black uppercase text-[10px] tracking-wider inline-block"
                style={{ backgroundColor: camp.color }}
              >
                {camp.tag}
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-paper uppercase leading-tight">
                {camp.title}
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed font-sans">
                {camp.desc}
              </p>
            </div>

            <Link
              to={camp.link}
              className="py-3 px-6 bg-[#222222] hover:bg-brand-yellow hover:text-black text-brand-paper font-black uppercase text-xs tracking-wider border border-brand-border transition flex items-center justify-between"
            >
              <span>{camp.action}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};
