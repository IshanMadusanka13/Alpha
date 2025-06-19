'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, useAnimations } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useEffect, useRef, useLayoutEffect, useState } from 'react';
import * as THREE from 'three';

// Dragon 3D Model Component with Hero Integration
function Dragon({ dragonColor, accentColor, emissiveIntensity = 0.15, onDragonClick, heroColors }) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, '/dragon.glb');
  const { actions } = useAnimations(gltf.animations, group);

  // Apply colors to the dragon model with hero theme integration
  useLayoutEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Enhanced material with hero theme integration
          const newMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(dragonColor),
            roughness: 0.15,
            metalness: 0.9,
            envMapIntensity: 2.5,
            emissive: new THREE.Color(dragonColor).multiplyScalar(emissiveIntensity),
            transparent: true,
            opacity: 0.95
          });
          
          child.material = newMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [gltf.scene, dragonColor, accentColor, emissiveIntensity]);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAnimation = Object.values(actions)[0];
      firstAnimation?.play();
    }
  }, [actions]);

  // Enhanced rotation with hero section synchronization
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  const handleClick = (event) => {
    event.stopPropagation();
    onDragonClick();
  };
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.4}
      floatingRange={[0, 0.3]}
    >
      <group ref={group} onClick={handleClick} style={{ cursor: 'pointer' }}>
        <primitive 
          object={gltf.scene} 
          scale={[0.07, 0.07, 0.07]}
          position={[0, -0.9, 0]}
          rotation={[0, Math.PI / 4, 0]}
        />
      </group>
    </Float>
  );
}

// Enhanced Loading Spinner
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border border-purple-400 opacity-20"></div>
      </div>
      <span className="mt-4 text-purple-400 text-sm font-medium">Summoning Dragon...</span>
    </div>
  );
}

// Main DragonModel Component with Hero Integration
export default function DragonModel({ heroColors }) {
  const [dragonColor, setDragonColor] = useState('#ff6b35');
  const [accentColor, setAccentColor] = useState('#4ecdc4');

  // Hero-themed color schemes that match your gradient design
  const heroColorSchemes = [
    { primary: '#8b5cf6', accent: '#ec4899' }, // Purple-Pink (matches hero gradients)
    { primary: '#06b6d4', accent: '#8b5cf6' }, // Cyan-Purple
    { primary: '#10b981', accent: '#3b82f6' }, // Green-Blue
    { primary: '#f59e0b', accent: '#ef4444' }, // Yellow-Red
    { primary: '#ec4899', accent: '#8b5cf6' }, // Pink-Purple
    { primary: '#3b82f6', accent: '#06b6d4' }, // Blue-Cyan
    { primary: '#ef4444', accent: '#f59e0b' }, // Red-Yellow
    { primary: '#6366f1', accent: '#ec4899' }, // Indigo-Pink
    { primary: '#14b8a6', accent: '#8b5cf6' }, // Teal-Purple
    { primary: '#f97316', accent: '#06b6d4' }  // Orange-Cyan
  ];

  const getRandomColors = () => {
    const randomScheme = heroColorSchemes[Math.floor(Math.random() * heroColorSchemes.length)];
    return randomScheme;
  };

  // Synchronized auto color change with hero animations
  useEffect(() => {
    const interval = setInterval(() => {
      const newColors = getRandomColors();
      setDragonColor(newColors.primary);
      setAccentColor(newColors.accent);
    }, 4000); // Slightly faster to match hero energy

    return () => clearInterval(interval);
  }, []);

  const handleDragonClick = () => {
    const newColors = getRandomColors();
    setDragonColor(newColors.primary);
    setAccentColor(newColors.accent);
  };

  return (
    <div className="w-full h-full relative">
      {/* Enhanced background effects that blend with hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-2xl blur-xl"></div>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          camera={{ 
            position: [0, 1.5, 5], 
            fov: 50,
            near: 0.1,
            far: 100
          }}
          style={{ 
            height: '100%', 
            width: '100%',
            background: 'transparent'
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            pixelRatio: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)
          }}
          dpr={[1, 2]}
        >
          {/* Hero-synchronized lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[10, 8, 5]} 
            intensity={1.5} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Dynamic colored lights matching hero theme */}
          <pointLight 
            position={[-6, 6, 6]} 
            intensity={0.8} 
            color={dragonColor}
            distance={20}
          />
          <pointLight 
            position={[6, 6, -6]} 
            intensity={0.8} 
            color={accentColor}
            distance={20}
          />
          <spotLight
            position={[0, 12, 0]}
            angle={0.4}
            penumbra={1}
            intensity={1.2}
            color={accentColor}
            castShadow
          />

          {/* Hero-themed environment */}
          <Environment preset="city" />
          
          {/* Enhanced shadows */}
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.3}
            scale={8}
            blur={2.5}
            far={4}
            color={dragonColor}
          />

          <Dragon 
            dragonColor={dragonColor} 
            accentColor={accentColor}
            emissiveIntensity={0.15}
            onDragonClick={handleDragonClick}
            heroColors={heroColors}
          />
          
          {/* Refined controls for hero integration */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI - Math.PI / 3}
            dampingFactor={0.08}
            enableDamping={true}
          />
        </Canvas>
      </Suspense>
      
      {/* Subtle interaction hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-white/40 pointer-events-none font-medium">
        Click dragon to transform
      </div>
    </div>
  );
}
