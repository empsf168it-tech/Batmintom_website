// AERIS Master Dataset: Assets, Telemetry, Programs, and Timelines

export const IMAGES = {
  // Hero & High Impact
  heroAction: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop", // Badminton player jump smash mid-air
  heroRacket: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=2070&auto=format&fit=crop", // Pro badminton racket strings detail
  shuttlecockMacro: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=2076&auto=format&fit=crop", // Extreme detail goose feather shuttlecock
  
  // Training Movements
  smashJump: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=1966&auto=format&fit=crop", // High-power jump smash
  footworkAgility: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop", // Explosive footwork on tournament court
  defenseDive: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=2070&auto=format&fit=crop", // Low reflex defense posture
  racketContact: "https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1974&auto=format&fit=crop", // High speed string impact
  athletePrep: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop", // Intense focus athletic focus
  recoveryIce: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop", // Recovery and sports science training

  // Academy & Facilities
  courtArena: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2073&auto=format&fit=crop", // Olympic standard indoor badminton arena
  gymPerformance: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop", // High-tech strength & conditioning center
  coachingSession: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop", // One-on-one tactical coaching analysis
  analysisLab: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop", // High frame rate motion telemetry tracking

  // Programs
  progFoundation: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
  progDevelopment: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
  progPerformance: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=1200&auto=format&fit=crop",
  progElite: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop",
};

export const TELEMETRY_METRICS = [
  { id: "smash", label: "SMASH SPEED", value: "493", unit: "KM/H", sub: "Recorded peak terminal velocity" },
  { id: "reaction", label: "REACTION TIME", value: "0.21", unit: "SEC", sub: "Net intercept reflex window" },
  { id: "precision", label: "CORNER PRECISION", value: "98.4", unit: "%", sub: "Baseline perimeter accuracy" },
  { id: "heartrate", label: "VO2 MAX TARGET", value: "68.2", unit: "ML/KG", sub: "Endurance threshold capacity" },
];

export const HORIZONTAL_TRAINING_MOVEMENTS = [
  {
    step: "01",
    title: "TERMINAL SMASH",
    tag: "POWER // 490+ KM/H",
    description: "Biomechanically sequenced rotational kinetic chain. From deep forearm pronation to airborne hip snapping, generate unreturnable downward trajectories.",
    metric: "493 KM/H",
    image: IMAGES.smashJump,
    vector: "Downward 14.8° Angled Vector"
  },
  {
    step: "02",
    title: "SPLIT-STEP FOOTWORK",
    tag: "AGILITY // 0.18S DECISION",
    description: "Pre-hop gravitational loading system that primes the calf complex to exploit kinetic ground rebound across all 6 court directional vectors instantly.",
    metric: "0.18 SEC",
    image: IMAGES.footworkAgility,
    vector: "6-Vector Isometric Dispersion"
  },
  {
    step: "03",
    title: "REFLEXIVE DEFENSE",
    tag: "STABILITY // 1.2M EXTENSION",
    description: "Low center-of-gravity lunge absorption with short wrist recoil. Neutralize full-court smashes and convert opponent aggression into tight net tumbles.",
    metric: "94% RETURN",
    image: IMAGES.defenseDive,
    vector: "Horizontal Center Deceleration"
  },
  {
    step: "04",
    title: "DECEPTIVE NET PLAY",
    tag: "PRECISION // 0.2MM CLEARANCE",
    description: "Late racket head manipulation and finger relaxation mechanics that camouflage cross-net slices right up to the final millisecond before shuttle contact.",
    metric: "0.2 MM",
    image: IMAGES.racketContact,
    vector: "Net Cord Micro-Trajectory"
  },
  {
    step: "05",
    title: "RAPID RECOVERY",
    tag: "READINESS // 24HR RESET",
    description: "Contrast thermal hydrotherapy, neuromuscular electrical stimulation, and load telemetry ensure elite athletes sustain maximal velocity through tournament week.",
    metric: "99.1% RESET",
    image: IMAGES.recoveryIce,
    vector: "Metabolic Restoration Loop"
  }
];

