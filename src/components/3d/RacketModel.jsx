import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RacketModel({ mousePos = { x: 0, y: 0 }, isHovered = false }) {
  const racketGroupRef = useRef();
  const spinRef = useRef();

  // High-tension string mesh for the racket head
  const stringsLines = useMemo(() => {
    const points = [];
    const numVertical = 14;
    const numHorizontal = 18;

    // Vertical main strings
    for (let i = -numVertical / 2; i <= numVertical / 2; i++) {
      const x = (i / (numVertical / 2)) * 0.38;
      const maxY = Math.sqrt(Math.max(0, 1 - Math.pow(x / 0.44, 2))) * 0.56;
      if (maxY > 0.04) {
        points.push(new THREE.Vector3(x, -maxY, 0));
        points.push(new THREE.Vector3(x, maxY, 0));
      }
    }

    // Horizontal cross strings
    for (let j = -numHorizontal / 2; j <= numHorizontal / 2; j++) {
      const y = (j / (numHorizontal / 2)) * 0.5;
      const maxX = Math.sqrt(Math.max(0, 1 - Math.pow(y / 0.56, 2))) * 0.44;
      if (maxX > 0.04) {
        points.push(new THREE.Vector3(-maxX, y, 0));
        points.push(new THREE.Vector3(maxX, y, 0));
      }
    }

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  // Frame animation loop: Natural floating, face-forward presentation & responsive mouse tilt
  useFrame((state, delta) => {
    if (!racketGroupRef.current) return;

    const time = state.clock.getElapsedTime();

    // 1. Natural levitation bobbing
    const hoverY = Math.sin(time * 1.5) * 0.06;

    // 2. Elegant face-revealing sweeping swing (alternating face display so wide head is always clear)
    const faceWobble = Math.sin(time * 0.8) * 0.22;

    // 3. Resting diagonal athletic pose: angled gracefully in the hero section with wide face visible
    const baseRotX = 0.12;
    const baseRotY = -0.15 + faceWobble;
    const baseRotZ = -0.24;

    // 4. Mouse reactivity (tilts towards cursor smoothly)
    const targetRotX = baseRotX + (mousePos.y * -0.12);
    const targetRotY = baseRotY + (mousePos.x * 0.28);
    const targetRotZ = baseRotZ + (mousePos.x * -0.08);

    const targetPosX = (mousePos.x * 0.15);
    const targetPosY = hoverY + (mousePos.y * 0.12);
    const targetPosZ = mousePos.y * 0.15;

    racketGroupRef.current.rotation.x = THREE.MathUtils.lerp(racketGroupRef.current.rotation.x, targetRotX, delta * 3.6);
    racketGroupRef.current.rotation.y = THREE.MathUtils.lerp(racketGroupRef.current.rotation.y, targetRotY, delta * 3.2);
    racketGroupRef.current.rotation.z = THREE.MathUtils.lerp(racketGroupRef.current.rotation.z, targetRotZ, delta * 3.6);

    racketGroupRef.current.position.x = THREE.MathUtils.lerp(racketGroupRef.current.position.x, targetPosX, delta * 4.0);
    racketGroupRef.current.position.y = THREE.MathUtils.lerp(racketGroupRef.current.position.y, targetPosY, delta * 4.0);
    racketGroupRef.current.position.z = THREE.MathUtils.lerp(racketGroupRef.current.position.z, targetPosZ, delta * 4.0);

    const targetScale = isHovered ? 1.04 : 0.98;
    racketGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 4.0);
  });

  return (
    <group ref={racketGroupRef} position={[0, 0, 0]} scale={[0.98, 0.98, 0.98]}>
      {/* Centered racket geometry balanced around Y=0 in Pure Pearl White */}
      <group ref={spinRef} position={[0, 0, 0]}>
        {/* ----------------------------------------------------------- */}
        {/* 1. ISOMETRIC RACKET HEAD FRAME (Pure White Pearl Gloss)     */}
        {/* ----------------------------------------------------------- */}
        <group position={[0, 0.65, 0]}>
          {/* Main Aerodynamic Pearl White Frame */}
          <mesh scale={[0.92, 1.20, 0.55]}>
            <torusGeometry args={[0.48, 0.026, 16, 64]} />
            <meshStandardMaterial
              color="#FFFFFF"
              roughness={0.15}
              metalness={0.2}
            />
          </mesh>

          {/* Inner Accent Inlay: AERIS Neon Crimson Speed Stripes */}
          <mesh scale={[0.925, 1.205, 0.56]}>
            <torusGeometry args={[0.48, 0.009, 12, 48, Math.PI * 0.7]} />
            <meshStandardMaterial
              color="#FF3038"
              roughness={0.2}
              metalness={0.4}
              emissive="#FF3038"
              emissiveIntensity={0.6}
            />
          </mesh>

          {/* High-Tension String Bed */}
          <lineSegments geometry={stringsLines}>
            <lineBasicMaterial
              color="#FFFFFF"
              transparent={true}
              opacity={0.8}
              linewidth={1.2}
            />
          </lineSegments>

          {/* Center Sweet Spot Target Graphic */}
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.07, 0.12, 32]} />
            <meshBasicMaterial
              color="#FF3038"
              transparent={true}
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* ----------------------------------------------------------- */}
        {/* 2. REINFORCED BUILT-IN T-JOINT                              */}
        {/* ----------------------------------------------------------- */}
        <group position={[0, 0.08, 0]}>
          <mesh>
            <cylinderGeometry args={[0.034, 0.025, 0.08, 16]} />
            <meshStandardMaterial
              color="#FFFFFF"
              roughness={0.2}
              metalness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
            <meshStandardMaterial
              color="#FF3038"
              roughness={0.2}
              metalness={0.5}
              emissive="#FF3038"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>

        {/* ----------------------------------------------------------- */}
        {/* 3. ULTRA-SLIM GRAPHITE SHAFT (Pure White Gloss)             */}
        {/* ----------------------------------------------------------- */}
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.016, 0.018, 0.92, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.18}
            metalness={0.25}
          />
        </mesh>

        {/* Shaft Aerodynamic Neon Crimson Stripes */}
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.0185, 0.0185, 0.03, 16]} />
          <meshStandardMaterial
            color="#FF3038"
            roughness={0.2}
            metalness={0.5}
            emissive="#FF3038"
            emissiveIntensity={0.7}
          />
        </mesh>
        <mesh position={[0, -0.36, 0]}>
          <cylinderGeometry args={[0.0182, 0.0182, 0.015, 16]} />
          <meshStandardMaterial
            color="#050607"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        {/* ----------------------------------------------------------- */}
        {/* 4. CONTROL SUPPORT CONE CAP                                 */}
        {/* ----------------------------------------------------------- */}
        <mesh position={[0, -0.92, 0]}>
          <cylinderGeometry args={[0.018, 0.034, 0.08, 16]} />
          <meshStandardMaterial
            color="#F0F2F5"
            roughness={0.25}
            metalness={0.3}
          />
        </mesh>

        {/* ----------------------------------------------------------- */}
        {/* 5. ERGONOMIC WHITE CUSHIONED GRIP HANDLE                    */}
        {/* ----------------------------------------------------------- */}
        <mesh position={[0, -1.28, 0]}>
          <cylinderGeometry args={[0.036, 0.038, 0.64, 16]} />
          <meshStandardMaterial
            color="#F5F6F8"
            roughness={0.65}
            metalness={0.05}
          />
        </mesh>

        {/* Spiral Grip Tape Wrap Ridges */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} position={[0, -1.02 - i * 0.1, 0]} rotation={[0, 0, 0.07]}>
            <torusGeometry args={[0.0375, 0.0035, 8, 24]} />
            <meshStandardMaterial
              color="#D8DCE0"
              roughness={0.6}
              metalness={0.1}
            />
          </mesh>
        ))}

        {/* AERIS Butt Cap (Neon Crimson Base) */}
        <mesh position={[0, -1.61, 0]}>
          <cylinderGeometry args={[0.04, 0.043, 0.04, 16]} />
          <meshStandardMaterial
            color="#FF3038"
            roughness={0.25}
            metalness={0.4}
            emissive="#FF3038"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}
