'use client';

export default function SceneLighting({ maxLights = 4 }) {
  return (
    <>
      {/* Enhanced ambient light for better visibility of dark sides */}
      <ambientLight intensity={0.15} color={0x0a0a1a} />
      
      {/* Hemisphere light for subtle directional fill */}
      <hemisphereLight
        skyColor={0x001a33}
        groundColor={0x000000}
        intensity={0.2}
      />
      
      {/* Additional lights only on capable devices (maxLights >= 3) */}
      {maxLights >= 3 && (
        <directionalLight
          position={[10, 5, 5]}
          intensity={0.15}
          color={0x4466aa}
        />
      )}
      
      {/* Backlight for rim lighting on planets (maxLights >= 4) */}
      {maxLights >= 4 && (
        <directionalLight
          position={[-5, -3, -5]}
          intensity={0.1}
          color={0x2244aa}
        />
      )}
    </>
  );
}
