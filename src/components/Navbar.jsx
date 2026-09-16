import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

// Premium Magnetic Nav Item with smooth spring-back
function MagneticNavItem({ children, onClick, isActive, onMouseEnter, onMouseLeave, className }) {
  const itemRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;
    // Cap magnetic pull to 3-4px
    const clampedX = Math.max(-4, Math.min(4, deltaX));
    const clampedY = Math.max(-4, Math.min(4, deltaY));
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = (e) => {
    setPosition({ x: 0, y: 0 });
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <button
      ref={itemRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${position.x !== 0 || position.y !== 0 ? 1.02 : 1})`,
        transition:
          position.x === 0 && position.y === 0
            ? 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), color 350ms cubic-bezier(0.16, 1, 0.3, 1), background 350ms, box-shadow 350ms'
            : 'transform 90ms ease-out, color 350ms, background 350ms, box-shadow 350ms',
      }}
      className={className}
    >
      {children}
    </button>
  );
}

export default function Navbar({ activePage, setActivePage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME', path: '/' },
    { id: 'academy', label: 'ACADEMY', path: '/academy' },
    { id: 'programs', label: 'PROGRAMS', path: '/programs' },
    { id: 'contact', label: 'CONTACT', path: '/contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-[#050607]/90 backdrop-blur-[20px] border-b border-white/[0.14] py-3.5 shadow-[0_12px_32px_-10px_rgba(255,48,56,0.18)]'
            : 'bg-[#050607]/72 backdrop-blur-[18px] border-b border-white/[0.08] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* AERIS LOGO */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 cursor-pointer text-left focus:outline-none"
            onMouseEnter={() => setCursor('NAV')}
            onMouseLeave={() => setCursor('default')}
          >
            <div className="relative w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/[0.14] rounded-lg group-hover:border-[#FF3038]/80 transition-colors duration-300 shadow-sm">
              <span className="w-2.5 h-2.5 bg-gradient-to-br from-[#FF3038] to-[#FF9838] rotate-45 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(255,48,56,0.6)]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-2xl tracking-[0.18em] text-[#F5F5F2] group-hover:text-[#FF3038] transition-colors duration-300 leading-none">
                AERIS
              </span>
              <span className="font-space text-[9px] tracking-[0.25em] text-[#A7AAA8] uppercase">
                BADMINTON ACADEMY
              </span>
            </div>
          </button>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#050607]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <MagneticNavItem
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  isActive={isActive}
                  onMouseEnter={() => setCursor('NAV')}
                  onMouseLeave={() => setCursor('default')}
                  className={`relative px-5 py-2 rounded-full font-space text-xs tracking-wider cursor-pointer transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group overflow-hidden ${
                    isActive
                      ? 'text-[#050607] font-bold bg-gradient-to-br from-[#FF3038] to-[#FF9838] border border-white/20 shadow-[0_8px_30px_rgba(255,48,56,0.25)]'
                      : 'text-[#F5F5F2]/75 hover:text-[#FF3038] hover:bg-gradient-to-r hover:from-[rgba(255,48,56,0.08)] hover:to-[rgba(255,152,56,0.04)]'
                  }`}
                >
                  <span className={`relative z-10 transition-colors duration-300 ${!isActive ? 'group-hover:drop-shadow-[0_0_8px_rgba(255,48,56,0.35)]' : ''}`}>
                    {link.label}
                  </span>

                  {/* Active subtle orange highlight on right edge */}
                  {isActive && (
                    <span 
                      className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 rounded-r-full"
                      style={{
                        background: 'radial-gradient(circle at 90% 50%, rgba(255, 255, 255, 0.35) 0%, transparent 65%)'
                      }}
                    />
                  )}

                  {/* Animated thin gradient underline on hover (Left -> Right) */}
                  {!isActive && (
                    <span className="pointer-events-none absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#FF3038] to-[#FF9838] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  )}
                </MagneticNavItem>
              );
            })}
          </nav>

          {/* CTA & MOBILE TOGGLE */}
          <div className="flex items-center gap-4">
            {/* START TRAINING CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              onMouseEnter={() => setCursor('GO')}
              onMouseLeave={() => setCursor('default')}
              className="group relative hidden lg:inline-flex items-center gap-2.5 bg-gradient-to-br from-[#FF3038] to-[#FF9838] text-[#050607] font-space text-xs font-bold px-6 py-2.5 rounded-full border border-white/20 shadow-[0_6px_22px_rgba(255,48,56,0.28)] transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.03] hover:shadow-[0_10px_32px_rgba(255,48,56,0.42),0_0_20px_rgba(255,152,56,0.25)] cursor-pointer active:scale-95 overflow-hidden"
            >
              {/* Animated light sweep / shine across button */}
              <span className="pointer-events-none absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-25 group-hover:left-[200%] transition-all duration-700 ease-in-out" />
              
              <span className="relative z-10 tracking-wider">START TRAINING</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1" />
            </button>

            {/* Mobile Hamburger Button (Right side) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.14] text-[#F5F5F2] hover:text-[#FF3038] hover:border-[#FF3038]/60 transition-colors focus:outline-none cursor-pointer shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MOBILE NAVIGATION OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-[#050607]/98 backdrop-blur-2xl flex flex-col justify-between p-8 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <div className="pt-20 flex flex-col gap-6">
          <div className="font-space text-xs tracking-widest text-[#A7AAA8] uppercase border-b border-white/10 pb-3 flex items-center justify-between">
            <span>NAVIGATION INDEX // AERIS</span>
            <span className="w-2 h-2 rounded-full bg-[#FF3038] animate-ping" />
          </div>

          {navLinks.map((link, idx) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="flex items-baseline justify-between text-left group py-2.5 cursor-pointer border-b border-white/[0.04]"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-space text-xs text-[#FF3038] font-bold">0{idx + 1}</span>
                  <span
                    className={`font-bebas text-5xl tracking-wide transition-colors duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF3038] to-[#FF9838] bg-clip-text text-transparent font-bold'
                        : 'text-[#F5F5F2] group-hover:text-[#FF3038]'
                    }`}
                  >
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight className={`w-6 h-6 transition-transform duration-300 ${
                  isActive ? 'text-[#FF9838]' : 'text-[#A7AAA8] group-hover:text-[#FF9838] group-hover:translate-x-1 group-hover:-translate-y-1'
                }`} />
              </button>
            );
          })}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF3038] to-[#FF9838] text-[#050607] font-space font-bold tracking-wider text-center text-sm shadow-[0_8px_30px_rgba(255,48,56,0.3)] active:scale-95 transition-transform"
          >
            START TRAINING NOW
          </button>
          <div className="flex justify-between text-xs font-space text-[#A7AAA8]">
            <span>OLYMPIC BADMINTON</span>
            <span className="text-[#FF9838] font-bold">BERLIN // SINGAPORE</span>
          </div>
        </div>
      </div>
    </>
  );
}