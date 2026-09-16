import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ShuttlecockModel({ mousePos = { x: 0, y: 0 }, isHovered = false }) {
  const outerGroupRef = useRef();
  const innerSpinRef = useRef();

  // BWF Official Scaled Proportions
  const CORK_RADIUS = 0.28;
  const CORK_HEIGHT = 0.38;
  const BASE_RADIUS = 0.25;  // Where quills insert into the top of cork
  const TOP_RADIUS = 0.68;   // Outer flared feather rim diameter
  const FEATHER_LEN = 1.32;  // Feather length along cone

  // 16 Feathers geometry & placement
  const feathers = useMemo(() => {
    const count = 16;
    const items = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const baseX = Math.cos(angle) * BASE_RADIUS;
      const baseZ = Math.sin(angle) * BASE_RADIUS;
      const topX = Math.cos(angle) * TOP_RADIUS;
      const topZ = Math.sin(angle) * TOP_RADIUS;

      items.push({
        id: i,
        angle,
        baseX,
        baseZ,
        topX,
        topZ,
        rotY: -angle + Math.PI / 2 + 0.16, // Natural overlap shingle angle
      });
    }
    return items;
  }, []);

  // Precise radii for the two woven nylon thread rings
  const lowerThreadHeight = 0.44;
  const upperThreadHeight = 0.86;
  const lowerThreadRadius = BASE_RADIUS + (TOP_RADIUS - BASE_RADIUS) * (lowerThreadHeight / FEATHER_LEN);
  const upperThreadRadius = BASE_RADIUS + (TOP_RADIUS - BASE_RADIUS) * (upperThreadHeight / FEATHER_LEN);

  // Smooth curved feather vane shape
  const featherVaneGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.02, 0);
    shape.lineTo(-0.065, 0.3);
    shape.bezierCurveTo(-0.095, 0.6, -0.098, 0.95, -0.05, 1.18);
    shape.bezierCurveTo(-0.02, 1.25, 0.02, 1.25, 0.05, 1.18);
    shape.bezierCurveTo(0.098, 0.95, 0.095, 0.6, 0.065, 0.3);
    shape.lineTo(0.02, 0);
    shape.closePath();

    return new THREE.ShapeGeometry(shape, 12);
  }, []);

  // Frame animation loop: Natural levitation, continuous smooth spin & responsive mouse tilt
  useFrame((state, delta) => {
    if (!outerGroupRef.current || !innerSpinRef.current) return;

    const time = state.clock.getElapsedTime();

    // 1. Gentle natural levitation / hover bobbing
    const idleHoverY = Math.sin(time * 1.8) * 0.07;
    const idleWobble = Math.sin(time * 1.2) * 0.03;

    // 2. Smooth continuous 360Â° rotation (Original exhibition animation)
    innerSpinRef.current.rotation.y += delta * 0.55;

    // 3. Mouse parallax tilt: subtle and precise (rotateX Â±4deg, rotateY Â±6deg)
    const targetTiltX = 0.28 + (mousePos.y * -0.12) + idleWobble; // Natural display forward tilt ~16Â°
    const targetTiltY = (mousePos.x * 0.18);
    const targetTiltZ = -0.15 + (mousePos.x * -0.08);

    const targetPosX = mousePos.x * 0.25;
    const targetPosY = idleHoverY + (mousePos.y * 0.15);
    const targetPosZ = mousePos.y * 0.2;

    // Smooth lerp
    outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(outerGroupRef.current.rotation.x, targetTiltX, delta * 3.5);
    outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(outerGroupRef.current.rotation.y, targetTiltY, delta * 3.5);
    outerGroupRef.current.rotation.z = THREE.MathUtils.lerp(outerGroupRef.current.rotation.z, targetTiltZ, delta * 3.5);

    outerGroupRef.current.position.x = THREE.MathUtils.lerp(outerGroupRef.current.position.x, targetPosX, delta * 4.0);
    outerGroupRef.current.position.y = THREE.MathUtils.lerp(outerGroupRef.current.position.y, targetPosY, delta * 4.0);
    outerGroupRef.current.position.z = THREE.MathUtils.lerp(outerGroupRef.current.position.z, targetPosZ, delta * 4.0);

    const targetScale = isHovered ? 1.04 : 1.0;
    outerGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 4.0);
  });

  return (
    <group ref={outerGroupRef} position={[0, 0, 0]}>
      {/* Internal group that performs continuous slow axial rotation */}
      <group ref={innerSpinRef}>
        {/* ----------------------------------------------------------- */}
        {/* 1. AUTHENTIC TOURNAMENT CORK BASE                           */}
        {/* ----------------------------------------------------------- */}
        <group position={[0, -0.62, 0]}>
          {/* Rounded Hemispherical Dome (Lead tip of shuttlecock) */}
          <mesh position={[0, -0.08, 0]}>
            <sphereGeometry args={[CORK_RADIUS, 32, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
            <meshStandardMaterial
              color="#F7F6F2"
              roughness={0.45}
              metalness={0.02}
            />
          </mesh>

          {/* Smooth cylindrical cork body */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[CORK_RADIUS * 0.98, CORK_RADIUS, CORK_HEIGHT * 0.65, 32]} />
            <meshStandardMaterial
              color="#F7F6F2"
              roughness={0.45}
              metalness={0.02}
            />
          </mesh>

          {/* Tournament Ribbon Band: Deep Charcoal with Metallic Finish */}
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[CORK_RADIUS * 0.985, CORK_RADIUS * 0.99, 0.085, 32]} />
            <meshStandardMaterial
              color="#121519"
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>

          {/* Signature AERIS Neon Crimson Pinstripe on Band */}
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[CORK_RADIUS * 0.99, CORK_RADIUS * 0.99, 0.016, 32]} />
            <meshStandardMaterial
              color="#FF3038"
              roughness={0.2}
              metalness={0.3}
              emissive="#FF3038"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>

        {/* ----------------------------------------------------------- */}
        {/* 2. 16 GOOSE FEATHERS (Authentic Overlapping Conical Skirt)   */}
        {/* ----------------------------------------------------------- */}
        <group position={[0, -0.38, 0]}>
          {feathers.map((f) => {
            // Calculate quill angle towards cone flare
            const deltaX = f.topX - f.baseX;
            const deltaZ = f.topZ - f.baseZ;
            const hyp = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
            const inclineAngle = Math.atan2(hyp, FEATHER_LEN);

            return (
              <group key={f.id}>
                {/* Central Quill Shaft (Tapered natural spine) */}
                <mesh
                  position={[(f.baseX + f.topX) / 2, FEATHER_LEN / 2, (f.baseZ + f.topZ) / 2]}
                  rotation={[
                    inclineAngle * Math.cos(f.angle),
                    f.rotY,
                    inclineAngle * -Math.sin(f.angle),
                  ]}
                >
                  <cylinderGeometry args={[0.009, 0.017, FEATHER_LEN, 8]} />
                  <meshStandardMaterial
                    color="#FFFFFF"
                    roughness={0.3}
                    metalness={0.05}
                  />
                </mesh>

                {/* Overlapping Curved Feather Vane Blade */}
                <mesh
                  geometry={featherVaneGeo}
                  position={[f.baseX, 0.12, f.baseZ]}
                  rotation={[
                    inclineAngle * Math.cos(f.angle),
                    f.rotY,
                    inclineAngle * -Math.sin(f.angle),
                  ]}
                >
                  <meshStandardMaterial
                    color="#FFFFFF"
                    roughness={0.38}
                    metalness={0.02}
                    side={THREE.DoubleSide}
                    transparent={true}
                    opacity={0.97}
                  />
                </mesh>
              </group>
            );
          })}

          {/* --------------------------------------------------------- */}
          {/* 3. DUAL NYLON BINDING THREADS (Woven tightly on quills)    */}
          {/* --------------------------------------------------------- */}
          {/* Lower Thread Ring */}
          <mesh position={[0, lowerThreadHeight, 0]}>
            <torusGeometry args={[lowerThreadRadius, 0.007, 8, 48]} />
            <meshStandardMaterial
              color="#E2E6EA"
              roughness={0.5}
              metalness={0.1}
            />
          </mesh>

          {/* Upper Thread Ring with subtle crimson glow */}
          <mesh position={[0, upperThreadHeight, 0]}>
            <torusGeometry args={[upperThreadRadius, 0.007, 8, 48]} />
            <meshStandardMaterial
              color="#FF3038"
              roughness={0.3}
              metalness={0.3}
              emissive="#FF3038"
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
