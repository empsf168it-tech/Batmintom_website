import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

function CourtFloor() {
  // Badminton court official proportions scaled (Length 13.4m, Width 6.1m doubles, 5.18m singles)
  // Scale down by 0.5: L = 6.7, W = 3.05
  const courtL = 6.7;
  const courtW = 3.05;
  const singlesW = 2.59;
  const shortServiceDist = 0.99; // from center net
  const lineWidth = 0.035;

  return (
    <group position={[0, 0, 0]}>
      {/* Dark Graphite Court Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[courtW + 1.2, courtL + 1.2]} />
        <meshStandardMaterial 
          color="#0d1410" 
          roughness={0.8} 
          metalness={0.1} 
        />
      </mesh>

      {/* Playing Field Infield */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[courtW, courtL]} />
        <meshStandardMaterial 
          color="#12241b" 
          roughness={0.7} 
          metalness={0.15} 
        />
      </mesh>

      {/* COURT BOUNDARY LINES (White & Neon Crimson) */}
      {/* Outer Doubles Sidelines */}
      <mesh position={[-courtW / 2, 0.005, 0]}>
        <boxGeometry args={[lineWidth, 0.01, courtL]} />
        <meshBasicMaterial color="#F5F5F2" />
      </mesh>
      <mesh position={[courtW / 2, 0.005, 0]}>
        <boxGeometry args={[lineWidth, 0.01, courtL]} />
        <meshBasicMaterial color="#F5F5F2" />
      </mesh>

      {/* Inner Singles Sidelines */}
      <mesh position={[-singlesW / 2, 0.005, 0]}>
        <boxGeometry args={[lineWidth, 0.01, courtL]} />
        <meshBasicMaterial color="#F5F5F2" transparent={true} opacity={0.6} />
      </mesh>
      <mesh position={[singlesW / 2, 0.005, 0]}>
        <boxGeometry args={[lineWidth, 0.01, courtL]} />
        <meshBasicMaterial color="#F5F5F2" transparent={true} opacity={0.6} />
      </mesh>

      {/* Back Baselines */}
      <mesh position={[0, 0.005, -courtL / 2]}>
        <boxGeometry args={[courtW, 0.01, lineWidth]} />
        <meshBasicMaterial color="#F5F5F2" />
      </mesh>
      <mesh position={[0, 0.005, courtL / 2]}>
        <boxGeometry args={[courtW, 0.01, lineWidth]} />
        <meshBasicMaterial color="#F5F5F2" />
      </mesh>

      {/* Doubles Long Service Lines (0.76m from baseline) */}
      <mesh position={[0, 0.005, -courtL / 2 + 0.38]}>
        <boxGeometry args={[courtW, 0.01, lineWidth]} />
        <meshBasicMaterial color="#F5F5F2" />
      </mesh>
      <mesh position={[0, 0.005, courtL / 2 - 0.38]}>
        <boxGeometry args={[courtW, 0.01, lineWidth]} />
        <meshBasicMaterial color="#F5F5F2" />
      </mesh>

      {/* Short Service Lines */}
      <mesh position={[0, 0.005, -shortServiceDist]}>
        <boxGeometry args={[courtW, 0.01, lineWidth]} />
        <meshBasicMaterial color="#FF3038" />
      </mesh>
      <mesh position={[0, 0.005, shortServiceDist]}>
        <boxGeometry args={[courtW, 0.01, lineWidth]} />
        <meshBasicMaterial color="#FF3038" />
      </mesh>

      {/* Center Service Line */}
      <mesh position={[0, 0.005, -(courtL / 2 + shortServiceDist) / 2]}>
        <boxGeometry args={[lineWidth, 0.01, courtL / 2 - shortServiceDist]} />
        <meshBasicMaterial color="#F5F5F2" />
      </mesh>
      <mesh position={[0, 0.005, (courtL / 2 + shortServiceDist) / 2]}>
        <boxGeometry args={[lineWidth, 0.01, courtL / 2 - shortServiceDist]} />
        <meshBasicMaterial color="#F5F5F2" />
      </mesh>

      {/* NET ASSEMBLY */}
      <group position={[0, 0.38, 0]}>
        {/* Net Posts */}
        <mesh position={[-courtW / 2 - 0.1, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.78, 16]} />
          <meshStandardMaterial color="#2c333a" metalness={0.8} />
        </mesh>
        <mesh position={[courtW / 2 + 0.1, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.78, 16]} />
          <meshStandardMaterial color="#2c333a" metalness={0.8} />
        </mesh>

        {/* Net Mesh plane */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[courtW + 0.2, 0.38, 0.015]} />
          <meshStandardMaterial 
            color="#251b14" 
            roughness={0.9} 
            transparent={true} 
            opacity={0.7} 
          />
        </mesh>

        {/* White Top Net Tape */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[courtW + 0.2, 0.04, 0.02]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

function PlayerMarker({ position, label, subLabel, color = "#FF3038" }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += 0.015;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
    ringRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <group position={position}>
      {/* Pulsing ring on floor */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh ref={ringRef} position={[0, 0, 0.02]}>
          <ringGeometry args={[0.22, 0.26, 32]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.18, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} />
        </mesh>
      </group>

      {/* Kinetic Pillar Beam */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Label billboard in 3D */}
      <group position={[0, 1.05, 0]}>
        <Text
          fontSize={0.16}
          color="#F5F5F2"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#050607"
        >
          {label}
        </Text>
        <Text
          position={[0, -0.15, 0]}
          fontSize={0.1}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {subLabel}
        </Text>
      </group>
    </group>
  );
}

function TrajectoryArc() {
  const lineRef = useRef();

  const curvePoints = React.useMemo(() => {
    // Parabolic jump smash trajectory arc from deep baseline over net into corner
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.8, 1.8, 2.8),     // Smash contact point (airborne)
      new THREE.Vector3(0.5, 1.3, 1.4),     // Clearing the net
      new THREE.Vector3(0.2, 0.8, 0.0),     // Over net tape
      new THREE.Vector3(-0.9, 0.2, -1.8),   // Steep downward vector
      new THREE.Vector3(-1.0, 0.02, -2.2)   // Sharp court sideline intercept
    ]);
    return curve.getPoints(50);
  }, []);

  const lineGeo = React.useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    return geo;
  }, [curvePoints]);

  return (
    <group>
      <line geometry={lineGeo}>
        <lineBasicMaterial color="#FF3038" linewidth={2} />
      </line>

      {/* Simulated shuttlecock traveling along apex */}
      <mesh position={[0.2, 0.8, 0.0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export default function CourtCanvas({ activeFocus = "SPEED" }) {
  const [cameraView, setCameraView] = useState("isometric");

  return (
    <div className="relative w-full h-[540px] md:h-[640px] bg-[#07090b] rounded-2xl border border-white/10 overflow-hidden">
      {/* Tactical Mode Header Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 bg-[#050607]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF3038] to-[#FF9838] animate-ping" />
          <span className="font-space text-xs font-semibold uppercase tracking-widest text-[#F5F5F2]">
            AERIS 3D COURT TELEMETRY
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button 
            onClick={() => setCameraView("isometric")}
            className={`px-3 py-1.5 rounded-full text-xs font-space tracking-wider uppercase transition-all ${
              cameraView === "isometric" 
                ? "bg-gradient-to-r from-[#FF3038] to-[#FF9838] text-[#050607] font-bold" 
                : "bg-white/5 text-[#A7AAA8] hover:text-white border border-white/10"
            }`}
          >
            Tactical Angle
          </button>
          <button 
            onClick={() => setCameraView("baseline")}
            className={`px-3 py-1.5 rounded-full text-xs font-space tracking-wider uppercase transition-all ${
              cameraView === "baseline" 
                ? "bg-gradient-to-r from-[#FF3038] to-[#FF9838] text-[#050607] font-bold" 
                : "bg-white/5 text-[#A7AAA8] hover:text-white border border-white/10"
            }`}
          >
            Player POV
          </button>
        </div>
      </div>

      {/* Floating Tactical Legends */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:flex flex-col gap-1.5 bg-[#050607]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-xs pointer-events-none">
        <div className="flex items-center justify-between text-xs font-space text-[#A7AAA8]">
          <span>ATTACK VECTOR</span>
          <span className="text-[#FF3038] font-mono">14.8Â° STEEP</span>
        </div>
        <div className="flex items-center justify-between text-xs font-space text-[#A7AAA8]">
          <span>EXIT VELOCITY</span>
          <span className="text-[#FF3038] font-mono">493 KM/H</span>
        </div>
        <div className="flex items-center justify-between text-xs font-space text-[#A7AAA8]">
          <span>NET CLEARANCE</span>
          <span className="text-[#F5F5F2] font-mono">4.2 CM</span>
        </div>
      </div>

      {/* Orbit & Interaction Hint */}
      <div className="absolute bottom-4 right-4 z-10 text-[11px] font-space tracking-wider uppercase text-[#A7AAA8] bg-[#050607]/70 backdrop-blur px-3 py-1.5 rounded-lg border border-white/5 pointer-events-none">
        Drag to rotate â€¢ Scroll to zoom
      </div>

      <Canvas
        camera={{
          position: cameraView === "isometric" ? [3.8, 4.2, 5.2] : [0, 1.8, 4.8],
          fov: 46
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#7ba88a" />
        <directionalLight position={[0, -2, 0]} intensity={0.4} color="#FF3038" />

        <CourtFloor />
        
        {/* Markers for key tactical zones */}
        <PlayerMarker 
          position={[0.8, 0, 2.5]} 
          label="SPEED" 
          subLabel="AIRBORNE SMASH // 493 KM/H" 
          color="#FF3038"
        />
        <PlayerMarker 
          position={[-0.9, 0, -2.1]} 
          label="REACTION" 
          subLabel="DEFENSIVE INTERCEPT // 0.21S" 
          color="#52e5ff"
        />
        <PlayerMarker 
          position={[0, 0, 0.4]} 
          label="POSITION" 
          subLabel="T-JUNCTION ANCHOR // 98.4%" 
          color="#f8e71c"
        />

        <TrajectoryArc />

        <OrbitControls 
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={3.5}
          maxDistance={9.5}
          autoRotate={true}
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
