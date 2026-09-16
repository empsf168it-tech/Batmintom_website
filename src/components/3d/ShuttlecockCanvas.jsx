import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import RacketModel from './RacketModel';
import SpeedTrailParticles from './SpeedTrailParticles';

export default function ShuttlecockCanvas({ className = "w-full h-full", onInteract }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }

    const handleMouseMove = (e) => {
      // Normalize mouse between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <img 
          src="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=1200&auto=format&fit=crop" 
          alt="AERIS High Performance Carbon Racket"
          className="w-4/5 max-w-[460px] object-contain drop-shadow-[0_20px_50px_rgba(199,255,61,0.2)] animate-pulse"
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={() => { setIsHovered(true); onInteract?.('MOVE'); }}
      onMouseLeave={() => { setIsHovered(false); onInteract?.('DEFAULT'); }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.75} />
        {/* Key Front-Right Studio Light */}
        <directionalLight position={[4, 5, 4]} intensity={2.0} color="#ffffff" />
        {/* Soft Cool Fill Light */}
        <directionalLight position={[-4, 2, 2]} intensity={0.9} color="#b8c5d6" />
        {/* Signature Neon Crimson Rim Light */}
        <directionalLight position={[0, -3, -2]} intensity={2.6} color="#FF3038" />
        <spotLight 
          position={[0, 6, 2]} 
          intensity={2.4} 
          angle={0.65} 
          penumbra={0.8} 
          color="#ffffff" 
        />

        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            <RacketModel mousePos={mousePos} isHovered={isHovered} />
            <SpeedTrailParticles count={30} />
          </group>

          {/* Realistic Floor Shadow Beneath Racket */}
          <ContactShadows
            position={[0, -1.55, 0]}
            opacity={0.65}
            scale={5.8}
            blur={2.4}
            far={3.0}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
