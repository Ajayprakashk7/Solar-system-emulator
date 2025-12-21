'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { preloadTextures } from '../components/solar-system/utils/performanceOptimizer';

// Dynamically import the full SolarSystem to avoid SSR issues
const SolarSystem = dynamic(
  () => import('../components/solar-system/SolarSystem'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-blue-400 text-lg">Loading Advanced Solar System...</p>
          <p className="text-gray-400 text-sm mt-2">Initializing 3D environment with advanced features</p>
        </div>
      </div>
    )
  }
);

export default function SolarSystemPage() {
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Preload critical textures
    const texturePaths = [
      '/images/bodies/sun_2k.webp',
      '/images/bodies/earth_2k.webp',
      '/images/bodies/mars_2k.webp',
      '/images/bodies/jupiter_2k.webp',
    ];

    let loaded = 0;
    preloadTextures(texturePaths).then((results) => {
      results.forEach((result, index) => {
        loaded++;
        setLoadingProgress((loaded / texturePaths.length) * 100);
        if (result.status === 'rejected') {
          console.warn(`Failed to preload texture: ${texturePaths[index]}`);
        }
      });
      setTexturesLoaded(true);
    });
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <Suspense fallback={
        <div className="w-screen h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-blue-400 text-lg">Loading Advanced Solar System...</p>
            {!texturesLoaded && (
              <p className="text-gray-400 text-sm mt-2">
                Preloading textures... {Math.round(loadingProgress)}%
              </p>
            )}
          </div>
        </div>
      }>
        <SolarSystem />
      </Suspense>
    </div>
  );
}
