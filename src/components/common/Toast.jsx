import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const bgStyles = {
    success: 'bg-brand-yellow text-black border-black shadow-brutal-dark',
    error: 'bg-brand-red text-white border-black shadow-brutal-dark',
    info: 'bg-[#222222] text-brand-paper border-brand-yellow shadow-brutal-yellow'
  }[type] || 'bg-[#222222] text-brand-paper border-brand-yellow shadow-brutal-yellow';

  const icons = {
    success: <CheckCircle className="w-5 h-5 shrink-0 stroke-[2.5]" />,
    error: <AlertCircle className="w-5 h-5 shrink-0 stroke-[2.5]" />,
    info: <Info className="w-5 h-5 shrink-0 stroke-[2.5] text-brand-yellow" />
  }[type] || <Info className="w-5 h-5 shrink-0" />;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0">
      <div className={`flex items-center gap-3 px-5 py-3.5 border-2 text-sm font-bold max-w-md ${bgStyles}`}>
        {icons}
        <span className="flex-1 tracking-wide font-sans">{message}</span>
      </div>
    </div>
  );
};
