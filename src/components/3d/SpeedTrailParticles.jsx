import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpeedTrailParticles({ count = 45, mouseVelocity = { x: 0, y: 0 } }) {
  const pointsRef = useRef();

  // Create stream particles oriented along shuttlecock trajectory
  const { positions, opacities, speeds, initialData } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const opac = new Float32Array(count);
    const spd = new Float32Array(count);
    const init = [];

    for (let i = 0; i < count; i++) {
      // Stream origin starts behind the cork/feathers
      const radius = 0.2 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 1.5;
      const z = -0.5 - Math.random() * 3.5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      opac[i] = Math.random() * 0.6;
      spd[i] = 1.2 + Math.random() * 2.4;

      init.push({ x, y, z, radius, angle, length: 0.8 + Math.random() * 1.5 });
    }

    return {
      positions: pos,
      opacities: opac,
      speeds: spd,
      initialData: init
    };
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const positionsArr = posAttr.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Stream particles backward along the Z-axis, reacting to mouse velocity
      positionsArr[idx + 2] -= delta * speeds[i] * 3.2;

      // Subtle wobble / turbulence
      positionsArr[idx] += Math.sin(state.clock.elapsedTime * 4 + i) * 0.003;
      positionsArr[idx + 1] += Math.cos(state.clock.elapsedTime * 4 + i) * 0.003;

      // Recycle particles when they stream past threshold
      if (positionsArr[idx + 2] < -4.5) {
        positionsArr[idx] = (Math.random() - 0.5) * 0.7;
        positionsArr[idx + 1] = -0.2 + (Math.random() - 0.5) * 0.6;
        positionsArr[idx + 2] = 0.2;
      }
    }

    posAttr.needsUpdate = true;
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
        size={0.065}
        color="#FF3038"
        transparent={true}
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}
