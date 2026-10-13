import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Shield, User, Lock, Mail, Sparkles, ArrowRight, Check } from 'lucide-react';

export const AuthPage = ({ initialMode = 'login' }) => {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, currentUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login('user', email, displayName);
    navigate('/dashboard');
  };

  const handleDemoLogin = (role) => {
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-brand-yellow text-black flex items-center justify-center font-comic text-3xl font-black border-2 border-black mx-auto shadow-brutal-dark">
          P
        </div>
        <h1 className="font-display font-black text-3xl uppercase tracking-tight text-brand-paper">
          {isRegister ? 'JOIN THE PANELVERSE' : 'ACCESS YOUR UNIVERSE'}
        </h1>
        <p className="text-xs text-brand-muted">
          {isRegister ? 'Create your free account to sync reading progress across devices' : 'Enter your credentials or choose a quick demo role below'}
        </p>
      </div>

      {/* Main Auth Box */}
      <div className="bg-[#191919] border-2 border-brand-yellow shadow-brutal-yellow p-6 sm:p-8 space-y-6">
        
        {/* Instant Demo Role Quick Jump */}
        <div className="p-3 bg-[#111111] border border-brand-border space-y-2 text-xs">
          <span className="font-black text-brand-yellow uppercase text-[10px] block">
            DEMO SIMULATION ONE-CLICK ACCESS:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              className="p-2 bg-[#222222] hover:bg-brand-yellow hover:text-black font-bold border border-brand-border text-brand-paper transition text-left flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Alex (Reader)</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="p-2 bg-[#222222] hover:bg-brand-red hover:text-white font-bold border border-brand-border text-brand-paper transition text-left flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-brand-red" />
              <span>Vesper (Admin)</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="font-bold uppercase text-brand-muted block mb-1">Display Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input
                  required
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. NeoReader99"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold uppercase text-brand-muted block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@panelverse.io"
                className="w-full pl-9 pr-3 py-2.5 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold uppercase text-brand-muted block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-12 py-2.5 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-brand-muted hover:text-white"
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-yellow text-black font-black uppercase text-xs tracking-wider border-2 border-black hover:bg-white transition flex items-center justify-center gap-2 shadow-brutal-dark"
          >
            <span>{isRegister ? 'Create Panelverse Account' : 'Sign In to Universe'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-brand-border text-xs text-brand-muted">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsRegister(false)} className="text-brand-yellow font-bold hover:underline">
                Sign in here
              </button>
            </p>
          ) : (
            <p>
              New multiversal traveler?{' '}
              <button onClick={() => setIsRegister(true)} className="text-brand-yellow font-bold hover:underline">
                Create free account
              </button>
            </p>
          )}
        </div>
      </div>

    </div>
  );
};
