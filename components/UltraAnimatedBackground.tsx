'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';
import { Points, PointMaterial, MeshDistortMaterial, Sphere, Stars, Trail, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { createNoise3D, createNoise4D } from 'simplex-noise';

// Advanced Particle System with Color Gradients
function EnhancedParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 8000;
  
  const [positions, colors, scales] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    
    const goldColor = new THREE.Color('#c9a76f');
    const lightGold = new THREE.Color('#f4e5c3');
    const darkGold = new THREE.Color('#b8965f');
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const radius = Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color gradient based on position
      const colorMix = Math.random();
      const color = colorMix < 0.33 ? goldColor : colorMix < 0.66 ? lightGold : darkGold;
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      scales[i] = Math.random() * 0.5 + 0.5;
    }
    
    return [positions, colors, scales];
  }, []);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Complex wave motion
      positions[i3] = x + Math.sin(time * 0.5 + y * 0.01) * 0.02;
      positions[i3 + 1] = y + Math.cos(time * 0.3 + z * 0.01) * 0.02;
      positions[i3 + 2] = z + Math.sin(time * 0.4 + x * 0.01) * 0.02;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
  });
  
  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.12}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Fluid-like Mesh with Complex Deformations
function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const noise3D = useMemo(() => createNoise3D(), []);
  const noise4D = useMemo(() => createNoise4D(), []);
  
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(8, 64);
  }, []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positionAttribute = meshRef.current.geometry.attributes.position;
    
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);
      
      const noiseValue = noise4D(x * 0.1, y * 0.1, z * 0.1, time * 0.3);
      const scale = 1 + noiseValue * 0.3;
      
      const vertex = new THREE.Vector3(x, y, z);
      vertex.normalize().multiplyScalar(8 * scale);
      
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    positionAttribute.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        color="#c9a76f"
        emissive="#d4b786"
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.4}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Animated DNA Helix Structure
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const helixPoints = 100;
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  
  return (
    <group ref={groupRef}>
      {Array.from({ length: helixPoints }).map((_, i) => {
        const t = i / helixPoints;
        const angle = t * Math.PI * 8;
        const radius = 6;
        const height = t * 30 - 15;
        
        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;
        
        return (
          <group key={i}>
            <Sphere position={[x1, height, z1]} args={[0.2, 16, 16]}>
              <meshStandardMaterial
                color="#c9a76f"
                emissive="#c9a76f"
                emissiveIntensity={2}
                toneMapped={false}
              />
            </Sphere>
            
            <Sphere position={[x2, height, z2]} args={[0.2, 16, 16]}>
              <meshStandardMaterial
                color="#d4b786"
                emissive="#d4b786"
                emissiveIntensity={2}
                toneMapped={false}
              />
            </Sphere>
            
            {/* Connecting line */}
            <Line
              start={new THREE.Vector3(x1, height, z1)}
              end={new THREE.Vector3(x2, height, z2)}
              color="#c9a76f"
            />
          </group>
        );
      })}
    </group>
  );
}

function Line({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([start, end]);
  }, [start, end]);
  
  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 });
  }, [color]);
  
  return <primitive object={new THREE.Line(geometry, material)} />;
}

// Pulsing Energy Rings
function EnergyRings() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <EnergyRing key={i} delay={i * 0.5} radius={10 + i * 3} />
      ))}
    </>
  );
}

function EnergyRing({ delay, radius }: { delay: number; radius: number }) {
  const torusRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!torusRef.current) return;
    
    const time = state.clock.elapsedTime + delay;
    const scale = 1 + Math.sin(time * 2) * 0.2;
    torusRef.current.scale.setScalar(scale);
    torusRef.current.rotation.x = time * 0.3;
    torusRef.current.rotation.y = time * 0.2;
    
    const material = torusRef.current.material as THREE.MeshStandardMaterial;
    material.opacity = 0.3 + Math.sin(time * 2) * 0.2;
  });
  
  return (
    <mesh ref={torusRef}>
      <torusGeometry args={[radius, 0.1, 16, 100]} />
      <meshStandardMaterial
        color="#c9a76f"
        emissive="#c9a76f"
        emissiveIntensity={1}
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
}

