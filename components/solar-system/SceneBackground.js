// SceneBackground.js - Enhanced space environment with optional NASA APOD
'use client';
import { useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, EquirectangularReflectionMapping } from "three";
import { nasaAPI } from "./services/nasaAPI";

export default function SceneBackground({
  texturePath,
  useAPOD = false, // Optional: use NASA's Astronomy Picture of the Day
}) {
  const { scene, gl } = useThree();
  
  // Optionally fetch NASA APOD for dynamic backgrounds
  useEffect(() => {
    if (useAPOD) {
      nasaAPI.getAPOD().then((data) => {
        if (data?.hdurl && data.media_type === 'image') {
          console.log('[NASA APOD] Using:', data.title);
          // Note: APOD images may not be equirectangular, so we keep the default
          // This is more of a future enhancement placeholder
        }
      }).catch((error) => {
        console.warn('[NASA APOD] Failed to fetch, using default background:', error);
      });
    }
  }, [useAPOD]);
  
  const texture = useLoader(TextureLoader, texturePath);
  
  useEffect(() => {
    // Enhanced texture settings for better space realism
    texture.mapping = EquirectangularReflectionMapping;
    texture.flipY = false;
    
    const prevBackground = scene.background;
    const prevEnvironment = scene.environment;
    
    scene.background = texture;
    scene.environment = texture; // For realistic reflections
    
    // Set tone mapping for better HDR rendering
    gl.toneMappingExposure = 1.0;
    
    return () => {
      scene.background = prevBackground;
      scene.environment = prevEnvironment;
    };
  }, [texture, scene, gl]);

  return null;
}