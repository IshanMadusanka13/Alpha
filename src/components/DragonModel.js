'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, useAnimations } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useEffect, useRef, useLayoutEffect, useState } from 'react';
import * as THREE from 'three';

// Dragon 3D Model Component with Smooth Color Transitions
function Dragon({ dragonColor, accentColor, emissiveIntensity = 0.15, onDragonClick, heroColors }) {
  const group = useRef();
  const materialRef = useRef();
  const gltf = useLoader(GLTFLoader, '/dragon.glb');
  const { actions } = useAnimations(gltf.animations, group);

  // Smooth color transition using Three.js Color.lerp
  useFrame((state, delta) => {
    if (materialRef.current && dragonColor) {
      const targetColor = new THREE.Color(dragonColor);
      const targetEmissive = new THREE.Color(dragonColor).multiplyScalar(emissiveIntensity);
      
      // Smooth color interpolation
      materialRef.current.color.lerp(targetColor, delta * 2);
      materialRef.current.emissive.lerp(targetEmissive, delta * 2);
    }

    // Enhanced rotation with hero section synchronization
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  // Apply initial colors to the dragon model
  useLayoutEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const newMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(dragonColor),
            roughness: 0.15,
            metalness: 0.9,
            envMapIntensity: 2.5,
            emissive: new THREE.Color(dragonColor).multiplyScalar(emissiveIntensity),
            transparent: true,
            opacity: 0.95
          });
          
          materialRef.current = newMaterial;
          child.material = newMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [gltf.scene]);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAnimation = Object.values(actions)[0];
      firstAnimation?.play();
    }
  }, [actions]);

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

// Main DragonModel Component with Smooth Transitions
export default function DragonModel({ heroColors, currentColorIndex }) {
  const [dragonColor, setDragonColor] = useState('#8b5cf6');
  const [accentColor, setAccentColor] = useState('#ec4899');

  // Hero-themed color schemes
  const heroColorSchemes = [
  { primary: '#2d1b69', accent: '#8b0000' }, // Midnight Purple-Dark Red
  { primary: '#1a1a2e', accent: '#e53e3e' }, // Dark Navy-Crimson
  { primary: '#16213e', accent: '#c53030' }, // Dark Blue-Red
  { primary: '#0f0f23', accent: '#f56565' }, // Almost Black-Light Red
  { primary: '#2d3748', accent: '#e53e3e' }, // Dark Gray-Crimson
  { primary: '#553c9a', accent: '#9b2c2c' }, // Dark Purple-Dark Red
  { primary: '#1a202c', accent: '#fc8181' }, // Charcoal-Light Red
  { primary: '#322659', accent: '#e53e3e' }, // Deep Purple-Crimson
  { primary: '#2c5282', accent: '#c53030' }, // Dark Blue-Red
  { primary: '#1a1a1a', accent: '#ff6b6b' }  // Near Black-Coral Red
];


  // Sync with hero color changes
  useEffect(() => {
    if (currentColorIndex !== undefined) {
      const colors = heroColorSchemes[currentColorIndex];
      setDragonColor(colors.primary);
      setAccentColor(colors.accent);
    }
  }, [currentColorIndex]);

  const handleDragonClick = () => {
    const randomIndex = Math.floor(Math.random() * heroColorSchemes.length);
    const newColors = heroColorSchemes[randomIndex];
    setDragonColor(newColors.primary);
    setAccentColor(newColors.accent);
  };

  return (
    <div className="w-full h-full relative">
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
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[10, 8, 5]} 
            intensity={1.5} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
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

          <Environment preset="city" />
          
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
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-white/40 pointer-events-none font-medium">
        Click dragon to transform
      </div>
    </div>
  );
}