export const PROGRAMS_DATA = [
  {
    id: "foundation",
    level: "TIER 01",
    name: "FOUNDATION",
    tagline: "Build Your Fundamentals & Court Geometry",
    description: "Comprehensive kinetic re-education for players mastering basic stroke discipline, dynamic balance, and structured multi-shuttle endurance.",
    intensity: "Medium Intensity",
    frequency: "2 Sessions / Week",
    duration: "12 Weeks Guided",
    classSize: "Max 4 per Court",
    highlights: ["Grip Mechanics & Finger Power", "Standard 6-Point Footwork", "High Clear & Drop Trajectories", "Core Proprioception Drills"],
    image: IMAGES.progFoundation,
    badge: "FUNDAMENTALS"
  },
  {
    id: "development",
    level: "TIER 02",
    name: "DEVELOPMENT",
    tagline: "Speed, Tactical Recognition & Consistency",
    description: "Designed for intermediate club competitors ready to introduce deceptive wrist work, attacking clears, and continuous high-cadence rally preservation.",
    intensity: "High Cadence",
    frequency: "3 Sessions / Week",
    duration: "16 Weeks Intensive",
    classSize: "Max 3 per Court",
    highlights: ["Split-Step Timing Optimization", "Reverse Slice & Cross Drops", "Mid-Court Drive Interceptions", "High Frame Rate Video Review"],
    image: IMAGES.progDevelopment,
    badge: "PROGRESSION"
  },
  {
    id: "performance",
    level: "TIER 03",
    name: "PERFORMANCE",
    tagline: "Tournament Conditioning & Smash Velocity",
    description: "For sanctioned tournament players seeking explosive jump smash mechanics, defensive scramble resistance, and tactical match play simulation under stress.",
    intensity: "Maximum Dynamic Load",
    frequency: "4-5 Sessions / Week",
    duration: "Ongoing Performance Cycle",
    classSize: "Max 2 per Court / 1-on-1",
    highlights: ["Full Rotational Jump Smash", "Deceptive Net Flicking", "Lactate Threshold On-Court Conditioning", "Biometric Muscle Activation Sensors"],
    image: IMAGES.progPerformance,
    badge: "COMPETITIVE"
  },
  {
    id: "elite",
    level: "TIER 04",
    name: "ELITE",
    tagline: "National & International Competition Academy",
    description: "Full-immersion training program tailored to national circuit aspirants and touring pros. Includes tailored biomechanical coaching, mental coaching, and tournament support.",
    intensity: "Professional Standard",
    frequency: "6 Days / Week (Dual Daily)",
    duration: "Annual Elite Contract",
    classSize: "Exclusive 1-on-1 Coaching",
    highlights: ["World-Tour Match Strategy", "Cryotherapy & Dedicated Physio", "Pro Tour Tournament Traveling Coach", "Sensor-Embedded Racket Telemetry"],
    image: IMAGES.progElite,
    badge: "WORLD CLASS"
  }
];

export const TIMELINE_STEPS = [
  {
    step: "01",
    name: "ASSESS",
    subtitle: "Biomechanical & Speed Audit",
    detail: "High-speed camera telemetry calculates your stroke angle, wrist pronation velocity, ground reaction force, and split-step latency before you hit a single competitive shuttle.",
    stat: "120 FPS TELEMETRY"
  },
  {
    step: "02",
    name: "BUILD",
    subtitle: "Kinetic Chain Alignment",
    detail: "We isolate energy leaks in your kinetic chain—rebuilding stance, grip tension transitions, and core rotation to safeguard against shoulder impingement while doubling whip speed.",
    stat: "+35% TORQUE EFFICIENCY"
  },
  {
    step: "03",
    name: "TRAIN",
    subtitle: "Pressure State Conditioning",
    detail: "High-frequency multi-feeder regimens simulate high-pressure tournament rallies. Athletes execute repetitive decision-making at extreme heart rates (>185 BPM).",
    stat: "60+ SHUTTLES/MIN CADENCE"
  },
  {
    step: "04",
    name: "COMPETE",
    subtitle: "Tournament Execution & Analysis",
    detail: "Direct tournament tracking, tactical opponent profiling, and real-time interval corrections produce ruthless consistency on match point.",
    stat: "SANCTIONED VICTORY FOCUS"
  }
];

export const FACILITIES_DATA = [
  {
    name: "OAK & TARA TOURNAMENT COURTS",
    spec: "BWF Grade-1 Certified Mats",
    description: "9 Olympic-regulation courts engineered with double-cushioned spring subfloors to reduce joint shock by 42% while preserving instantaneous rebound snap.",
    image: IMAGES.courtArena
  },
  {
    name: "TELEMETRY & KINETIC LAB",
    spec: "Real-time High Speed Sensor Array",
    description: "Multi-angle 4K optical tracking combined with wearable IMUs captures racket head path, angle of attack, and shuttle exit velocity in milliseconds.",
    image: IMAGES.analysisLab
  },
  {
    name: "AERIS HIGH-LOAD STRENGTH DECK",
    spec: "Power & Plyometric Specific",
    description: "Custom Keiser pneumatic resistance machines, specialized rotational pulley towers, and force plates calibrated solely for badminton explosive movements.",
    image: IMAGES.gymPerformance
  },
  {
    name: "NEUROMUSCULAR RECOVERY SUITE",
    spec: "Cryo & Hyperbaric Recovery",
    description: "Sub-zero cold plunge tubs, contrast baths, compression boots, and dedicated sports physical therapists ensure complete recovery between high-intensity cycles.",
    image: IMAGES.recoveryIce
  }
];
