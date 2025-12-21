// PlanetsUpdater.js - Enhanced with realistic orbital mechanics
'use client';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpeedControl } from "../contexts/SpeedControlContext";

const ORBIT_SPEED_FACTOR = 50;

export default function PlanetsUpdater({
  setPlanetOrbitProgress,
  planets,
}) {
  const { speedFactor } = useSpeedControl();
  const lastElapsedTimeRef = useRef(0);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastElapsedTimeRef.current;
    lastElapsedTimeRef.current = elapsedTime;

    // Optimize state update - only create new object if values actually changed
    setPlanetOrbitProgress((prevOrbitProgress) => {
      const nextProgress = { ...prevOrbitProgress };
      let hasChanges = false;

      planets.forEach((planet) => {
        // Skip Sun as it doesn't orbit
        if (planet.isSun) {
          if (nextProgress[planet.name] !== 0) {
            nextProgress[planet.name] = 0;
            hasChanges = true;
          }
          return;
        }

        // Kepler's laws: orbital speed decreases with distance from Sun
        const distanceFromSun = Array.isArray(planet.position) ? planet.position[0] : planet.position.x;
        const keplerFactor = Math.sqrt(1 / Math.pow(distanceFromSun, 3));
        
        const orbitSpeedRadians =
          ((planet.orbitSpeed * ORBIT_SPEED_FACTOR * keplerFactor) / 360) *
          (2 * Math.PI) *
          speedFactor;
          
        const newValue = (prevOrbitProgress[planet.name] || 0) + orbitSpeedRadians * deltaTime;
        
        // Only update if value actually changed (avoid unnecessary re-renders)
        if (nextProgress[planet.name] !== newValue) {
          nextProgress[planet.name] = newValue;
          hasChanges = true;
        }
      });

      // Return previous state if nothing changed
      return hasChanges ? nextProgress : prevOrbitProgress;
    });
  });

  return null;
}
