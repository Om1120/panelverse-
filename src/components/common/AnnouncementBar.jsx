import React, { useState } from 'react';
import { Sparkles, Pause, Play } from 'lucide-react';

export const AnnouncementBar = () => {
  const [isPaused, setIsPaused] = useState(false);

  const messages = [
    "⚡ FREE DIGITAL READING. INFINITE POSSIBILITIES.",
    "🔥 YOUR NEXT OBSESSION STARTS HERE.",
    "📚 PHYSICAL COMIC & MANGA BORROWING NOW ACTIVE.",
    "💥 NEW DROP: CYBERPUNK ZERO FINAL REVISION IS LIVE.",
    "⚡ FLIP PAGES. BREAK REALITY. WELCOME TO PANELVERSE."
  ];

  return (
    <div className="bg-brand-yellow text-black border-b-2 border-black py-1.5 px-4 text-xs font-black uppercase tracking-wider relative overflow-hidden select-none z-30">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mr-4 shrink-0 font-display">
          <span className="bg-black text-brand-yellow px-1.5 py-0.5 text-[10px] tracking-widest font-black">
            BROADCAST
          </span>
        </div>

        <div 
          className="flex-1 overflow-hidden relative"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
        >
          <div 
            className={`flex whitespace-nowrap gap-12 font-bold ${isPaused ? '' : 'animate-marquee'}`}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {messages.concat(messages).map((msg, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                {msg}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Resume ticker" : "Pause ticker"}
          className="ml-4 shrink-0 p-1 hover:bg-black hover:text-brand-yellow transition border border-black text-black"
          title={isPaused ? "Play marquee" : "Pause marquee"}
        >
          {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
