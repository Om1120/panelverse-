import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, User, Ghost, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react';

export const DemoRoleBanner = () => {
  const { currentUser, switchUserRole, resetToDefaultData } = useApp();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="fixed bottom-3 left-3 z-40 max-w-xs font-sans">
      <div className="bg-[#141414] border-2 border-brand-yellow shadow-brutal-dark p-2 text-xs text-brand-paper">
        <div 
          className="flex items-center justify-between cursor-pointer select-none"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
            <span className="font-black uppercase tracking-wider text-[11px] text-brand-yellow">
              ROLE: {currentUser ? currentUser.role.toUpperCase() : 'GUEST'}
            </span>
          </div>
          <button 
            className="p-0.5 hover:text-brand-yellow text-brand-muted"
            aria-label={collapsed ? "Expand role switcher" : "Collapse role switcher"}
          >
            {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {!collapsed && (
          <div className="mt-2 pt-2 border-t border-brand-border space-y-2 animate-in fade-in">
            <p className="text-[10px] text-brand-muted">
              Active: <strong className="text-white">{currentUser?.displayName || 'Guest Reader'}</strong>
            </p>

            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => switchUserRole('user')}
                className={`py-1 text-[10px] font-bold border flex flex-col items-center justify-center gap-0.5 transition ${
                  currentUser?.role === 'user' ? 'bg-brand-yellow text-black border-black font-black' : 'border-brand-border text-brand-muted hover:text-white'
                }`}
                title="Test as regular reader Alex"
              >
                <User className="w-3 h-3" />
                Reader
              </button>
              <button
                onClick={() => switchUserRole('admin')}
                className={`py-1 text-[10px] font-bold border flex flex-col items-center justify-center gap-0.5 transition ${
                  currentUser?.role === 'admin' ? 'bg-brand-red text-white border-black font-black' : 'border-brand-border text-brand-muted hover:text-white'
                }`}
                title="Test as Curator Admin Vesper"
              >
                <Shield className="w-3 h-3" />
                Admin
              </button>
              <button
                onClick={() => switchUserRole('guest')}
                className={`py-1 text-[10px] font-bold border flex flex-col items-center justify-center gap-0.5 transition ${
                  !currentUser ? 'bg-brand-paper text-black border-black font-black' : 'border-brand-border text-brand-muted hover:text-white'
                }`}
                title="Test as unauthenticated guest"
              >
                <Ghost className="w-3 h-3" />
                Guest
              </button>
            </div>

            <button
              onClick={resetToDefaultData}
              className="w-full mt-1 py-1 text-[10px] font-bold bg-[#1e1e1e] border border-brand-border text-brand-muted hover:text-brand-yellow hover:border-brand-yellow flex items-center justify-center gap-1 transition"
              title="Reset all localStorage data back to default seed"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Demo Seed Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
