'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useRouter } from 'next/navigation';

// Animated planet component
function AnimatedPlanet({ planet, selected, onSelect }) {
  const meshRef = useRef();
  const orbitRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      // Planet rotation
      meshRef.current.rotation.y += planet.rotationSpeed || 0.01;
    }
    
    if (orbitRef.current && planet.orbitSpeed) {
      // Orbital motion
      orbitRef.current.rotation.y += planet.orbitSpeed;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh 
        ref={meshRef} 
        position={planet.position}
        onClick={() => onSelect(planet)}
        onPointerOver={(e) => e.stopPropagation()}
      >
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshPhongMaterial 
          color={selected ? '#ffffff' : planet.color}
          emissive={planet.name === 'Sun' ? planet.color : '#000000'}
          emissiveIntensity={planet.name === 'Sun' ? 0.5 : 0}
        />
        {selected && (
          <Text
            position={[0, planet.radius + 0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {planet.name}
          </Text>
        )}
      </mesh>
    </group>
  );
}

// Simple fallback solar system with basic spheres
function SimpleSolarSystem({ selectedPlanet, setSelectedPlanet }) {
  const planets = [
    { 
      name: 'Sun', 
      position: [0, 0, 0], 
      radius: 2, 
      color: '#FFA500',
      rotationSpeed: 0.005,
      orbitSpeed: 0,
      info: 'The center of our solar system'
    },
    { 
      name: 'Mercury', 
      position: [4, 0, 0], 
      radius: 0.2, 
      color: '#8C7853',
      rotationSpeed: 0.02,
      orbitSpeed: 0.04,
      info: 'Closest planet to the Sun'
    },
    { 
      name: 'Venus', 
      position: [6, 0, 0], 
      radius: 0.4, 
      color: '#FFA500',
      rotationSpeed: 0.015,
      orbitSpeed: 0.03,
      info: 'Hottest planet in the solar system'
    },
    { 
      name: 'Earth', 
      position: [8, 0, 0], 
      radius: 0.4, 
      color: '#6B93D6',
      rotationSpeed: 0.02,
      orbitSpeed: 0.025,
      info: 'Our home planet'
    },
    { 
      name: 'Mars', 
      position: [10, 0, 0], 
      radius: 0.3, 
      color: '#CD5C5C',
      rotationSpeed: 0.018,
      orbitSpeed: 0.02,
      info: 'The red planet'
    },
    { 
      name: 'Jupiter', 
      position: [14, 0, 0], 
      radius: 1.2, 
      color: '#D8CA9D',
      rotationSpeed: 0.03,
      orbitSpeed: 0.01,
      info: 'Largest planet in the solar system'
    },
    { 
      name: 'Saturn', 
      position: [18, 0, 0], 
      radius: 1, 
      color: '#FAD5A5',
      rotationSpeed: 0.025,
      orbitSpeed: 0.008,
      info: 'Planet with beautiful rings'
    },
    { 
      name: 'Uranus', 
      position: [22, 0, 0], 
      radius: 0.8, 
      color: '#4FD0E4',
      rotationSpeed: 0.02,
      orbitSpeed: 0.006,
      info: 'Ice giant tilted on its side'
    },
    { 
      name: 'Neptune', 
      position: [26, 0, 0], 
      radius: 0.8, 
      color: '#4B70DD',
      rotationSpeed: 0.022,
      orbitSpeed: 0.005,
      info: 'Windiest planet in the solar system'
    }
  ];

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={3} distance={100} />
      
      {/* Stars background */}
      <mesh>
        <sphereGeometry args={[200, 32, 32]} />
        <meshBasicMaterial color="#000011" side={2} />
      </mesh>
      
      {/* Planets */}
      {planets.map((planet, index) => (
        <AnimatedPlanet 
          key={index}
          planet={planet}
          selected={selectedPlanet?.name === planet.name}
          onSelect={setSelectedPlanet}
        />
      ))}
      
      {/* Orbital paths */}
      {planets.slice(1).map((planet, index) => {
        const radius = Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2);
        return (
          <mesh key={`orbit-${index}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
            <meshBasicMaterial color="#444" transparent opacity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function FallbackSolarSystem() {
  const router = useRouter();
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div className="w-full h-full bg-black relative">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white mb-2">Solar System Explorer</h1>
        <p className="text-gray-400 text-sm">Interactive 3D View • Click planets to learn more</p>
      </div>
      
      {/* Planet Info Panel */}
      {selectedPlanet && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 max-w-md">
          <h3 className="text-xl font-bold text-white mb-2">{selectedPlanet.name}</h3>
          <p className="text-gray-300 text-sm">{selectedPlanet.info}</p>
          <button
            onClick={() => setSelectedPlanet(null)}
            className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
          >
            Close
          </button>
        </div>
      )}
      
      {/* Exit Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => router.push('/secret/orbital-command-center')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Back to Command Center
        </button>
      </div>
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 15, 40], fov: 60 }}
        style={{ background: 'radial-gradient(circle, #001122 0%, #000000 100%)' }}
      >
        <Suspense fallback={null}>
          <SimpleSolarSystem 
            selectedPlanet={selectedPlanet}
            setSelectedPlanet={setSelectedPlanet}
          />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={150}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10 text-white text-sm space-y-1">
        <p>🖱️ Drag to rotate view</p>
        <p>🔍 Scroll to zoom in/out</p>
        <p>👆 Click planets for info</p>
        <p>🌍 Right-click + drag to pan</p>
      </div>
      
      {/* Planet List */}
      <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-md border border-blue-500/20 rounded-lg p-3">
        <h4 className="text-white text-sm font-bold mb-2">Quick Select:</h4>
        <div className="grid grid-cols-3 gap-1 text-xs">
          {[
            { name: 'Sun', color: '#FFA500' },
            { name: 'Mercury', color: '#8C7853' },
            { name: 'Venus', color: '#FFA500' },
            { name: 'Earth', color: '#6B93D6' },
            { name: 'Mars', color: '#CD5C5C' },
            { name: 'Jupiter', color: '#D8CA9D' },
            { name: 'Saturn', color: '#FAD5A5' },
            { name: 'Uranus', color: '#4FD0E4' },
            { name: 'Neptune', color: '#4B70DD' }
          ].map((planet) => (
            <button
              key={planet.name}
              onClick={() => setSelectedPlanet({ name: planet.name, info: `Information about ${planet.name}` })}
              className="text-white hover:text-blue-300 transition-colors"
              style={{ color: planet.color }}
            >
              {planet.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
