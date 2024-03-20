import { createContext, useContext, useState } from "react";

const MapContext = createContext();
export const MapProvider = (children) => {
  const [lngLat, setLngLat] = useState(null || undefined);

  return (
    <MapContext.Provider value={{ lngLat, setLngLat }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);
