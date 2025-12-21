'use client';


import { SelectedPlanetProvider } from "./contexts/SelectedPlanetContext";
import { SpeedControlProvider } from "./contexts/SpeedControlContext";
import { PlanetPositionsProvider } from "./contexts/PlanetPositionsContext";
import { CameraProvider } from "./contexts/CameraContext";

export default function SolarSystemProviders({ children }) {
  return (
    <SelectedPlanetProvider>
      <SpeedControlProvider>
        <PlanetPositionsProvider>
          <CameraProvider>
            {children}
          </CameraProvider>
        </PlanetPositionsProvider>
      </SpeedControlProvider>
    </SelectedPlanetProvider>
  );
}
