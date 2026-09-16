import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Academy from './pages/Academy';
import Programs from './pages/Programs';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Sync page state with window.location.pathname
  const getInitialPage = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('academy')) return 'academy';
    if (path.includes('programs')) return 'programs';
    if (path.includes('contact')) return 'contact';
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState(activePage);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const handlePopState = () => {
      const page = getInitialPage();
      navigateToPage(page, false);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Premium MotionSites / Awwwards text reveal animations across sections
  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const sections = document.querySelectorAll('section');
        sections.forEach((sec) => {
          const labels = sec.querySelectorAll('.reveal-label');
          const lines = sec.querySelectorAll('.reveal-line');
          const paras = sec.querySelectorAll('.reveal-para');
          const stats = sec.querySelectorAll('.reveal-stat');

          if (labels.length === 0 && lines.length === 0 && paras.length === 0 && stats.length === 0) {
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              once: true,
            },
          });

          if (labels.length > 0) {
            tl.fromTo(
              labels,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'cubic-bezier(0.16, 1, 0.3, 1)', stagger: 0.06 },
              0
            );
          }

          if (lines.length > 0) {
            tl.fromTo(
              lines,
              { opacity: 0, y: 70 },
              { opacity: 1, y: 0, duration: 0.9, ease: 'cubic-bezier(0.16, 1, 0.3, 1)', stagger: 0.1 },
              0.05
            );
          }

          if (paras.length > 0) {
            tl.fromTo(
              paras,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'cubic-bezier(0.16, 1, 0.3, 1)', stagger: 0.08 },
              0.25
            );
          }

          if (stats.length > 0) {
            tl.fromTo(
              stats,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'cubic-bezier(0.16, 1, 0.3, 1)', stagger: 0.06 },
              0.35
            );
          }
        });
      });

      return () => ctx.revert();
    }, 150);

    return () => clearTimeout(timer);
  }, [displayPage]);

  const navigateToPage = (newPage, updateHistory = true) => {
    if (newPage === displayPage && !isTransitioning) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsTransitioning(true);

    if (updateHistory) {
      const targetPath = newPage === 'home' ? '/' : `/${newPage}`;
      window.history.pushState(null, '', targetPath);
    }

    // Smooth page transition curtain
    setTimeout(() => {
      setDisplayPage(newPage);
      setActivePage(newPage);
      window.scrollTo(0, 0);
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });

      setTimeout(() => {
        setIsTransitioning(false);
        ScrollTrigger.refresh();
      }, 350);
    }, 350);
  };

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#050607] text-[#F5F5F2] selection:bg-[#FF3038] selection:text-[#050607] flex flex-col justify-between">
        {/* Desktop Custom Interactive Cursor */}
        <CustomCursor />

        {/* Global Sticky Navbar */}
        <Navbar activePage={displayPage} setActivePage={navigateToPage} />

        {/* Cinematic Page Transition Curtain Overlay */}
        <div
          className={`fixed inset-0 z-[100] bg-[#050607] pointer-events-none transition-all duration-500 ease-in-out flex items-center justify-center ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-1 bg-gradient-to-r from-[#FF3038] to-[#FF9838] animate-pulse" />
            <span className="font-space text-xs tracking-[0.3em] text-[#FF3038] uppercase">
              AERIS // TELEMETRY LOADING
            </span>
          </div>
        </div>

        {/* Page Views */}
        <main className="flex-grow">
          {displayPage === 'home' && <Home setActivePage={navigateToPage} />}
          {displayPage === 'academy' && <Academy setActivePage={navigateToPage} />}
          {displayPage === 'programs' && <Programs setActivePage={navigateToPage} />}
          {displayPage === 'contact' && <Contact />}
        </main>

        {/* Oversized Cinematic Footer */}
        <Footer setActivePage={navigateToPage} />
      </div>
    </CursorProvider>
  );
}
