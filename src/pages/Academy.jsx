import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Award, Zap, Compass, Sparkles, ChevronRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { IMAGES, TIMELINE_STEPS, FACILITIES_DATA } from '../data/aerisData';

export default function Academy({ setActivePage }) {
  const { setCursor } = useCursor();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative min-h-screen bg-[#050607] text-[#F5F5F2] pt-24 pb-20 overflow-x-hidden">
      {/* ------------------------------------------------------------- */}
      {/* ACADEMY HERO */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 reveal-label text-xs font-space text-[#FF3038] uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF3038] animate-ping" />
              AERIS PHILOSOPHY & FACILITY REPORT
            </div>

            <h1 className="font-bebas text-[clamp(3.5rem,6.5vw,6.5rem)] leading-[0.9] tracking-tight uppercase">
              BUILT AROUND <br />
              <span className="text-[#FF3038]">YOUR GAME.</span>
            </h1>

            <p className="reveal-para font-manrope text-base sm:text-lg text-[#A7AAA8] leading-relaxed mt-6">
              From first rally to tournament level, every session is designed around measurable progress. 
              We believe speed is not just natural talent — it is mechanical optimization, split-second decision training, and systematic physical preparation.
            </p>

            {/* Feature telemetry highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10 font-space">
              <div className="bg-[#0b0e13] border border-white/10 rounded-xl p-4">
                <span className="text-[11px] text-[#A7AAA8] tracking-wider uppercase block">TRAINING VELOCITY</span>
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] mt-1 block">493 <span className="text-[#FF3038] text-sm font-space">KM/H</span></span>
              </div>
              <div className="bg-[#0b0e13] border border-white/10 rounded-xl p-4">
                <span className="text-[11px] text-[#A7AAA8] tracking-wider uppercase block">SUBFLOOR SHOCK</span>
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] mt-1 block">-42% <span className="text-[#FF3038] text-sm font-space">IMPACT</span></span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => setActivePage('contact')}
                onMouseEnter={() => setCursor('GO')}
                onMouseLeave={() => setCursor('default')}
                className="inline-flex items-center gap-2 relative overflow-hidden group bg-gradient-to-br from-[#FF3038] to-[#FF9838] text-[#050607] font-space font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition-all cursor-pointer active:scale-95 shadow-[0_0_20px_rgba(255,48,56,0.3)] hover:shadow-[0_0_35px_rgba(255,48,56,0.5)] hover:scale-[1.03] hover:-translate-y-0.5"
              >
                <span>JOIN THE ACADEMY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Video Showcase */}
          <div className="lg:col-span-6">
            <div 
              className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden border border-white/15 bg-[#0b0e13] shadow-[0_15px_45px_rgba(0,0,0,0.8)] group"
              onMouseEnter={() => setCursor('VIEW')}
              onMouseLeave={() => setCursor('default')}
            >
              <video
                src="https://www.pexels.com/download/video/8053487/"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/90 via-black/10 to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-[#050607]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 font-space text-[11px] text-[#FF3038] font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3038] animate-ping" />
                ACADEMY LIVE DRILLS
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none">
                <div>
                  <span className="reveal-label font-space text-xs text-[#FF3038] tracking-widest uppercase">
                    BERLIN OLYMPIC HUB // COURT 01
                  </span>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] mt-0.5">
                    BIOMECHANICS & SMASH TELEMETRY
                  </h3>
                </div>
                <div className="bg-[#050607]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-space text-[#A7AAA8] self-start sm:self-auto">
                  HIGH SPEED 120 FPS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4-STEP COACHING TIMELINE (01 ASSESS -> 02 BUILD -> 03 TRAIN -> 04 COMPETE) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 px-5 sm:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="mb-16">
          <span className="reveal-label font-space text-xs text-[#FF3038] tracking-widest uppercase">
            THE 4-STAGE ATHLETE PIPELINE
          </span>
          <h2 className="font-bebas text-5xl sm:text-7xl tracking-tight text-[#F5F5F2] leading-[0.9] mt-2">
            <span className="masked-heading-wrapper"><span className="reveal-line">HOW PROGRESS <span className="bg-gradient-to-r from-[#FF3038] to-[#FF9838] bg-clip-text text-transparent">HAPPENS.</span></span></span>
          </h2>
          <p className="reveal-para font-manrope text-sm sm:text-base text-[#A7AAA8] max-w-xl mt-3">
            Click through our 4-phase transformation roadmap. Every player undergoes an objective diagnostic before advancing to high-cadence tournament play.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {TIMELINE_STEPS.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => setActiveStep(idx)}
              onMouseEnter={() => setCursor('GO')}
              onMouseLeave={() => setCursor('default')}
              className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                activeStep === idx
                  ? 'bg-gradient-to-r from-[#FF3038] to-[#FF9838] text-[#050607] border-[#FF3038] shadow-[0_0_20px_rgba(255,48,56,0.3)]'
                  : 'bg-[#0d1015] text-[#A7AAA8] border-white/10 hover:border-white/20'
              }`}
            >
              <span className={`font-space text-xs tracking-widest block font-bold ${activeStep === idx ? 'text-[#050607]' : 'text-[#FF3038]'}`}>
                STAGE {step.step}
              </span>
              <span className="font-bebas text-2xl sm:text-3xl mt-1 block">
                {step.name}
              </span>
            </button>
          ))}
        </div>

        {/* Active Stage Detailed Breakdown Panel */}
        <div className="bg-[#0b0e13] border border-white/10 rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#FF3038]/10 text-[#FF3038] font-space text-xs font-bold border border-[#FF3038]/20">
                {TIMELINE_STEPS[activeStep].stat}
              </span>
              <span className="font-space text-xs text-[#A7AAA8]">
                PHASE 0{activeStep + 1} OF 04
              </span>
            </div>

            <h3 className="font-bebas text-4xl sm:text-6xl text-[#F5F5F2]">
              {TIMELINE_STEPS[activeStep].name}: <span className="bg-gradient-to-r from-[#FF3038] to-[#FF9838] bg-clip-text text-transparent">{TIMELINE_STEPS[activeStep].subtitle}</span>
            </h3>

            <p className="font-manrope text-base sm:text-lg text-[#A7AAA8] leading-relaxed mt-2">
              {TIMELINE_STEPS[activeStep].detail}
            </p>

            <div className="pt-6 border-t border-white/10 mt-4 flex items-center gap-6 text-xs font-space text-[#A7AAA8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF3038]" />
                <span>Standardized Biometric Metrics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF3038]" />
                <span>Coach Video Review Log</span>
              </div>
            </div>
          </div>

          <div 
            className="lg:col-span-5 relative h-72 sm:h-80 rounded-xl overflow-hidden border border-white/15 group"
            onMouseEnter={() => setCursor('VIEW')}
            onMouseLeave={() => setCursor('default')}
          >
            <img
              src={
                activeStep === 0 ? IMAGES.analysisLab :
                activeStep === 1 ? IMAGES.athletePrep :
                activeStep === 2 ? IMAGES.smashJump : IMAGES.coachingSession
              }
              alt={TIMELINE_STEPS[activeStep].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 font-space text-xs text-[#FF3038] uppercase tracking-wider">
              STAGE 0{activeStep + 1} LIVE DRILL ENVIRONMENT
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FACILITY SHOWCASE */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="reveal-label font-space text-xs text-[#FF3038] tracking-widest uppercase">
              INFRASTRUCTURE & ENVIRONMENT
            </span>
            <h2 className="font-bebas text-5xl sm:text-7xl tracking-tight text-[#F5F5F2] leading-[0.9] mt-2">
              <span className="masked-heading-wrapper"><span className="reveal-line">WHERE CHAMPIONS <span className="bg-gradient-to-r from-[#FF3038] to-[#FF9838] bg-clip-text text-transparent">DEVELOP.</span></span></span>
            </h2>
          </div>
          <p className="reveal-para font-manrope text-sm sm:text-base text-[#A7AAA8] max-w-md leading-relaxed">
            Every square meter of AERIS centers is designed to eliminate variables — anti-glare asymmetric lighting, calibrated humidity, and medical-grade recovery tools.
          </p>
        </div>

        {/* 4 Editorial Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACILITIES_DATA.map((fac, idx) => (
            <div
              key={fac.name}
              className="group bg-[#0b0e13] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#FF3038]/50 transition-all duration-300"
              onMouseEnter={() => setCursor('VIEW')}
              onMouseLeave={() => setCursor('default')}
            >
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#050607]/80 backdrop-blur px-3 py-1 rounded-full border border-white/10 font-space text-[10px] text-[#FF3038] font-bold">
                  FACILITY 0{idx + 1}
                </div>
                <div className="absolute bottom-4 left-4 font-space text-xs text-[#F5F5F2] font-semibold">
                  {fac.spec}
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-bebas text-3xl sm:text-4xl text-[#F5F5F2] group-hover:text-[#FF3038] transition-colors">
                  {fac.name}
                </h3>
                <p className="font-manrope text-sm text-[#A7AAA8] mt-3 leading-relaxed">
                  {fac.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 bg-gradient-to-r from-[#0d1218] via-[#121915] to-[#0d1218] border border-white/15 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="reveal-label font-space text-xs text-[#FF3038] tracking-widest uppercase">
              CAMPUS AUDIT & INTAKE
            </span>
            <h3 className="font-bebas text-4xl sm:text-5xl text-[#F5F5F2] mt-1">
              BOOK AN ACADEMY TOUR & SPEED EVALUATION
            </h3>
            <p className="font-manrope text-sm text-[#A7AAA8] mt-2 max-w-xl">
              Step onto our tournament courts, experience video telemetry tracking firsthand, and speak with our Head Performance Coach.
            </p>
          </div>

          <button
            onClick={() => setActivePage('contact')}
            onMouseEnter={() => setCursor('GO')}
            onMouseLeave={() => setCursor('default')}
            className="flex-shrink-0 inline-flex items-center gap-3 relative overflow-hidden group bg-gradient-to-br from-[#FF3038] to-[#FF9838] text-[#050607] font-space font-bold text-sm px-8 py-4 rounded-xl transition-all cursor-pointer active:scale-95 shadow-[0_0_25px_rgba(255,48,56,0.3)] hover:shadow-[0_0_40px_rgba(255,48,56,0.5)] hover:scale-[1.03] hover:-translate-y-0.5"
          >
            <span>SCHEDULE EVALUATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}