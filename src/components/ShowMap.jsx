import { load } from "@2gis/mapgl";
import { useEffect, useState } from "react";

import MapWrapper from "./MapWrapper";
import { apiKey } from "../../public/info";
// import { useMap } from "../context/MapContext";

function ShowMap({ onMapClick }) {
  const [, setLngLat] = useState(null);

  useEffect(() => {
    let map;
    load().then((mapglAPI) => {
      map = new mapglAPI.Map("map-container", {
        center: [46.714382, 24.644584],
        zoom: 12,
        key: apiKey,
      });

      map.on("click", (e) => {
        const clickedLngLat = e.lngLat;
        setLngLat(clickedLngLat);
        onMapClick(clickedLngLat);
      });
    });

    return () => map && map.destroy();
  }, []);

  return (
    <div className="w-full h-[70vh]">
      <MapWrapper />
    </div>
  );
}

export default ShowMap;
