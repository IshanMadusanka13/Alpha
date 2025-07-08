'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useEffect, useRef, useLayoutEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Dragon 3D Model Component with Scroll-Based Movement
function Dragon({ currentSection, onTransformUpdate }) {
  const group = useRef();
  const mixer = useRef();
  const gltf = useLoader(GLTFLoader, '/dragon.glb');
  const { camera, gl } = useThree();

  // Mouse interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState('position'); // 'position', 'rotation', 'scale'
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [currentTransform, setCurrentTransform] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.07, y: 0.07, z: 0.07 }
  });
  const [currentAnimation, setCurrentAnimation] = useState(0);

  // ========================================
  // MOUSE INTERACTION HANDLERS
  // ========================================
  useEffect(() => {
    const handleMouseDown = (event) => {
      setIsDragging(true);
      setLastMousePos({ x: event.clientX, y: event.clientY });

      // Switch modes with keyboard
      if (event.shiftKey) {
        setDragMode('rotation');
      } else if (event.ctrlKey || event.metaKey) {
        setDragMode('scale');
      } else {
        setDragMode('position');
      }


    };

    const handleMouseMove = (event) => {
      if (!isDragging || !group.current) return;

      const deltaX = event.clientX - lastMousePos.x;
      const deltaY = event.clientY - lastMousePos.y;
      const sensitivity = 0.01;

      if (dragMode === 'position') {
        // Position control
        group.current.position.x += deltaX * sensitivity;
        group.current.position.y -= deltaY * sensitivity;

        const newPos = {
          x: group.current.position.x,
          y: group.current.position.y,
          z: group.current.position.z
        };

        setCurrentTransform(prev => ({ ...prev, position: newPos }));


      } else if (dragMode === 'rotation') {
        // Rotation control
        group.current.rotation.y += deltaX * sensitivity;
        group.current.rotation.x += deltaY * sensitivity;

        const newRot = {
          x: group.current.rotation.x,
          y: group.current.rotation.y,
          z: group.current.rotation.z
        };

        setCurrentTransform(prev => ({ ...prev, rotation: newRot }));


      } else if (dragMode === 'scale') {
        // Scale control
        const scaleChange = deltaY * -0.001;
        const newScale = Math.max(0.01, group.current.scale.x + scaleChange);

        group.current.scale.set(newScale, newScale, newScale);

        const newScaleObj = {
          x: newScale,
          y: newScale,
          z: newScale
        };

        setCurrentTransform(prev => ({ ...prev, scale: newScaleObj }));

      }

      setLastMousePos({ x: event.clientX, y: event.clientY });

      // Update parent component
      if (onTransformUpdate) {
        onTransformUpdate(currentTransform);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);

      }
    };

    // Keyboard shortcuts
    const handleKeyDown = (event) => {
      if (event.key === 'r' || event.key === 'R') {

        setDragMode('rotation');
      } else if (event.key === 's' || event.key === 'S') {

        setDragMode('scale');
      } else if (event.key === 'p' || event.key === 'P') {

        setDragMode('position');
      } else if (event.key === 'c' || event.key === 'C') {
        // Copy current values to clipboard
        const copyText = `
Position: { x: ${currentTransform.position.x.toFixed(3)}, y: ${currentTransform.position.y.toFixed(3)}, z: ${currentTransform.position.z.toFixed(3)} }
Rotation: { x: ${currentTransform.rotation.x.toFixed(3)}, y: ${currentTransform.rotation.y.toFixed(3)}, z: ${currentTransform.rotation.z.toFixed(3)} }
Scale: { x: ${currentTransform.scale.x.toFixed(3)}, y: ${currentTransform.scale.y.toFixed(3)}, z: ${currentTransform.scale.z.toFixed(3)} }
        `;
        navigator.clipboard.writeText(copyText);

      }
    };

    // Add event listeners
    gl.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDragging, dragMode, lastMousePos, currentTransform, gl, onTransformUpdate]);

  // Update transform state when group reference changes
  useEffect(() => {
    if (group.current) {
      const pos = group.current.position;
      const rot = group.current.rotation;
      const scl = group.current.scale;

      setCurrentTransform({
        position: { x: pos.x, y: pos.y, z: pos.z },
        rotation: { x: rot.x, y: rot.y, z: rot.z },
        scale: { x: scl.x, y: scl.y, z: scl.z }
      });
    }
  }, [group.current]);

  // ========================================
  // DRAGON POSITIONS & ROTATIONS FOR EACH SECTION
  // ========================================
  // How to customize: Change x, y, z values for position and rotation
  // Position: x (left/right), y (up/down), z (forward/backward)
  // Rotation: x (pitch), y (yaw), z (roll) - values are in radians
  // Tip: Use Math.PI for 180 degrees, Math.PI/2 for 90 degrees, etc.
  const arrPositionModel = [
    {
      id: 'home',
      position: { x: 0.900, y: -0.760, z: 0.000 },
      rotation: { x: 0.140, y: -0.919, z: 0.000 },
      scale: { x: 0.04, y: 0.04, z: 0.04 },
      animationIndex: 0,
      loopMode: THREE.LoopRepeat,        // CHANGE: Continuous loop
      timeScale: 1.0                     // CHANGE: Animation speed
    },
    {
      id: 'about',
      position: { x: -1.210, y: -1.620, z: -2 },
      rotation: { x: 0.330, y: 0.760, z: 0 },
      scale: { x: 0.030, y: 0.030, z: 0.030 },
      animationIndex: 2,
      loopMode: THREE.LoopRepeat,        // CHANGE: Continuous loop
      timeScale: 0.8                     // CHANGE: Slower animation
    },
    {
      id: 'projects',
      position: { x: 1.370, y: -1.390, z: -3 },
      rotation: { x: 0.160, y: -0.060, z: 0 },
      scale: { x: 0.05, y: 0.05, z: 0.05 },
      animationIndex: 9,
      loopMode: THREE.LoopRepeat,        // CHANGE: Continuous loop
      timeScale: 1.2                     // CHANGE: Faster animation
    },
    {
      id: 'contact',
      position: { x: 1.220, y: -0.880, z: 0 },
      rotation: { x: 0.130, y: -1.000, z: 0 },
      scale: { x: 0.014, y: 0.014, z: 0.014 },
      animationIndex: 26,
      loopMode: THREE.LoopRepeat,        // CHANGE: Continuous loop
      timeScale: 1                     // CHANGE: Normal speed
    }
  ];

  // Comprehensive material handling
  useLayoutEffect(() => {
    if (gltf.scene && gltf.materials) {
      // Process each material
      Object.values(gltf.materials).forEach((material, index) => {
        if (material.isMeshStandardMaterial) {
          // Check for PBR Specular Glossiness extension
          const pbrSG = material.userData?.gltfExtensions?.KHR_materials_pbrSpecularGlossiness;

          if (pbrSG) {
            // Set diffuse color from diffuseFactor (this should work even without textures)
            if (pbrSG.diffuseFactor) {
              material.color.setRGB(
                pbrSG.diffuseFactor[0],
                pbrSG.diffuseFactor[1],
                pbrSG.diffuseFactor[2]
              );

              // Set opacity if it exists
              if (pbrSG.diffuseFactor[3] !== undefined && pbrSG.diffuseFactor[3] < 1) {
                material.opacity = pbrSG.diffuseFactor[3];
                material.transparent = true;
              }
            }

            // Convert glossiness to roughness
            if (pbrSG.glossinessFactor !== undefined) {
              material.roughness = Math.max(0.1, 1 - pbrSG.glossinessFactor);
            }

            // Set specular as metalness approximation
            if (pbrSG.specularFactor) {
              const specularIntensity = (pbrSG.specularFactor[0] + pbrSG.specularFactor[1] + pbrSG.specularFactor[2]) / 3;
              material.metalness = Math.min(0.8, specularIntensity);
            }

            // Try to load textures from different sources
            if (pbrSG.diffuseTexture) {
              // Try different texture loading approaches
              if (gltf.textures && gltf.textures[pbrSG.diffuseTexture.index]) {
                material.map = gltf.textures[pbrSG.diffuseTexture.index];
              } else if (gltf.parser?.json?.textures) {
                const textureInfo = gltf.parser.json.textures[pbrSG.diffuseTexture.index];
                if (textureInfo && gltf.parser.json.images) {
                  // Try to get the texture from the parser's texture cache
                  try {
                    const texturePromise = gltf.parser.loadTexture(pbrSG.diffuseTexture.index);
                    if (texturePromise) {
                      texturePromise.then((texture) => {
                        material.map = texture;
                        material.needsUpdate = true;
                      }).catch(error => {
                        // Texture loading failed, continue without texture
                      });
                    }
                  } catch (error) {
                    // Error loading texture from parser, continue without texture
                  }
                }
              }
            }

            // OVERRIDE: Since diffuseFactor is pure white, apply manual colors
            // This ensures the dragon has color even if textures fail to load
            if (pbrSG.diffuseFactor && pbrSG.diffuseFactor[0] === 1 && pbrSG.diffuseFactor[1] === 1 && pbrSG.diffuseFactor[2] === 1) {
              // ========================================
              // DRAGON COLORS
              // ========================================
              // How to customize: Change the hex color values below
              // Examples: 0xFF0000 (red), 0x00FF00 (green), 0x0000FF (blue)
              // You can also use material.color.setRGB(r, g, b) with values 0-1
              if (material.name.includes('body02_2')) {
                material.color.setHex(0xDAA520); // CHANGE: Secondary parts color (currently goldenrod)
              } else {
                material.color.setHex(0x8B4513); // CHANGE: Main body color (currently saddle brown)
              }
            }
          } else {
            // Handle standard PBR materials
            // Apply some default enhancements if no special handling is needed
            if (material.color.r === 1 && material.color.g === 1 && material.color.b === 1) {
              // If material is pure white, give it some color
              material.color.setHex(0xcccccc); // CHANGE: Default color for white materials
            }
          }

          // Force material updates
          material.needsUpdate = true;
        }
      });

      // Set up shadows and traverse scene
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;

          // Ensure material is applied properly
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                if (mat.isMeshStandardMaterial) {
                  mat.needsUpdate = true;
                }
              });
            } else if (child.material.isMeshStandardMaterial) {
              child.material.needsUpdate = true;
            }
          }
        }
      });
    }
  }, [gltf.scene, gltf.materials, gltf.textures]);


  useEffect(() => {
    console.log('useEffect: gltf.animations:', gltf.animations);
    if (gltf.animations && gltf.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);

      // Stop all current actions
      mixer.current.stopAllAction();

      // Get animation index (make sure it's within bounds)
      const animationIndex = Math.min(currentAnimation, gltf.animations.length - 1);
      const action = mixer.current.clipAction(gltf.animations[animationIndex]);

      // Find current section settings
      const currentSectionData = arrPositionModel.find(
        section => section.animationIndex === currentAnimation
      );

      // Animation settings
      const timeScale = currentSectionData?.timeScale || 1.0;
      const loopMode = currentSectionData?.loopMode || THREE.LoopRepeat;

      action.timeScale = timeScale;
      action.setLoop(loopMode);
      action.clampWhenFinished = false;
      action.setEffectiveTimeScale(timeScale);
      action.setEffectiveWeight(1);

      if (animationIndex === 2) {
        action.reset();
        action.time = 12.0;
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.setEffectiveTimeScale(1.0);
        action.setEffectiveWeight(1);

        // Use the proper event system for loop detection
        mixer.current.addEventListener('loop', (event) => {
          if (event.action === action) {
            console.log('🔄 Loop detected, resetting time to 9s');
            action.time = 13.0;
          }
        });

        action.play();
      } else if (animationIndex === 9) {
        action.reset();
        action.time = 74.0;
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.setEffectiveTimeScale(1.0);
        action.setEffectiveWeight(1);

        // Use the proper event system for loop detection
        mixer.current.addEventListener('loop', (event) => {
          if (event.action === action) {
            console.log('🔄 Loop detected, resetting time to 9s');
            action.time = 70.0;
          }
        });

        action.play();
      }  else if (animationIndex === 26) {
        action.reset();
        action.time = 130.0;
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.setEffectiveTimeScale(1.0);
        action.setEffectiveWeight(1);

        // Use the proper event system for loop detection
        mixer.current.addEventListener('loop', (event) => {
          if (event.action === action) {
            console.log('🔄 Loop detected, resetting time to 9s');
            action.time = 134.40;
          }
        });

        action.play();
      } else {
        action.reset();
        action.fadeIn(0.5);
        action.play();
      }

      console.log(`🎬 Playing animation ${animationIndex} continuously:`, {
        name: gltf.animations[animationIndex].name,
        duration: gltf.animations[animationIndex].duration.toFixed(2) + 's',
        timeScale: timeScale,
        loopMode: loopMode === THREE.LoopRepeat ? 'REPEAT' : 'ONCE'
      });
    }

    // Cleanup function to remove event listeners
    return () => {
      if (mixer.current) {
        mixer.current.removeEventListener('loop');
      }
    };
  }, [gltf, currentAnimation]);



  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);

      // ADDED: Manual loop check to ensure continuous play
      const actions = mixer.current._actions;
      actions.forEach(action => {
        if (action.enabled && !action.isRunning() && action.getClip()) {

          action.reset();
          action.play();
        }
      });
    }

    // Log transform values every 60 frames (roughly once per second at 60fps)
    if (state.clock.elapsedTime % 1 < delta && group.current) {
      const pos = group.current.position;
      const rot = group.current.rotation;
      const scl = group.current.scale;


    }
  });

  // Update animation mixer
  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }

    // Log transform values every 60 frames (roughly once per second at 60fps)
    if (state.clock.elapsedTime % 1 < delta && group.current) {
      const pos = group.current.position;
      const rot = group.current.rotation;
      const scl = group.current.scale;


    }
  });

  // ========================================
  // SCROLL-BASED MOVEMENT ANIMATION
  // ========================================
  // How to customize movement animations:
  // 1. Change duration for faster/slower transitions
  // 2. Change ease type for different animation feels
  // 3. Add stagger or delay effects
  useEffect(() => {
    if (group.current && currentSection) {


      const position_active = arrPositionModel.findIndex(
        (val) => val.id === currentSection
      );

      if (position_active >= 0) {
        const new_coordinates = arrPositionModel[position_active];



        // Update animation
        setCurrentAnimation(new_coordinates.animationIndex);

        // Position animation
        gsap.to(group.current.position, {
          x: new_coordinates.position.x,
          y: new_coordinates.position.y,
          z: new_coordinates.position.z,
          duration: 2,
          ease: "power2.out",
          delay: 0,
          onUpdate: () => {

          },
          onComplete: () => {

          }
        });

        // Rotation animation
        gsap.to(group.current.rotation, {
          x: new_coordinates.rotation.x,
          y: new_coordinates.rotation.y,
          z: new_coordinates.rotation.z,
          duration: 2,
          ease: "power2.out",
          delay: 0,
          onUpdate: () => {

          },
          onComplete: () => {

          }
        });

        // Scale animation
        gsap.to(group.current.scale, {
          x: new_coordinates.scale.x,
          y: new_coordinates.scale.y,
          z: new_coordinates.scale.z,
          duration: 2,
          ease: "power2.out",
          delay: 0,
          onUpdate: () => {

          },
          onComplete: () => {

          }
        });
      }
    }
  }, [currentSection]);

  return (
    <group ref={group}>
      <primitive
        object={gltf.scene}
        // ========================================
        // DRAGON SIZE AND BASE POSITION/ROTATION
        // ========================================
        // How to customize:
        scale={[1, 1, 1]}              // Updated from [0.0715, 0.0715, 0.0715]
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}          // CHANGE: Base rotation offset [x, y, z] - this is added to section rotations

      // Alternative scaling examples:
      // scale={[0.1, 0.1, 0.1]}               // Larger dragon
      // scale={[0.05, 0.05, 0.05]}            // Smaller dragon
      // scale={[0.07, 0.05, 0.07]}            // Squashed dragon (shorter)
      // scale={[0.05, 0.07, 0.05]}            // Stretched dragon (taller)
      />
    </group>
  );
}

