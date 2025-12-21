// SelectedPlanetContext.js - Extended to support both planets and moons
'use client';
import React, { createContext, useContext, useState } from 'react';

const SelectedPlanetContext = createContext([null, () => {}]);

export const useSelectedPlanet = () => {
  return useContext(SelectedPlanetContext);
};

export const SelectedPlanetProvider = ({ children }) => {
  // selectedPlanet can now be:
  // - A planet object: { id, name, ...planetData }
  // - A moon object: { id, name, parentPlanet, isMoon: true, ...moonData }
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <SelectedPlanetContext.Provider value={[selectedPlanet, setSelectedPlanet]}>
      {children}
    </SelectedPlanetContext.Provider>
  );
};
