import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Eye, EyeOff, User, Lock, ArrowRight, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const { login, currentUser, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = location.pathname.includes('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please provide both email and password', 'error');
      return;
    }
    if (isRegister && !displayName) {
      showToast('Display name is required for registration', 'error');
      return;
    }

    login('user', email, displayName);
    navigate('/dashboard');
  };

  const handleQuickDemoLogin = (role) => {
    login(role);
    if (role === 'admin') navigate('/admin');
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg-primary text-brand-paper py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#191919] border-2 border-brand-yellow shadow-brutal-yellow p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-brand-yellow text-black border-2 border-black flex items-center justify-center font-comic text-2xl mx-auto shadow-brutal-dark">
            P
          </div>
          <h1 className="font-comic text-3xl sm:text-4xl text-brand-paper">
            {isRegister ? 'ENTER THE UNIVERSE.' : 'WELCOME BACK.'}
          </h1>
          <p className="text-xs text-brand-muted">
            {isRegister ? 'Create your reader identity to bookmark issues and borrow IRL.' : 'Log in to continue reading from your last saved bookmark.'}
          </p>
        </div>

        {/* Quick Demo Credentials Box */}
        <div className="bg-[#111111] border border-brand-border p-3 text-xs space-y-2">
          <span className="font-black uppercase text-[10px] text-brand-yellow block">
            ⚡ ONE-CLICK DEMO AUTHENTICATION
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('user')}
              className="bg-[#222222] hover:bg-brand-yellow hover:text-black border border-brand-border p-2 text-center transition font-bold"
            >
              Reader (Alex)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="bg-[#222222] hover:bg-brand-purple hover:text-white border border-brand-border p-2 text-center transition font-bold"
            >
              Curator (Admin)
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">
                Display Name / Tag *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-muted absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. CyberVigilante99"
                  className="w-full bg-[#111111] border border-brand-border p-2 pl-9 text-brand-paper focus:outline-none focus:border-brand-yellow"
                  required={isRegister}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reader@panelverse.io"
              className="w-full bg-[#111111] border border-brand-border p-2 text-brand-paper focus:outline-none focus:border-brand-yellow"
              required
            />
          </div>

          <div>
            <label className="block font-black uppercase text-[10px] text-brand-muted mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#111111] border border-brand-border p-2 pr-9 text-brand-paper focus:outline-none focus:border-brand-yellow"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-brand-muted hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full comic-btn-yellow py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>{isRegister ? 'REGISTER PROFILE' : 'SIGN IN'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="text-center text-xs text-brand-muted pt-2 border-t border-brand-border">
          {isRegister ? (
            <p>
              Already an active operative?{' '}
              <Link to="/login" className="text-brand-yellow font-bold hover:underline">
                Sign in here
              </Link>
            </p>
          ) : (
            <p>
              Need a new reader passport?{' '}
              <Link to="/register" className="text-brand-yellow font-bold hover:underline">
                Create account
              </Link>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
