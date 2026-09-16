import React from 'react';
import { ArrowUpRight, Globe, Zap, Compass, Trophy } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export default function Footer({ setActivePage }) {
  const { setCursor } = useCursor();

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030405] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#FF3038]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top Section: Statement & Direct CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="reveal-label flex items-center gap-2 text-xs font-space text-[#FF3038] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#FF3038]" />
              PERFORMANCE ACADEMY STATEMENT
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F5F5F2] leading-[0.9]">
              <span className="masked-heading-wrapper">
                <span className="reveal-line">PLAY FASTER.</span>
              </span>
              <span className="masked-heading-wrapper">
                <span className="reveal-line bg-gradient-to-r from-[#FF3038] to-[#FF9838] bg-clip-text text-transparent">
                  MOVE SMARTER.
                </span>
              </span>
            </h2>
            <p className="reveal-para font-manrope text-sm sm:text-base text-[#A7AAA8] max-w-xl leading-relaxed mt-2">
              AERIS redefines competitive badminton through biomechanical precision, 
              sensor-grade telemetry, and Olympic-caliber tactical coaching. Average is not an option.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
            <button
              onClick={() => handleNavClick('contact')}
              onMouseEnter={() => setCursor('GO')}
              onMouseLeave={() => setCursor('default')}
              className="group relative inline-flex items-center gap-4 bg-gradient-to-br from-[#FF3038] to-[#FF9838] text-[#050607] font-space font-extrabold text-sm sm:text-base px-8 py-5 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(255,48,56,0.28)] hover:shadow-[0_0_45px_rgba(255,48,56,0.5)] hover:-translate-y-0.5 hover:scale-[1.03] cursor-pointer overflow-hidden"
            >
              {/* Light sweep */}
              <span className="pointer-events-none absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-25 group-hover:left-[200%] transition-all duration-700 ease-in-out" />
              
              <span className="relative z-10">START TRAINING</span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#050607] text-[#FF3038] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Middle Navigation & Information Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14 border-b border-white/10 text-sm">
          {/* Column 1: Navigation */}
          <div className="flex flex-col gap-4">
            <span className="font-space text-xs font-semibold tracking-widest text-[#A7AAA8] uppercase">
              INDEX
            </span>
            <div className="flex flex-col gap-2.5 font-space">
              <button 
                onClick={() => handleNavClick('home')} 
                className="text-left text-[#F5F5F2] hover:text-[#FF3038] transition-colors cursor-pointer"
              >
                01 // HOME
              </button>
              <button 
                onClick={() => handleNavClick('academy')} 
                className="text-left text-[#F5F5F2] hover:text-[#FF3038] transition-colors cursor-pointer"
              >
                02 // ACADEMY
              </button>
              <button 
                onClick={() => handleNavClick('programs')} 
                className="text-left text-[#F5F5F2] hover:text-[#FF3038] transition-colors cursor-pointer"
              >
                03 // PROGRAMS
              </button>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="text-left text-[#F5F5F2] hover:text-[#FF3038] transition-colors cursor-pointer"
              >
                04 // CONTACT
              </button>
            </div>
          </div>

          {/* Column 2: Performance Centers */}
          <div className="flex flex-col gap-4">
            <span className="font-space text-xs font-semibold tracking-widest text-[#A7AAA8] uppercase">
              CAMPUSES
            </span>
            <div className="flex flex-col gap-2 text-xs font-manrope text-[#A7AAA8]">
              <p className="text-[#F5F5F2] font-semibold">Berlin Olympic Hub</p>
              <p>Am Sportforum 14, 13055 Berlin</p>
              <p className="text-[#F5F5F2] font-semibold mt-2">Singapore High-Performance Lab</p>
              <p>1 Stadium Walk, Singapore 397688</p>
            </div>
          </div>

          {/* Column 3: Telemetry Benchmarks */}
          <div className="flex flex-col gap-4">
            <span className="font-space text-xs font-semibold tracking-widest text-[#A7AAA8] uppercase">
              ACADEMY SPECS
            </span>
            <div className="flex flex-col gap-2 text-xs font-space text-[#A7AAA8]">
              <div className="flex justify-between">
                <span>SMASH SPEED</span>
                <span className="text-[#FF3038] font-bold">493 KM/H</span>
              </div>
              <div className="flex justify-between">
                <span>COURT STANDARD</span>
                <span className="text-[#F5F5F2]">BWF GRADE 1</span>
              </div>
              <div className="flex justify-between">
                <span>LATENCY RESISTANCE</span>
                <span className="text-[#FF9838] font-bold">0.21 SEC</span>
              </div>
              <div className="flex justify-between">
                <span>COACH RATIO</span>
                <span className="text-[#F5F5F2]">1 : 2 MAX</span>
              </div>
            </div>
          </div>

          {/* Column 4: Social Channels */}
          <div className="flex flex-col gap-4">
            <span className="font-space text-xs font-semibold tracking-widest text-[#A7AAA8] uppercase">
              CONNECT
            </span>
            <div className="flex flex-col gap-2.5 font-space text-xs">
              <a 
                href="#instagram" 
                className="text-[#F5F5F2] hover:text-[#FF3038] transition-colors flex items-center justify-between"
              >
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#youtube" 
                className="text-[#F5F5F2] hover:text-[#FF3038] transition-colors flex items-center justify-between"
              >
                <span>YOUTUBE PRO FEED</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#strava" 
                className="text-[#F5F5F2] hover:text-[#FF3038] transition-colors flex items-center justify-between"
              >
                <span>PERFORMANCE LOG</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Giant AERIS Wordmark & Copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-[0.25em] text-white/5 select-none hover:text-[#FF3038]/15 transition-colors">
            AERIS
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 text-xs font-space text-[#A7AAA8]">
            <span>© 2026 AERIS BADMINTON ACADEMY. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#FF9838] font-bold">BUILT FOR SPEED. MOVE SMARTER.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}