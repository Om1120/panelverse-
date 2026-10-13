import React, { useState, useEffect } from 'react';
import { 
  Key, Shield, AlertTriangle, ExternalLink, CheckCircle, 
  RotateCcw, X, Sparkles, Terminal, Layers, Globe
} from 'lucide-react';
import { getMarvelCredentials, setMarvelCredentials } from '../../services/marvelApi';
import { getComicVineApiKey, setComicVineApiKey } from '../../services/comicVineApi';
import { getActiveProvider, setActiveProvider } from '../../services/comicService';
import { useApp } from '../../context/AppContext';

export const ApiKeyModal = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('marvel'); // 'marvel' | 'comicvine' | 'provider'
  
  // Marvel Credentials
  const [marvelPublicKey, setMarvelPublicKey] = useState('');
  const [marvelPrivateKey, setMarvelPrivateKey] = useState('');

  // Comic Vine Credentials
  const [comicVineKey, setComicVineKey] = useState('');

  // Active Provider
  const [provider, setProvider] = useState('marvel');

  useEffect(() => {
    if (isOpen) {
      const marvelCreds = getMarvelCredentials();
      setMarvelPublicKey(marvelCreds.publicKey);
      setMarvelPrivateKey(marvelCreds.privateKey);

      setComicVineKey(getComicVineApiKey());
      setProvider(getActiveProvider());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setMarvelCredentials(marvelPublicKey, marvelPrivateKey);
    setComicVineApiKey(comicVineKey);
    setActiveProvider(provider);

    showToast('API credentials & Provider preferences saved locally!', 'success');
    onClose();
    window.dispatchEvent(new Event('marvel-auth-changed'));
    window.dispatchEvent(new Event('comic-provider-changed'));
  };

  const handleResetToDemo = () => {
    setMarvelPublicKey('');
    setMarvelPrivateKey('');
    setComicVineKey('');
    setMarvelCredentials('', '');
    setComicVineApiKey('');
    setActiveProvider('marvel');
    setProvider('marvel');

    showToast('Reset to Curated Multiverse Demo Archive', 'info');
    onClose();
    window.dispatchEvent(new Event('marvel-auth-changed'));
    window.dispatchEvent(new Event('comic-provider-changed'));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Comic Dialog Card */}
      <div 
        className="relative w-full max-w-2xl bg-[#151519] border-4 border-black shadow-[8px_8px_0px_#ED1D24] p-6 sm:p-8 text-[#F5F0E8] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="api-modal-title"
      >
        {/* Ben-Day dots accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-comic-dots opacity-20 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-black text-[#F5F0E8] hover:bg-[#ED1D24] border-2 border-black transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-[#ED1D24] border-2 border-black shadow-[2px_2px_0px_#000]">
            <Globe className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-comic text-xs uppercase tracking-widest text-[#FFD400] bg-black px-2 py-0.5 border border-neutral-700">
                MULTIVERSE API GATEWAYS
              </span>
            </div>
            <h2 id="api-modal-title" className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
              MARVEL & COMIC VINE INTEGRATION
            </h2>
          </div>
        </div>

        {/* Security & Client-Side Notice */}
        <div className="p-3 bg-black/60 border-2 border-neutral-800 mb-5 text-xs text-neutral-300 flex items-start gap-2">
          <Shield className="w-4 h-4 text-[#FFD400] shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Client-Side Storage Only:</strong> All API keys are saved strictly in your browser session (<code className="text-[#FFD400]">LocalStorage</code>). No credentials ever leave your browser.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 border-b-2 border-black pb-3 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('marvel')}
            className={`px-3 py-1.5 font-comic text-xs uppercase tracking-wider border-2 transition ${
              activeTab === 'marvel'
                ? 'bg-[#ED1D24] text-white border-black shadow-[2px_2px_0px_#000]'
                : 'bg-black text-neutral-400 border-neutral-700 hover:text-white'
            }`}
          >
            ⚡ Marvel Developer API
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('comicvine')}
            className={`px-3 py-1.5 font-comic text-xs uppercase tracking-wider border-2 transition ${
              activeTab === 'comicvine'
                ? 'bg-[#1769FF] text-white border-black shadow-[2px_2px_0px_#000]'
                : 'bg-black text-neutral-400 border-neutral-700 hover:text-white'
            }`}
          >
            🍇 Comic Vine API
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('provider')}
            className={`px-3 py-1.5 font-comic text-xs uppercase tracking-wider border-2 transition ${
              activeTab === 'provider'
                ? 'bg-[#FFD400] text-black border-black shadow-[2px_2px_0px_#000] font-bold'
                : 'bg-black text-neutral-400 border-neutral-700 hover:text-white'
            }`}
          >
            ⚙️ Active Provider
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-4">
          
          {/* TAB 1: MARVEL DEVELOPER API */}
          {activeTab === 'marvel' && (
            <div className="space-y-4">
              <div>
                <label className="block font-comic text-xs tracking-wider uppercase text-[#FFD400] mb-1">
                  Marvel Public Key (API Key)
                </label>
                <input
                  type="text"
                  value={marvelPublicKey}
                  onChange={(e) => setMarvelPublicKey(e.target.value)}
                  placeholder="e.g. 1a2b3c4d5e6f7g8h9i0..."
                  className="w-full px-3.5 py-2.5 bg-black border-2 border-neutral-700 focus:border-[#ED1D24] text-white font-mono text-xs outline-none transition"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Obtain your free key at{' '}
                  <a 
                    href="https://developer.marvel.com/account" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#1769FF] hover:underline inline-flex items-center gap-0.5 font-bold"
                  >
                    developer.marvel.com <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>

              <div>
                <label className="block font-comic text-xs tracking-wider uppercase text-neutral-300 mb-1">
                  Marvel Private Key (Optional for Browser MD5 Signing)
                </label>
                <input
                  type="password"
                  value={marvelPrivateKey}
                  onChange={(e) => setMarvelPrivateKey(e.target.value)}
                  placeholder="Optional private signing key..."
                  className="w-full px-3.5 py-2.5 bg-black border-2 border-neutral-700 focus:border-[#ED1D24] text-white font-mono text-xs outline-none transition"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Used purely client-side to compute <code className="text-[#FFD400] bg-neutral-900 px-1">md5(ts + privateKey + publicKey)</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: COMIC VINE API */}
          {activeTab === 'comicvine' && (
            <div className="space-y-4">
              <div>
                <label className="block font-comic text-xs tracking-wider uppercase text-[#FFD400] mb-1">
                  Comic Vine API Key (GameSpot)
                </label>
                <input
                  type="text"
                  value={comicVineKey}
                  onChange={(e) => setComicVineKey(e.target.value)}
                  placeholder="e.g. 2b9a7c4e8f1d3c5b7a9e..."
                  className="w-full px-3.5 py-2.5 bg-black border-2 border-neutral-700 focus:border-[#1769FF] text-white font-mono text-xs outline-none transition"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Register free at{' '}
                  <a 
                    href="https://comicvine.gamespot.com/api/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#FFD400] hover:underline inline-flex items-center gap-0.5 font-bold"
                  >
                    comicvine.gamespot.com/api/ <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>

              <div className="p-3 bg-black/60 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                <p className="font-bold text-white">Browser-Native JSONP Integration:</p>
                <p className="text-neutral-400 text-[11px]">
                  Comic Vine requests are served via browser JSONP (<code className="text-[#FFD400]">format=jsonp</code>) to natively bypass CORS limitations without needing a backend server!
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVE PROVIDER */}
          {activeTab === 'provider' && (
            <div className="space-y-3">
              <label className="block font-comic text-xs tracking-wider uppercase text-[#FFD400]">
                Choose Primary Comic Catalog Source:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'marvel', label: 'Marvel Developer API', desc: 'Official Marvel gateway (40k+ issues)' },
                  { id: 'comicvine', label: 'Comic Vine API', desc: 'GameSpot / Red Ventures universal database' },
                  { id: 'all', label: 'Unified Multiverse', desc: 'Blended Marvel + Comic Vine archive' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProvider(p.id)}
                    className={`p-3 text-left border-2 transition ${
                      provider === p.id
                        ? 'bg-black border-[#FFD400] shadow-[2px_2px_0px_#FFD400]'
                        : 'bg-black/60 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    <span className="font-bebas text-lg text-white block leading-tight">{p.label}</span>
                    <span className="text-[10px] text-neutral-400 block mt-1 font-sans">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-black">
            <button
              type="button"
              onClick={handleResetToDemo}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-comic text-xs tracking-wider uppercase border-2 border-black flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Use Offline Demo Vault
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-black hover:bg-neutral-900 text-neutral-300 font-comic text-xs tracking-wider uppercase border-2 border-neutral-700 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="comic-btn-red px-5 py-2 text-xs tracking-wider uppercase flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                Save & Apply Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
