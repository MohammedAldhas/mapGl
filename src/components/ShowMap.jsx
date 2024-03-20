import { load } from "@2gis/mapgl";
import { useEffect } from "react";
import MapWrapper from "./MapWrapper";
import { apiKey } from "../../public/info";

function ShowMap() {
  useEffect(() => {
    let map;
    load().then((mapglAPI) => {
      map = new mapglAPI.Map("map-container", {
        center: [55.31878, 25.23584],
        zoom: 13,
        key: apiKey,
      });
    });

    // Destroy the map on unmount
    return () => map && map.destroy();
  });
// *********


  return (
    <div style={{ width: "100%", height: "70%" }}>
      <MapWrapper />
    </div>
  );
}
// return <></>;

export default ShowMap;
