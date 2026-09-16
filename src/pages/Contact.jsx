import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin, Clock, Calendar, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCursor } from '../context/CursorContext';
import { IMAGES } from '../data/aerisData';

export default function Contact() {
  const { setCursor } = useCursor();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: 'Intermediate (Club Competitor)',
    program: 'Performance (Tier 03)',
    message: ''
  });

  const [courtHoverPoint, setCourtHoverPoint] = useState({ x: 50, y: 50 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger celebratory sports confetti
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF3038', '#FF9838', '#FFFFFF']
      });
    } catch (err) {
      // safe fallback
    }
  };

  const handleCourtMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCourtHoverPoint({ x, y });
  };

  return (
    <div className="relative min-h-screen bg-[#050607] text-[#F5F5F2] pt-24 pb-20 overflow-x-hidden">
      {/* ------------------------------------------------------------- */}
      {/* CONTACT HERO */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 reveal-label text-xs font-space text-[#FF3038] uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF3038] animate-ping" />
              ATHLETE INTAKE & EVALUATION SCHEDULING
            </div>

            <h1 className="font-bebas text-[clamp(3.5rem,6.5vw,6.5rem)] leading-[0.9] tracking-tight uppercase">
              READY TO PLAY <br />
              <span className="text-[#FF3038]">DIFFERENTLY?</span>
            </h1>

            <p className="reveal-para font-manrope text-base sm:text-lg text-[#A7AAA8] leading-relaxed mt-6">
              Start your training journey with AERIS. 
              Fill out the intake dossier below to reserve your baseline speed telemetry evaluation.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10 font-space">
              <div className="bg-[#0b0e13] border border-white/10 rounded-xl p-4">
                <span className="text-[11px] text-[#A7AAA8] tracking-wider uppercase block">CAMPUS NETWORK</span>
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] mt-1 block">BERLIN <span className="text-[#FF3038] text-sm font-space">& SG</span></span>
              </div>
              <div className="bg-[#0b0e13] border border-white/10 rounded-xl p-4">
                <span className="text-[11px] text-[#A7AAA8] tracking-wider uppercase block">AUDIT TURNAROUND</span>
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] mt-1 block">48 <span className="text-[#FF3038] text-sm font-space">HOURS</span></span>
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
                src={IMAGES.coachingSession}
                alt="AERIS Coaching Evaluation & Tactical Diagnostics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/90 via-transparent to-black/20 pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-[#050607]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 font-space text-[11px] text-[#FF3038] font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3038] animate-ping" />
                ON-SITE CONSULTATION & LAB
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none">
                <div>
                  <span className="font-space text-xs text-[#FF3038] tracking-widest uppercase">
                    INTAKE EVALUATION
                  </span>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-[#F5F5F2] mt-0.5">
                    DIAGNOSTIC SPEED AUDIT
                  </h3>
                </div>
                <div className="bg-[#050607]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-space text-[#A7AAA8] self-start sm:self-auto">
                  OLYMPIC HUBS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* MAIN SECTION: FORM + INTERACTIVE TACTICAL COURT */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Premium Intake Booking Form */}
          <div className="lg:col-span-6 bg-[#0a0d11] border border-white/10 rounded-2xl p-8 sm:p-10">
            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FF3038]/10 border border-[#FF3038] flex items-center justify-center text-[#FF3038] mb-6 shadow-[0_0_30px_rgba(199,255,61,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bebas text-4xl text-[#F5F5F2]">EVALUATION DOSSIER RECEIVED</h3>
                <p className="font-manrope text-sm text-[#A7AAA8] mt-3 max-w-md">
                  Thank you, <span className="text-[#FF3038] font-bold">{formData.name}</span>. An AERIS Performance Coach will review your athletic profile and confirm your baseline court session within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-space text-[#F5F5F2] hover:bg-[#FF3038] hover:text-[#050607] transition-all"
                >
                  SUBMIT ANOTHER ATHLETE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <span className="font-space text-xs text-[#FF3038] tracking-widest uppercase">
                    ATHLETE DOSSIER // STEP 01
                  </span>
                  <h3 className="font-bebas text-3xl sm:text-4xl text-[#F5F5F2] mt-1">
                    BOOK A SESSION
                  </h3>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-space text-[#A7AAA8] uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Viktor Axelsen"
                    className="w-full bg-[#050607] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-[#F5F5F2] focus:border-[#FF3038] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-space text-[#A7AAA8] uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="athlete@domain.com"
                      className="w-full bg-[#050607] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-[#F5F5F2] focus:border-[#FF3038] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-space text-[#A7AAA8] uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+49 170 000 0000"
                      className="w-full bg-[#050607] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-[#F5F5F2] focus:border-[#FF3038] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Experience Level & Program */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-space text-[#A7AAA8] uppercase tracking-wider">
                      Experience Level
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full bg-[#050607] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-[#F5F5F2] focus:border-[#FF3038] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option>Beginner (Fundamentals)</option>
                      <option>Intermediate (Club Competitor)</option>
                      <option>Advanced (Tournament Player)</option>
                      <option>Elite (National / Pro Circuit)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-space text-[#A7AAA8] uppercase tracking-wider">
                      Target Program
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full bg-[#050607] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-[#F5F5F2] focus:border-[#FF3038] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option>Foundation (Tier 01)</option>
                      <option>Development (Tier 02)</option>
                      <option>Performance (Tier 03)</option>
                      <option>Elite (Tier 04)</option>
                    </select>
                  </div>
                </div>

                {/* Goals & Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-space text-[#A7AAA8] uppercase tracking-wider">
                    Athletic Goals / Injury History
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your current competitive level, smash velocity goals, or tournament timeline..."
                    className="w-full bg-[#050607] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-[#F5F5F2] focus:border-[#FF3038] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => setCursor('GO')}
                  onMouseLeave={() => setCursor('default')}
                  className="w-full mt-2 inline-flex items-center justify-center gap-3 bg-[#FF3038] hover:bg-[#FF9838] text-[#050607] font-space font-extrabold text-sm py-4 rounded-xl shadow-[0_0_25px_rgba(199,255,61,0.3)] transition-all cursor-pointer active:scale-95"
                >
                  <span>SUBMIT APPLICATION & BOOK SESSION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Interactive Badminton Court Visualizer & Location Telemetry */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            {/* Interactive Badminton Court Visualizer */}
            <div 
              onMouseMove={handleCourtMouseMove}
              onMouseEnter={() => setCursor('MOVE')}
              onMouseLeave={() => setCursor('default')}
              className="relative w-full h-[360px] sm:h-[420px] bg-[#070d09] border border-[#FF3038]/30 rounded-2xl overflow-hidden p-6 flex flex-col justify-between cursor-crosshair group shadow-2xl"
            >
              {/* Subtle court glow following mouse */}
              <div 
                className="absolute w-40 h-40 rounded-full bg-[#FF3038]/15 blur-2xl pointer-events-none transition-all duration-75"
                style={{
                  left: `${courtHoverPoint.x}%`,
                  top: `${courtHoverPoint.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Court SVG Blueprint with Official Badminton Court Grid Lines */}
              <svg 
                viewBox="0 0 400 240" 
                className="absolute inset-0 w-full h-full p-4 pointer-events-none stroke-[#FF3038]/40"
                fill="none"
              >
                {/* Doubles Outer Court */}
                <rect x="20" y="20" width="360" height="200" strokeWidth="2" stroke="#F5F5F2" />
                {/* Singles Inner Sidelines */}
                <line x1="20" y1="36" x2="380" y2="36" strokeWidth="1" stroke="rgba(245,245,242,0.5)" />
                <line x1="20" y1="204" x2="380" y2="204" strokeWidth="1" stroke="rgba(245,245,242,0.5)" />
                {/* Long Service Lines */}
                <line x1="44" y1="20" x2="44" y2="220" strokeWidth="1" stroke="rgba(245,245,242,0.5)" />
                <line x1="356" y1="20" x2="356" y2="220" strokeWidth="1" stroke="rgba(245,245,242,0.5)" />
                {/* Short Service Lines */}
                <line x1="150" y1="20" x2="150" y2="220" strokeWidth="1.5" stroke="#FF3038" />
                <line x1="250" y1="20" x2="250" y2="220" strokeWidth="1.5" stroke="#FF3038" />
                {/* Center Net */}
                <line x1="200" y1="12" x2="200" y2="228" strokeWidth="2.5" stroke="#FFFFFF" strokeDasharray="4 2" />
                {/* Center Lines */}
                <line x1="44" y1="120" x2="150" y2="120" strokeWidth="1" stroke="rgba(245,245,242,0.7)" />
                <line x1="250" y1="120" x2="356" y2="120" strokeWidth="1" stroke="rgba(245,245,242,0.7)" />
              </svg>

              {/* Interactive Target Marker following mouse */}
              <div 
                className="absolute pointer-events-none transition-transform duration-75"
                style={{
                  left: `${courtHoverPoint.x}%`,
                  top: `${courtHoverPoint.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-8 h-8 rounded-full border border-[#FF3038] flex items-center justify-center animate-spin">
                  <div className="w-2 h-2 rounded-full bg-[#FF3038]" />
                </div>
              </div>

              {/* Tactical Overlay Information */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-[#050607]/80 backdrop-blur px-3 py-1 rounded-full border border-white/10 font-space text-[11px] text-[#FF3038] font-bold">
                  AERIS PERFORMANCE CENTER // COURT 01
                </div>
                <div className="font-space text-[10px] text-[#A7AAA8]">
                  COORDS: X:{Math.round(courtHoverPoint.x)} Y:{Math.round(courtHoverPoint.y)}
                </div>
              </div>

              <div className="relative z-10 bg-[#050607]/80 backdrop-blur p-4 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-space text-[#A7AAA8] block">CURRENT COURT STATUS</span>
                  <span className="font-bebas text-xl text-[#F5F5F2]">TELEMETRY SESSION ACTIVE</span>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#FF3038] animate-ping" />
              </div>
            </div>

            {/* Direct Contact & Training Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0b0e13] border border-white/10 p-6 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FF3038] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-space text-[#A7AAA8] uppercase tracking-wider block">DIRECT HOTLINE</span>
                  <span className="font-space text-sm text-[#F5F5F2] font-semibold mt-1 block">+49 (0) 30 8920 4410</span>
                  <span className="text-xs font-manrope text-[#A7AAA8]">Mon - Sat: 08:00 - 21:00 CET</span>
                </div>
              </div>

              <div className="bg-[#0b0e13] border border-white/10 p-6 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#52e5ff] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-space text-[#A7AAA8] uppercase tracking-wider block">PERFORMANCE INTAKE</span>
                  <span className="font-space text-sm text-[#F5F5F2] font-semibold mt-1 block">intake@aeris-academy.com</span>
                  <span className="text-xs font-manrope text-[#A7AAA8]">24hr response standard</span>
                </div>
              </div>

              <div className="bg-[#0b0e13] border border-white/10 p-6 rounded-xl flex items-start gap-4 sm:col-span-2">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#f8e71c] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-space text-[#A7AAA8] uppercase tracking-wider block">MAIN CAMPUS LOCATION</span>
                  <span className="font-space text-sm text-[#F5F5F2] font-semibold mt-1 block">
                    AERIS Center Berlin, Am Sportforum 14, 13055 Berlin
                  </span>
                  <span className="text-xs font-manrope text-[#A7AAA8]">
                    Satellite High-Performance Lab: 1 Stadium Walk, Singapore
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
