import React, { useEffect, useState, useRef } from 'react';
import { useCursor } from '../context/CursorContext';

export default function CustomCursor() {
  const { cursorType, cursorText } = useCursor();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Detect touch device or reduced motion
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touchCheck || reducedMotion) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const animate = () => {
      // Smooth lerping
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (isTouch || !visible) return null;

  const isNav = cursorType === 'NAV';
  const isExpanded = cursorType !== 'default' && !isNav;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-300 ease-out flex items-center justify-center font-space font-bold tracking-wider ${
        isNav
          ? 'w-9 h-9 -ml-[18px] -mt-[18px] bg-gradient-to-tr from-[#FF3038]/15 to-[#FF9838]/10 border border-[#FF3038]/85 shadow-[0_0_18px_rgba(255,48,56,0.35)] backdrop-blur-[1px]'
          : isExpanded
          ? 'w-16 h-16 -ml-8 -mt-8 bg-gradient-to-r from-[#FF3038] to-[#FF9838] text-[#050607] text-[11px] shadow-[0_0_30px_rgba(255,48,56,0.45)]'
          : 'w-3.5 h-3.5 -ml-[7px] -mt-[7px] bg-[#FF3038] shadow-[0_0_10px_rgba(255,48,56,0.6)]'
      }`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {isNav && <span className="w-1.5 h-1.5 rounded-full bg-[#FF3038]" />}
      {isExpanded && <span>{cursorText}</span>}
    </div>
  );
}