// Loading Spinner
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border border-purple-400 opacity-20"></div>
      </div>
      <span className="mt-4 text-purple-400 text-sm font-medium">Loading Dragon...</span>
    </div>
  );
}

// Main DragonModel Component with FIXED scroll detection
export default function DragonModel() {
  const [currentSection, setCurrentSection] = useState('home');
  const [dragonTransform, setDragonTransform] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.07, y: 0.07, z: 0.07 }
  });
  const [currentAnimation, setCurrentAnimation] = useState(0);

  // Handle dragon transform updates
  const handleTransformUpdate = (transform) => {
    setDragonTransform(transform);
  };

  // IMPROVED scroll detection function
  const detectCurrentSection = () => {
    const sections = ['home', 'about', 'projects', 'contact'];
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Calculate which section is most visible
    let maxVisibility = 0;
    let currentSectionId = 'home';

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionBottom = sectionTop + rect.height;

        // Calculate visibility percentage
        const visibleTop = Math.max(scrollY, sectionTop);
        const visibleBottom = Math.min(scrollY + windowHeight, sectionBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibility = visibleHeight / windowHeight;

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          currentSectionId = sectionId;
        }
      }
    });


    setCurrentSection(currentSectionId);
  };

  // Setup scroll listener with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          detectCurrentSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial detection
    setTimeout(() => {
      detectCurrentSection();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Recalculate sections on resize
      setTimeout(() => {
        detectCurrentSection();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          camera={{
            // ========================================
            // CAMERA SETTINGS
            // ========================================
            // How to customize camera view:
            position: [0, 0, 13],         // CHANGE: Camera position [x, y, z] - move closer/farther from dragon
            fov: 10,                      // CHANGE: Field of view (higher = wider view, lower = zoomed in)
            near: 0.1,                    // CHANGE: Near clipping plane
            far: 1000                     // CHANGE: Far clipping plane
          }}
          style={{
            height: '100%',
            width: '100%',
            background: 'transparent'
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          {/* ========================================
              LIGHTING SETUP
              ======================================== */}
          {/* How to customize lighting:
              - Change intensity values (0-5+ range)
              - Change color using hex values (0xffffff = white)
              - Adjust directional light position for different shadows */}
          <ambientLight
            intensity={1.3}               // CHANGE: Overall brightness (0-5+ range)
            color={0xffffff}             // CHANGE: Ambient light color
          />
          <directionalLight
            position={[500, 500, 500]}    // CHANGE: Light direction [x, y, z]
            intensity={1}                 // CHANGE: Directional light intensity
            color={0xffffff}             // CHANGE: Directional light color
          />

          <Dragon
            currentSection={currentSection}
            onTransformUpdate={handleTransformUpdate}
          />
        </Canvas>
      </Suspense>

      {/* Enhanced Debug Panel with Live Transform Values */}
      <div className="absolute top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm backdrop-blur-sm z-50 max-w-xs">
        <div className="mb-2">
          <span className="text-purple-300 font-bold">Section:</span> {currentSection}
        </div>

        <div className="mb-2">
          <div className="text-green-300 font-semibold">📍 Position:</div>
          <div className="text-xs space-y-1">
            <div>X: {dragonTransform.position.x.toFixed(3)}</div>
            <div>Y: {dragonTransform.position.y.toFixed(3)}</div>
            <div>Z: {dragonTransform.position.z.toFixed(3)}</div>
          </div>
        </div>

        <div className="mb-2">
          <div className="text-blue-300 font-semibold">🔄 Rotation:</div>
          <div className="text-xs space-y-1">
            <div>X: {dragonTransform.rotation.x.toFixed(3)} rad</div>
            <div>Y: {dragonTransform.rotation.y.toFixed(3)} rad</div>
            <div>Z: {dragonTransform.rotation.z.toFixed(3)} rad</div>
          </div>
        </div>

        <div className="mb-2">
          <div className="text-yellow-300 font-semibold">📏 Scale:</div>
          <div className="text-xs space-y-1">
            <div>X: {dragonTransform.scale.x.toFixed(3)}</div>
            <div>Y: {dragonTransform.scale.y.toFixed(3)}</div>
            <div>Z: {dragonTransform.scale.z.toFixed(3)}</div>
          </div>
        </div>

        <div className="mb-2">
          <span className="text-orange-300 font-bold">Animation:</span> {currentAnimation}
        </div>

        <div className="text-xs text-gray-400 mt-3 border-t border-gray-600 pt-2">
          <div className="font-semibold text-white mb-1">🖱️ Mouse Controls:</div>
          <div>• Click + Drag: Move</div>
          <div>• Shift + Drag: Rotate</div>
          <div>• Ctrl + Drag: Scale</div>
          <div className="mt-2 font-semibold text-white">⌨️ Keys:</div>
          <div>• P: Position Mode</div>
          <div>• R: Rotation Mode</div>
          <div>• S: Scale Mode</div>
          <div>• C: Copy Values</div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// QUICK REFERENCE GUIDE
// ========================================
/*
KEY AREAS TO CUSTOMIZE:

1. DRAGON SIZE:
   - Look for: scale={[0.07, 0.07, 0.07]}
   - Increase values for bigger dragon
   - Decrease values for smaller dragon

2. DRAGON POSITIONS (per section):
   - Look for: arrPositionModel array
   - Modify x, y, z values in position objects
   - x: left/right, y: up/down, z: forward/backward

3. DRAGON ROTATIONS (per section):
   - Look for: arrPositionModel array
   - Modify x, y, z values in rotation objects
   - Values are in radians (Math.PI = 180 degrees)

4. DRAGON COLORS:
   - Look for: material.color.setHex() lines
   - Change hex values (0xFF0000 = red, 0x00FF00 = green, etc.)

5. ANIMATIONS:
   - Look for: animationIndex variable
   - Change to use different animations from your model
   - Adjust timeScale for speed (0.5 = half speed, 2.0 = double speed)

6. MOVEMENT TRANSITIONS:
   - Look for: gsap.to() calls
   - Change duration for faster/slower transitions
   - Change ease for different animation feels

7. CAMERA VIEW:
   - Look for: camera object in Canvas
   - Adjust position and fov values

8. LIGHTING:
   - Look for: ambientLight and directionalLight
   - Change intensity and color values
*/