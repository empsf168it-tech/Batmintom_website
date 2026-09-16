import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Zap, Target, Activity, ShieldCheck, ChevronRight, Play } from 'lucide-react';
import ShuttlecockCanvas from '../components/3d/ShuttlecockCanvas';
import SpeedBackgroundCanvas from '../components/3d/SpeedBackgroundCanvas';
import CourtCanvas from '../components/3d/CourtCanvas';
import { useCursor } from '../context/CursorContext';
import { 
  IMAGES, 
  TELEMETRY_METRICS, 
  HORIZONTAL_TRAINING_MOVEMENTS, 
  PROGRAMS_DATA 
} from '../data/aerisData';

export default function Home({ setActivePage }) {
  const { setCursor } = useCursor();
  const [heroRevealed, setHeroRevealed] = useState(false);
  const horizontalScrollRef = useRef(null);
  const [horizontalProgress, setHorizontalProgress] = useState(0);

  useEffect(() => {
    // Cinematic entrance delay
    const timer = setTimeout(() => {
      setHeroRevealed(true);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  const handleHorizontalScroll = (e) => {
    const el = e.currentTarget;
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setHorizontalProgress(progress || 0);
  };

  const scrollLeft = () => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050607] text-[#F5F5F2] overflow-x-hidden">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION (100vh IMMERSIVE 3D BADMINTON ENVIRONMENT) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[100svh] flex flex-col justify-between pt-28 pb-8 px-5 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Procedural WebGL Speed Particles & Perspective Court Grid */}
        <SpeedBackgroundCanvas />

        {/* Top Technical Metadata Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3 transition-all duration-1000 ${heroRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF3038] animate-ping" />
            <span className="font-space text-xs tracking-[0.2em] text-[#A7AAA8] uppercase">
              HIGH-PERFORMANCE BADMINTON TELEMETRY
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-space text-[#A7AAA8]">
            <span>SYSTEM 01 // AIR SPEED</span>
            <span className="text-[#FF3038]">493 KM/H REGISTERED</span>
          </div>
        </div>

        {/* Main Hero Split Grid: Typography & 3D Interactive Racket */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto py-2 sm:py-4">
          {/* Left Column: Masked Staggered Headline */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full w-fit">
              <Zap className="w-3 h-3 text-[#FF3038]" />
              <span className="font-space text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#F5F5F2] uppercase">
                AERIS ATHLETE DEVELOPMENT
              </span>
            </div>

            {/* Masked Headline with clamp responsive font sizing */}
            <h1 className="font-bebas text-[clamp(2.3rem,4.6vw,4.6rem)] leading-[0.88] tracking-tight uppercase">
              <div className={`masked-text-container ${heroRevealed ? 'revealed' : ''}`}>
                <span className="masked-text-child text-[#F5F5F2]" style={{ transitionDelay: '50ms' }}>
                  PLAY
                </span>
              </div>
              <div className={`masked-text-container ${heroRevealed ? 'revealed' : ''}`}>
                <span className="masked-text-child text-[#FF3038]" style={{ transitionDelay: '150ms' }}>
                  FASTER.
                </span>
              </div>
              <div className={`masked-text-container ${heroRevealed ? 'revealed' : ''}`}>
                <span className="masked-text-child text-[#F5F5F2]" style={{ transitionDelay: '250ms' }}>
                  MOVE
                </span>
              </div>
              <div className={`masked-text-container ${heroRevealed ? 'revealed' : ''}`}>
                <span className="masked-text-child text-[#A7AAA8]" style={{ transitionDelay: '350ms' }}>
                  SMARTER.
                </span>
              </div>
            </h1>

            {/* Supporting Statement */}
            <p className={`font-manrope text-sm sm:text-base text-[#A7AAA8] max-w-xl leading-relaxed transition-all duration-1000 ${heroRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
              Elite badminton coaching built for players who refuse to stay average. 
              Engineered with world-class telemetry, Olympic biomechanics, and tournament-proven tactical conditioning.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap items-center gap-3.5 pt-1 transition-all duration-1000 ${heroRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '650ms' }}>
              <button
                onClick={() => setActivePage('contact')}
                onMouseEnter={() => setCursor('GO')}
                onMouseLeave={() => setCursor('default')}
                className="group inline-flex items-center gap-3 relative overflow-hidden group bg-gradient-to-br from-[#FF3038] to-[#FF9838] text-[#050607] font-space font-extrabold text-xs sm:text-sm px-7 py-3 rounded-xl shadow-[0_0_25px_rgba(255,48,56,0.35)] hover:shadow-[0_0_40px_rgba(255,48,56,0.55)] hover:scale-[1.03] hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
              >
                <span>START TRAINING</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActivePage('programs')}
                onMouseEnter={() => setCursor('GO')}
                onMouseLeave={() => setCursor('default')}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-[#F5F5F2] border border-white/15 font-space font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer active:scale-95"
              >
                <span>EXPLORE PROGRAMS</span>
                <ChevronRight className="w-4 h-4 text-[#FF3038]" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Badminton Racket Canvas with Floating Telemetry */}
          <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] lg:h-[480px] flex items-center justify-center">
            {/* 3D Racket Canvas with Mouse tracking */}
            <div className="w-full h-full">
              <ShuttlecockCanvas onInteract={setCursor} />
            </div>

            {/* Floating Telemetry Badge 1 (Smash Speed) */}
            <div className={`absolute top-0 right-0 sm:right-2 bg-[#0c1014]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 shadow-2xl pointer-events-none transition-all duration-1000 ${heroRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: '750ms' }}>
              <div className="flex items-center gap-2 text-[10px] font-space text-[#A7AAA8] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3038]" />
                SMASH VELOCITY
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] leading-none">493</span>
                <span className="font-space text-xs text-[#FF3038] font-bold">KM/H</span>
              </div>
            </div>

            {/* Floating Telemetry Badge 2 (Reaction Time) */}
            <div className={`absolute bottom-0 left-0 sm:left-2 bg-[#0c1014]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 shadow-2xl pointer-events-none transition-all duration-1000 ${heroRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: '850ms' }}>
              <div className="flex items-center gap-2 text-[10px] font-space text-[#A7AAA8] tracking-widest uppercase">
                <Activity className="w-3 h-3 text-[#52e5ff]" />
                NET REACTION
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] leading-none">0.21</span>
                <span className="font-space text-xs text-[#52e5ff] font-bold">SEC</span>
              </div>
            </div>

            {/* Floating Telemetry Badge 3 (Precision Accuracy) */}
            <div className={`absolute bottom-0 right-0 sm:right-2 bg-[#0c1014]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 shadow-2xl pointer-events-none hidden sm:block transition-all duration-1000 ${heroRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: '950ms' }}>
              <div className="flex items-center gap-2 text-[10px] font-space text-[#A7AAA8] tracking-widest uppercase">
                <Target className="w-3 h-3 text-[#FF3038]" />
                PERIMETER ACCURACY
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-bebas text-2xl sm:text-3xl text-[#FF3038] leading-none">98.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-4 pb-2">
          {TELEMETRY_METRICS.map((item) => (
            <div key={item.id} className="flex flex-col">
              <span className="font-space text-[10px] sm:text-xs text-[#A7AAA8] uppercase tracking-wider">
                {item.label}
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2]">{item.value}</span>
                <span className="font-space text-xs text-[#FF3038] font-semibold">{item.unit}</span>
              </div>
              <span className="text-[11px] font-manrope text-[#A7AAA8]/80 truncate">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. PERFORMANCE SECTION ("BUILT FOR SPEED") */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-28 px-5 sm:px-8 border-t border-white/10 bg-[#07090b]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 reveal-label text-xs font-space text-[#FF3038] uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FF3038]" />
                KINETIC RE-ENGINEERING
              </div>
              <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F5F5F2] leading-[0.9]">
                <span className="masked-heading-wrapper"><span className="reveal-line">BUILT FOR <span className="bg-gradient-to-r from-[#FF3038] to-[#FF9838] bg-clip-text text-transparent">SPEED.</span></span></span>
              </h2>
            </div>
            <p className="reveal-para font-manrope text-sm sm:text-base text-[#A7AAA8] max-w-md leading-relaxed">
              Standard coaching focuses on repetition. AERIS re-engineers movement through force generation, ground reaction vectors, and aerodynamic efficiency.
            </p>
          </div>

          {/* Performance Grid Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0b0e12] border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover:border-[#FF3038]/40 transition-colors group">
              <div>
                <span className="font-space text-xs text-[#FF3038] tracking-widest">01 // ROTATION</span>
                <h3 className="font-bebas text-3xl sm:text-4xl text-[#F5F5F2] mt-3 group-hover:text-[#FF3038] transition-colors">
                  FOREARM PRONATION
                </h3>
                <p className="font-manrope text-sm text-[#A7AAA8] mt-3 leading-relaxed">
                  Badminton is not an arm sportâ€”it is a rotational whip. We calibrate internal shoulder rotation and forearm snap to unlock 490+ km/h smashes without joint strain.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 mt-8 flex justify-between items-center text-xs font-space text-[#A7AAA8]">
                <span>EXIT ANGLE</span>
                <span className="text-[#FF3038] font-bold">14.8Â° DOWNWARD</span>
              </div>
            </div>

            <div className="bg-[#0b0e12] border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover:border-[#FF3038]/40 transition-colors group">
              <div>
                <span className="font-space text-xs text-[#52e5ff] tracking-widest">02 // FOOTWORK</span>
                <h3 className="font-bebas text-3xl sm:text-4xl text-[#F5F5F2] mt-3 group-hover:text-[#52e5ff] transition-colors">
                  GRAVITATIONAL LOADING
                </h3>
                <p className="font-manrope text-sm text-[#A7AAA8] mt-3 leading-relaxed">
                  Eliminating dead-weight footsteps. By training reflexive split-steps, your center of mass drops and recoils with zero transitional hesitation across all 6 court corners.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 mt-8 flex justify-between items-center text-xs font-space text-[#A7AAA8]">
                <span>SPLIT-STEP LATENCY</span>
                <span className="text-[#52e5ff] font-bold">0.18 SEC</span>
              </div>
            </div>

            <div className="bg-[#0b0e12] border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover:border-[#FF3038]/40 transition-colors group">
              <div>
                <span className="font-space text-xs text-[#f8e71c] tracking-widest">03 // STABILITY</span>
                <h3 className="font-bebas text-3xl sm:text-4xl text-[#F5F5F2] mt-3 group-hover:text-[#f8e71c] transition-colors">
                  HIGH-CADENCE CADENCE
                </h3>
                <p className="font-manrope text-sm text-[#A7AAA8] mt-3 leading-relaxed">
                  Sustaining precision when heart rate exceeds 185 BPM. Multi-shuttle endurance circuits teach neuro-muscular resistance against match-point fatigue.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 mt-8 flex justify-between items-center text-xs font-space text-[#A7AAA8]">
                <span>FATIGUE TOLERANCE</span>
                <span className="text-[#f8e71c] font-bold">+41% RALLY CAPACITY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SIGNATURE 3D BADMINTON COURT EXPERIENCE */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-28 px-5 sm:px-8 border-t border-white/10 bg-[#050607]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 reveal-label text-xs font-space text-[#FF3038] uppercase tracking-widest mb-3">
              <Target className="w-3.5 h-3.5" />
              SIGNATURE 3D PERFORMANCE LAB
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl tracking-tight text-[#F5F5F2] leading-[0.9]">
              THE 3D TACTICAL COURT
            </h2>
            <p className="font-manrope text-sm sm:text-base text-[#A7AAA8] mt-3">
              Rotate, inspect, and analyze court geometry, trajectory clearances, and recovery anchor points used in Olympic preparation.
            </p>
          </div>

          {/* Interactive 3D Badminton Court */}
          <CourtCanvas />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. HORIZONTAL SCROLL EXPERIENCE: "EVERY MOVEMENT COUNTS" */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-28 px-5 sm:px-8 border-t border-white/10 bg-[#080a0d]">
        <div className="max-w-7xl mx-auto">
          {/* Header with Navigation Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="reveal-label font-space text-xs text-[#FF3038] tracking-widest uppercase">
                BIOMECHANICAL BREAKDOWN // 01 TO 05
              </span>
              <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F5F5F2] leading-[0.9] mt-2">
                <span className="masked-heading-wrapper"><span className="reveal-line">EVERY MOVEMENT <span className="bg-gradient-to-r from-[#FF3038] to-[#FF9838] bg-clip-text text-transparent">COUNTS.</span></span></span>
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Scroll progress indicator bar */}
              <div className="w-36 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                <div 
                  className="h-full bg-gradient-to-r from-[#FF3038] to-[#FF9838] transition-all duration-150"
                  style={{ width: `${Math.max(15, horizontalProgress * 100)}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={scrollLeft}
                  aria-label="Scroll left"
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-[#F5F5F2] hover:bg-gradient-to-r hover:from-[#FF3038] hover:to-[#FF9838] hover:text-[#050607] hover:border-[#FF3038] transition-all cursor-pointer"
                >
                  â†
                </button>
                <button
                  onClick={scrollRight}
                  aria-label="Scroll right"
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-[#F5F5F2] hover:bg-gradient-to-r hover:from-[#FF3038] hover:to-[#FF9838] hover:text-[#050607] hover:border-[#FF3038] transition-all cursor-pointer"
                >
                  â†’
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Scroll Track */}
          <div
            ref={horizontalScrollRef}
            onScroll={handleHorizontalScroll}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {HORIZONTAL_TRAINING_MOVEMENTS.map((move) => (
              <div
                key={move.step}
                className="flex-shrink-0 w-[310px] sm:w-[390px] md:w-[440px] bg-[#0d1015] border border-white/10 rounded-2xl overflow-hidden snap-start flex flex-col justify-between group hover:border-[#FF3038]/50 transition-all duration-300"
                onMouseEnter={() => setCursor('VIEW')}
                onMouseLeave={() => setCursor('default')}
              >
                {/* Cinematic Image Frame with Scale Transition */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={move.image}
                    alt={move.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1015] via-transparent to-black/40" />
                  
                  {/* Step Tag */}
                  <div className="absolute top-4 left-4 bg-[#050607]/80 backdrop-blur px-3 py-1 rounded-full border border-white/10 font-space text-[11px] text-[#FF3038] font-bold">
                    STEP {move.step}
                  </div>

                  {/* Benchmark Stat Badge */}
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-[#FF3038] to-[#FF9838] text-[#050607] px-3.5 py-1.5 rounded-lg font-space font-extrabold text-xs">
                    {move.metric}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="font-space text-xs text-[#A7AAA8] tracking-widest uppercase">
                      {move.tag}
                    </span>
                    <h3 className="font-bebas text-3xl sm:text-4xl text-[#F5F5F2] mt-2 group-hover:text-[#FF3038] transition-colors">
                      {move.title}
                    </h3>
                    <p className="font-manrope text-sm text-[#A7AAA8] mt-3 leading-relaxed">
                      {move.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs font-space text-[#A7AAA8]">
                    <span>VECTOR</span>
                    <span className="text-[#F5F5F2] font-semibold">{move.vector}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. TRAINING SECTION ("TRAIN LIKE A PROFESSIONAL") */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-28 px-5 sm:px-8 border-t border-white/10 bg-[#050607]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-6">
              <span className="reveal-label font-space text-xs text-[#FF3038] tracking-widest uppercase">
                WORLD-CLASS METHODOLOGY
              </span>
              <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F5F5F2] leading-[0.9] mt-2">
                TRAIN LIKE A <br />
                <span className="text-[#FF3038]">PROFESSIONAL.</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="font-manrope text-base sm:text-lg text-[#A7AAA8] leading-relaxed">
                Olympic coaches, force-plate telemetry, and high-cadence multi-shuttle drilling. 
                Whether you are stepping onto the court for your first tournament or competing on the international circuit, every drill has a calculated purpose.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 font-space text-xs">
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F5F5F2]">
                  âœ“ 1:2 COACH-TO-PLAYER RATIO
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F5F5F2]">
                  âœ“ HIGH FRAME-RATE VIDEO TELEMETRY
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F5F5F2]">
                  âœ“ BWF TOURNAMENT SURFACE
                </span>
              </div>
            </div>
          </div>

          {/* Cinematic Image Gallery with Scale reveals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              className="group relative h-96 rounded-2xl overflow-hidden border border-white/10"
              onMouseEnter={() => setCursor('VIEW')}
              onMouseLeave={() => setCursor('default')}
            >
              <img 
                src={IMAGES.smashJump} 
                alt="Smash Training" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-space text-xs text-[#FF3038] font-bold">01 // ATTACK</span>
                <h3 className="font-bebas text-3xl text-white mt-1">POWER SMASH</h3>
                <p className="font-manrope text-xs text-[#A7AAA8] mt-1">Airborne torque & kinetic wrist snap</p>
              </div>
            </div>

            <div 
              className="group relative h-96 rounded-2xl overflow-hidden border border-white/10"
              onMouseEnter={() => setCursor('VIEW')}
              onMouseLeave={() => setCursor('default')}
            >
              <img 
                src={IMAGES.footworkAgility} 
                alt="Footwork Training" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-space text-xs text-[#52e5ff] font-bold">02 // AGILITY</span>
                <h3 className="font-bebas text-3xl text-white mt-1">6-CORNER REBOUND</h3>
                <p className="font-manrope text-xs text-[#A7AAA8] mt-1">Split-step loading and deceleration</p>
              </div>
            </div>

            <div 
              className="group relative h-96 rounded-2xl overflow-hidden border border-white/10"
              onMouseEnter={() => setCursor('VIEW')}
              onMouseLeave={() => setCursor('default')}
            >
              <img 
                src={IMAGES.defenseDive} 
                alt="Defense Training" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-space text-xs text-[#f8e71c] font-bold">03 // DEFENSE</span>
                <h3 className="font-bebas text-3xl text-white mt-1">REFLEX BLOCKS</h3>
                <p className="font-manrope text-xs text-[#A7AAA8] mt-1">Converting opponent power to net tight tumbles</p>
              </div>
            </div>

            <div 
              className="group relative h-96 rounded-2xl overflow-hidden border border-white/10"
              onMouseEnter={() => setCursor('VIEW')}
              onMouseLeave={() => setCursor('default')}
            >
              <img 
                src={IMAGES.recoveryIce} 
                alt="Recovery Training" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-space text-xs text-[#FF3038] font-bold">04 // RESET</span>
                <h3 className="font-bebas text-3xl text-white mt-1">CRYO RECOVERY</h3>
                <p className="font-manrope text-xs text-[#A7AAA8] mt-1">Neuromuscular restoration between match days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. PROGRAM PREVIEW (EDITORIAL PANELS) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-28 px-5 sm:px-8 border-t border-white/10 bg-[#080a0c]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="reveal-label font-space text-xs text-[#FF3038] tracking-widest uppercase">
                STRUCTURED PATHWAYS
              </span>
              <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F5F5F2] leading-[0.9] mt-2">
                <span className="masked-heading-wrapper"><span className="reveal-line">CHOOSE YOUR <span className="bg-gradient-to-r from-[#FF3038] to-[#FF9838] bg-clip-text text-transparent">LEVEL.</span></span></span>
              </h2>
            </div>
            <button
              onClick={() => setActivePage('programs')}
              onMouseEnter={() => setCursor('GO')}
              onMouseLeave={() => setCursor('default')}
              className="inline-flex items-center gap-2 text-sm font-space text-[#FF3038] hover:underline cursor-pointer"
            >
              <span>VIEW ALL 4 DETAILED PROGRAMS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Major Program Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMS_DATA.slice(0, 3).map((prog) => (
              <div
                key={prog.id}
                onClick={() => setActivePage('programs')}
                onMouseEnter={() => setCursor('GO')}
                onMouseLeave={() => setCursor('default')}
                className="group relative bg-[#0d1015] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF3038]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-space text-xs text-[#FF3038] tracking-widest font-bold">
                      {prog.level}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white/5 text-[10px] font-space text-[#A7AAA8] border border-white/10">
                      {prog.badge}
                    </span>
                  </div>

                  <h3 className="font-bebas text-4xl sm:text-5xl text-[#F5F5F2] mt-4 group-hover:text-[#FF3038] transition-colors">
                    {prog.name}
                  </h3>

                  <p className="font-space text-xs text-[#A7AAA8] mt-1 italic">
                    "{prog.tagline}"
                  </p>

                  <p className="font-manrope text-sm text-[#A7AAA8] mt-4 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-space text-[#A7AAA8] block">CADENCE</span>
                    <span className="text-xs font-space text-[#F5F5F2] font-semibold">{prog.frequency}</span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#F5F5F2] group-hover:bg-[#FF3038] group-hover:text-[#050607] group-hover:border-[#FF3038] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
