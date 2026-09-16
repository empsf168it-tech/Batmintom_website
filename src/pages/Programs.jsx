import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Activity, Zap, Compass, Trophy, Sliders } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { PROGRAMS_DATA, IMAGES } from '../data/aerisData';

export default function Programs({ setActivePage }) {
  const { setCursor } = useCursor();
  const [activeTab, setActiveTab] = useState('all');
  
  // Interactive Performance Visualizer metrics state
  const [metricValues, setMetricValues] = useState({
    speed: 92,
    agility: 88,
    reaction: 95,
    accuracy: 90,
    endurance: 84
  });

  const handleSliderChange = (key, val) => {
    setMetricValues(prev => ({ ...prev, [key]: Number(val) }));
  };

  return (
    <div className="relative min-h-screen bg-[#050607] text-[#F5F5F2] pt-24 pb-20 overflow-x-hidden">
      {/* ------------------------------------------------------------- */}
      {/* PROGRAMS HERO */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 reveal-label text-xs font-space text-[#FF3038] uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF3038] animate-ping" />
              AERIS CURRICULUM ARCHITECTURE
            </div>

            <h1 className="font-bebas text-[clamp(3.5rem,6.5vw,6.5rem)] leading-[0.9] tracking-tight uppercase">
              CHOOSE YOUR <br />
              <span className="text-[#FF3038]">LEVEL.</span>
            </h1>

            <p className="reveal-para font-manrope text-base sm:text-lg text-[#A7AAA8] leading-relaxed mt-6">
              Every athlete begins with distinct biomechanical baselines. 
              Our 4 training tiers provide structured periodization, from fundamental court agility to pro-tour tournament readiness.
            </p>

            {/* Feature indicators */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10 font-space">
              <div className="bg-[#0b0e13] border border-white/10 rounded-xl p-4">
                <span className="text-[11px] text-[#A7AAA8] tracking-wider uppercase block">CURRICULUM</span>
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] mt-1 block">4 <span className="text-[#FF3038] text-sm font-space">PRO TIERS</span></span>
              </div>
              <div className="bg-[#0b0e13] border border-white/10 rounded-xl p-4">
                <span className="text-[11px] text-[#A7AAA8] tracking-wider uppercase block">TRAINING CADENCE</span>
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] mt-1 block">PERIODIZED <span className="text-[#FF3038] text-sm font-space">BLOCKS</span></span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image Showcase */}
          <div className="lg:col-span-6">
            <div 
              className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/15 bg-[#0b0e13] shadow-[0_15px_45px_rgba(0,0,0,0.8)] group"
              onMouseEnter={() => setCursor('VIEW')}
              onMouseLeave={() => setCursor('default')}
            >
              <img
                src={IMAGES.heroAction}
                alt="Elite Badminton Training Jump Smash"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/90 via-transparent to-black/20 pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-[#050607]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 font-space text-[11px] text-[#FF3038] font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3038] animate-ping" />
                ELITE ATHLETE CURRICULUM
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none">
                <div>
                  <span className="font-space text-xs text-[#FF3038] tracking-widest uppercase">
                    4 PROGRESSION TIERS
                  </span>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] mt-0.5">
                    HIGH-OCTANE COMPETITIVE PATHWAY
                  </h3>
                </div>
                <div className="bg-[#050607]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-space text-[#A7AAA8] self-start sm:self-auto">
                  PRO-TOUR READY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4 EDITORIAL PROGRAM TIERS WITH 3D HOVER */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex flex-col gap-16">
          {PROGRAMS_DATA.map((prog, idx) => (
            <div
              key={prog.id}
              className="group relative bg-[#0a0d11] border border-white/10 rounded-2xl overflow-hidden p-8 sm:p-12 transition-all duration-500 hover:border-[#FF3038]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
              onMouseEnter={() => setCursor('GO')}
              onMouseLeave={() => setCursor('default')}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Side: Editorial Typography & Structure */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-space text-xs text-[#FF3038] font-bold tracking-widest">
                        {prog.level}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="font-space text-xs text-[#A7AAA8] uppercase tracking-wider">
                        {prog.badge}
                      </span>
                    </div>

                    <h2 className="font-bebas text-5xl sm:text-7xl text-[#F5F5F2] mt-3 group-hover:text-[#FF3038] transition-colors leading-[0.9]">
                      {prog.name}
                    </h2>

                    <p className="font-space text-sm text-[#A7AAA8] mt-2 italic">
                      "{prog.tagline}"
                    </p>

                    <p className="font-manrope text-base text-[#A7AAA8] mt-6 leading-relaxed">
                      {prog.description}
                    </p>

                    {/* Program Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 mt-8 text-xs font-space">
                      <div>
                        <span className="text-[#A7AAA8] block">INTENSITY</span>
                        <span className="text-[#F5F5F2] font-semibold mt-0.5 block">{prog.intensity}</span>
                      </div>
                      <div>
                        <span className="text-[#A7AAA8] block">FREQUENCY</span>
                        <span className="text-[#FF3038] font-semibold mt-0.5 block">{prog.frequency}</span>
                      </div>
                      <div>
                        <span className="text-[#A7AAA8] block">CLASS SIZE</span>
                        <span className="text-[#F5F5F2] font-semibold mt-0.5 block">{prog.classSize}</span>
                      </div>
                    </div>

                    {/* Core Curricular Highlights */}
                    <div className="mt-8 flex flex-col gap-2.5">
                      <span className="font-space text-xs text-[#A7AAA8] tracking-widest uppercase">
                        SYLLABUS HIGHLIGHTS:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {prog.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs font-manrope text-[#F5F5F2]">
                            <div className="w-4 h-4 rounded-full bg-[#FF3038]/10 flex items-center justify-center text-[#FF3038] flex-shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setActivePage('contact')}
                      className="inline-flex items-center gap-3 bg-[#FF3038] hover:bg-[#FF9838] text-[#050607] font-space font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(199,255,61,0.2)] active:scale-95"
                    >
                      <span>APPLY FOR {prog.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-space text-[#A7AAA8]">
                      {prog.duration}
                    </span>
                  </div>
                </div>

                {/* Right Side: Cinematic Image Card with 3D Depth */}
                <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-xl overflow-hidden border border-white/15 group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={prog.image}
                    alt={prog.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-transparent to-black/30" />
                  <div className="absolute top-4 right-4 bg-[#050607]/80 backdrop-blur px-3.5 py-1.5 rounded-lg border border-white/10 font-space text-xs text-[#FF3038] font-bold">
                    {prog.level}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-xs font-space text-[#A7AAA8] uppercase">COACHING RATIO</div>
                    <div className="text-lg font-bebas text-[#F5F5F2]">{prog.classSize}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* PERFORMANCE VISUALIZER: "YOUR GAME, MEASURED" */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="reveal-label inline-flex items-center gap-2 text-xs font-space text-[#FF3038] uppercase tracking-widest mb-3">
              <Activity className="w-3.5 h-3.5" />
              INTERACTIVE METRIC LAB
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl tracking-tight text-[#F5F5F2] leading-[0.9]">
              YOUR GAME, <br />
              <span className="text-[#FF3038]">MEASURED.</span>
            </h2>
            <p className="font-manrope text-sm sm:text-base text-[#A7AAA8] leading-relaxed mt-4">
              Tune your target attributes. At AERIS, coaching is governed by biometric benchmarks. 
              Adjust the sliders to simulate how our training protocols recalibrate your baseline game telemetry.
            </p>

            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-space text-[#A7AAA8]">
              <span>CALCULATED READINESS INDEX</span>
              <span className="text-[#FF3038] font-bold font-bebas text-2xl">
                {Math.round((metricValues.speed + metricValues.agility + metricValues.reaction + metricValues.accuracy + metricValues.endurance) / 5)}%
              </span>
            </div>
          </div>

          {/* Interactive Radar / Sliders Board */}
          <div className="lg:col-span-7 bg-[#0b0e13] border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-space text-xs font-bold text-[#F5F5F2] uppercase tracking-wider">
                BIOMETRIC PARAMETER TUNING
              </span>
              <span className="font-space text-xs text-[#FF3038]">
                AERIS LIVE SIMULATOR
              </span>
            </div>

            {/* Slider 1: Speed */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-space">
                <span className="text-[#F5F5F2] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF3038]" />
                  SMASH SPEED (ACCELERATION & TORQUE)
                </span>
                <span className="text-[#FF3038] font-bold">{metricValues.speed}%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={metricValues.speed} 
                onChange={(e) => handleSliderChange('speed', e.target.value)}
                className="w-full accent-[#FF3038] cursor-pointer"
              />
            </div>

            {/* Slider 2: Agility */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-space">
                <span className="text-[#F5F5F2] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#52e5ff]" />
                  COURT AGILITY (SPLIT-STEP LATENCY)
                </span>
                <span className="text-[#52e5ff] font-bold">{metricValues.agility}%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={metricValues.agility} 
                onChange={(e) => handleSliderChange('agility', e.target.value)}
                className="w-full accent-[#52e5ff] cursor-pointer"
              />
            </div>

            {/* Slider 3: Reaction */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-space">
                <span className="text-[#F5F5F2] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f8e71c]" />
                  REFLEX & DEFENSE INTERCEPTION
                </span>
                <span className="text-[#f8e71c] font-bold">{metricValues.reaction}%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={metricValues.reaction} 
                onChange={(e) => handleSliderChange('reaction', e.target.value)}
                className="w-full accent-[#f8e71c] cursor-pointer"
              />
            </div>

            {/* Slider 4: Accuracy */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-space">
                <span className="text-[#F5F5F2] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff7052]" />
                  PINPOINT NET & CORNER ACCURACY
                </span>
                <span className="text-[#ff7052] font-bold">{metricValues.accuracy}%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={metricValues.accuracy} 
                onChange={(e) => handleSliderChange('accuracy', e.target.value)}
                className="w-full accent-[#ff7052] cursor-pointer"
              />
            </div>

            {/* Slider 5: Endurance */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-space">
                <span className="text-[#F5F5F2] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
                  RALLY ENDURANCE (&gt;185 BPM CAPACITY)
                </span>
                <span className="text-[#a855f7] font-bold">{metricValues.endurance}%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={metricValues.endurance} 
                onChange={(e) => handleSliderChange('endurance', e.target.value)}
                className="w-full accent-[#a855f7] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
