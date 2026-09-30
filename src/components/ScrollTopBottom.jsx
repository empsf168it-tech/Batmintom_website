import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export default function ScrollTopBottom() {
  const { setCursor } = useCursor();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1.5 bg-[#0a0d11]/90 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-[#FF3038]/60 transition-all duration-300"
      role="region"
      aria-label="Scroll Navigation"
    >
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        onMouseEnter={() => setCursor && setCursor('GO')}
        onMouseLeave={() => setCursor && setCursor('default')}
        className="w-8 h-8 rounded-full flex items-center justify-center text-[#F5F5F2] hover:bg-gradient-to-br hover:from-[#FF3038] hover:to-[#FF9838] hover:text-[#050607] transition-all cursor-pointer group"
        title="Scroll to Top"
      >
        <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* Subtle indicator divider */}
      <div className="w-4 h-[1px] bg-white/20" />

      {/* Scroll to Bottom */}
      <button
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        onMouseEnter={() => setCursor && setCursor('GO')}
        onMouseLeave={() => setCursor && setCursor('default')}
        className="w-8 h-8 rounded-full flex items-center justify-center text-[#F5F5F2] hover:bg-gradient-to-br hover:from-[#FF3038] hover:to-[#FF9838] hover:text-[#050607] transition-all cursor-pointer group"
        title="Scroll to Bottom"
      >
        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}