// Fractal Cube Formation
function FractalCubes() {
  const groupRef = useRef<THREE.Group>(null);
  const cubeCount = 50;
  
  const cubes = useMemo(() => {
    return Array.from({ length: cubeCount }).map((_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: 0.5 + Math.random() * 1,
      speed: 0.5 + Math.random() * 0.5,
    }));
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    groupRef.current.children.forEach((child, i) => {
      const time = state.clock.elapsedTime * cubes[i].speed;
      child.rotation.x = time;
      child.rotation.y = time * 0.7;
      child.position.y = cubes[i].position.y + Math.sin(time) * 2;
    });
  });
  
  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh
          key={i}
          position={cube.position}
          rotation={cube.rotation}
          scale={cube.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#c9a76f"
            emissive="#c9a76f"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// Spiraling Light Trails
function LightTrails() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <TrailingSphere key={i} index={i} />
      ))}
    </>
  );
}

function TrailingSphere({ index }: { index: number }) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const radius = 15;
  const speed = 0.5 + index * 0.1;
  
  useFrame((state) => {
    if (!sphereRef.current) return;
    
    const time = state.clock.elapsedTime * speed;
    const angle = time + (index / 10) * Math.PI * 2;
    
    sphereRef.current.position.x = Math.cos(angle) * radius;
    sphereRef.current.position.z = Math.sin(angle) * radius;
    sphereRef.current.position.y = Math.sin(time * 2) * 10;
  });
  
  return (
    <Trail
      width={2}
      length={8}
      color={new THREE.Color('#c9a76f')}
      attenuation={(t) => t * t}
    >
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#c9a76f"
          emissive="#c9a76f"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}

// Geometric Tunnel Effect
function GeometricTunnel() {
  const groupRef = useRef<THREE.Group>(null);
  const rings = 30;
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.z = time * 0.1;
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = time * (0.5 + i * 0.05);
      const offset = ((time * 2 + i) % rings) - rings / 2;
      child.position.z = offset * 3;
    });
  });
  
  return (
    <group ref={groupRef}>
      {Array.from({ length: rings }).map((_, i) => (
        <mesh key={i} position={[0, 0, i * 3 - (rings * 3) / 2]}>
          <torusGeometry args={[5 + i * 0.2, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#c9a76f"
            emissive="#c9a76f"
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Scene
function UltraScene() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 25;
  }, [camera]);
  
  return (
    <>
      {/* Enhanced Lighting Setup */}
      <ambientLight intensity={0.3} />
      <pointLight position={[20, 20, 20]} intensity={2} color="#c9a76f" />
      <pointLight position={[-20, -20, -20]} intensity={1} color="#d4b786" />
      <pointLight position={[0, 0, 30]} intensity={1.5} color="#f4e5c3" />
      <spotLight
        position={[0, 30, 0]}
        angle={0.4}
        intensity={2}
        color="#c9a76f"
        penumbra={1}
        castShadow
      />
      
      {/* Background Stars */}
      <Stars
        radius={150}
        depth={100}
        count={8000}
        factor={6}
        saturation={0.3}
        fade
        speed={2}
      />
      
      {/* All Visual Effects */}
      <Suspense fallback={null}>
        <EnhancedParticleField />
        <FluidMesh />
        <DNAHelix />
        <EnergyRings />
        <FractalCubes />
        <LightTrails />
        <GeometricTunnel />
      </Suspense>
      
      {/* Advanced Post Processing */}
      <EffectComposer multisampling={8}>
        <Bloom
          intensity={2}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
          radius={0.8}
        />
        <ChromaticAberration
          offset={[0.002, 0.002]}
          blendFunction={BlendFunction.NORMAL}
        />
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Vignette
          offset={0.3}
          darkness={0.5}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
        <Noise
          opacity={0.02}
          blendFunction={BlendFunction.OVERLAY}
        />
      </EffectComposer>
    </>
  );
}

// Main Ultra Animated Background
export default function UltraAnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 25], fov: 75 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        shadows
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 40, 100]} />
        <UltraScene />
      </Canvas>
      
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
      
      {/* Advanced Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      
      {/* Subtle Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
