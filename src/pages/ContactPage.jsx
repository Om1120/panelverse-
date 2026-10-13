import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const ContactPage = () => {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    showToast('Dispatch transmitted to the Panelverse editorial desk!', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-2">
        <span className="font-comic text-brand-yellow text-sm uppercase px-2 py-0.5 bg-black border border-brand-border inline-block">
          DISPATCH TRANSMISSION
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-paper uppercase">
          CONTACT <span className="text-brand-yellow">PANELVERSE.</span>
        </h1>
        <p className="text-xs text-brand-muted">
          Have an independent title to submit? Questions regarding physical copy lending or library requests? Send us a frequency.
        </p>
      </div>

      <div className="bg-[#191919] border-2 border-brand-yellow shadow-brutal-yellow p-6 sm:p-8">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-12 h-12 text-brand-yellow mx-auto" />
            <h3 className="font-display font-black text-xl text-brand-paper uppercase">
              TRANSMISSION RECEIVED!
            </h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              Thank you, {form.name}. Your dispatch has been logged in our demo editorial queue. We will review your message shortly.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
              className="px-4 py-2 bg-brand-yellow text-black font-black uppercase text-xs"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold uppercase text-brand-muted block mb-1">Your Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Kai Stewart"
                className="w-full p-2.5 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold uppercase text-brand-muted block mb-1">Your Email Address *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="reader@domain.com"
                className="w-full p-2.5 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold uppercase text-brand-muted block mb-1">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Creator submission / Library inquiry"
                className="w-full p-2.5 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold uppercase text-brand-muted block mb-1">Message *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Write your inquiry or creator portfolio link here..."
                className="w-full p-2.5 bg-[#111111] border border-brand-border text-brand-paper focus:border-brand-yellow focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-yellow text-black font-black uppercase text-xs tracking-wider border-2 border-black hover:bg-white transition flex items-center justify-center gap-2 shadow-brutal-dark"
            >
              <Send className="w-4 h-4" />
              Transmit Dispatch
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
