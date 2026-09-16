import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SpeedRays({ count = 28 }) {
  const meshRef = useRef();

  // Generate directional speed streak lines in 3D space
  const lines = useMemo(() => {
    const segments = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 9;
      const z = -2 - Math.random() * 8;
      const length = 1.5 + Math.random() * 3.5;
      const speed = 2.5 + Math.random() * 4.5;
      segments.push({ x, y, z, length, speed, alpha: 0.15 + Math.random() * 0.45 });
    }
    return segments;
  }, [count]);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const l = lines[i];
      positions[i * 6] = l.x;
      positions[i * 6 + 1] = l.y;
      positions[i * 6 + 2] = l.z;

      // Streak directed diagonally forward to simulate high smash trajectory
      positions[i * 6 + 3] = l.x - 0.3;
      positions[i * 6 + 4] = l.y - 0.4;
      positions[i * 6 + 5] = l.z + l.length;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [lines, count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const zIdx1 = i * 6 + 2;
      const zIdx2 = i * 6 + 5;
      const spd = lines[i].speed * delta * 2.8;

      pos[zIdx1] += spd;
      pos[zIdx2] += spd;

      // Loop streaks forward
      if (pos[zIdx1] > 4) {
        const resetZ = -10 - Math.random() * 4;
        pos[zIdx1] = resetZ;
        pos[zIdx2] = resetZ + lines[i].length;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={meshRef} geometry={geometry}>
      <lineBasicMaterial 
        color="#FF3038" 
        transparent={true} 
        opacity={0.35} 
        blending={THREE.AdditiveBlending}
        linewidth={1.5}
      />
    </lineSegments>
  );
}

function CourtPerspectiveGrid() {
  const gridRef = useRef();

  useFrame((state) => {
    if (!gridRef.current) return;
    // Gentle breathing shift
    gridRef.current.position.z = -1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
  });

  return (
    <group ref={gridRef} position={[0, -2.2, -4]} rotation={[-Math.PI / 2.3, 0, 0]}>
      {/* Court Floor Accent glow */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[14, 20]} />
        <meshBasicMaterial 
          color="#0b1712" 
          transparent={true} 
          opacity={0.4} 
        />
      </mesh>

      {/* Grid line markers */}
      <gridHelper 
        args={[18, 18, '#FF3038', '#1c2e24']} 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

function AtmosphericDust({ count = 80 }) {
  const pointsRef = useRef();

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [pos];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= delta * 0.15;
      if (pos[i * 3 + 1] < -6) pos[i * 3 + 1] = 6;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#F5F5F2"
        transparent={true}
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SpeedBackgroundCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <SpeedRays count={32} />
        <CourtPerspectiveGrid />
        <AtmosphericDust count={60} />
      </Canvas>
      {/* Dark vignette overlays for editorial contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-transparent to-[#050607]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050607] via-transparent to-[#050607]/90 pointer-events-none" />
    </div>
  );
}
